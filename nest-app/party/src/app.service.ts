import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createPartyDto } from './dto/create-party.dto';
import { createPartyAdminDto } from './dto/create-party-admin.dto';
import { updatePartyDto } from './dto/update-party.dto';
import { joinPartyDto } from './dto/join-party.dto';
import { SupabaseService } from './supabase/supabase.service';
import { updatePartyAdminDto } from './dto/update-party-admin.dto';

@Injectable()
export class AppService {

  constructor(private supabaseService: SupabaseService) { }

  async getParties() {

    const { data: Parties } = await this.supabaseService.client
      .from('party')
      .select('*');

    return { Parties, statusCode: 200, message: "OK" };
  }

  async getAllPartipants() {
    const { data: partyProfiles } = await this.supabaseService.client
      .from('partyProfiles')
      .select('*');

    // Get all participants from profiles according to partyProfiles and party
    const { data: profiles } = await this.supabaseService.client
      .from('profiles')
      .select('*')
      .in('id', partyProfiles.map(profile => profile.profileId));

    // Get all parties according to partyProfiles
    const { data: parties } = await this.supabaseService.client
      .from('party')
      .select('*')
      .in('id', partyProfiles.map(profile => profile.partyId));


    return { profiles, parties, partyProfiles, statusCode: 200, message: "OK" };
  }

  // get all participants from a specific party
  async getParticipants(partyId: string) {
    const { data: partyProfiles } = await this.supabaseService.client
      .from('partyProfiles')
      .select('*')
      .eq('partyId', partyId)
      .neq('status', -2);

    // Get all participants from profiles according to partyProfiles
    const { data: profiles } = await this.supabaseService.client
      .from('profiles')
      .select('*')
      .in('id', partyProfiles.map(profile => profile.profileId));


    //return partyProfiles and profiles
    return { partyProfiles, profiles, statusCode: 200, message: "OK" };
  }

  // decline a participant from a specific party putting status -1
  async declineParticipant(partydata: any) {

    const { data: partyProfiles } = await this.supabaseService.client
      .from('partyProfiles')
      .select('*')
      .eq('partyId', partydata?.partyId)
      .eq('profileId', partydata?.profileId);

    const { data, error } = await this.supabaseService.client
      .from('partyProfiles')
      .update([
        {
          status: -1,
        },
      ])
      .eq('partyId', partydata?.partyId)
      .eq('profileId', partydata?.profileId);

    return { statusCode: 200, message: "Updated" }
  }

  // accept a participant from a specific party putting status 1
  async acceptParticipant(partydata: any) {

    const { data: partyProfiles } = await this.supabaseService.client
      .from('partyProfiles')
      .select('*')
      .eq('partyId', partydata?.partyId)
      .eq('profileId', partydata?.profileId);

    const { data, error } = await this.supabaseService.client
      .from('partyProfiles')
      .update([
        {
          status: 1,
        },
      ])
      .eq('partyId', partydata?.partyId)
      .eq('profileId', partydata?.profileId);

    return { statusCode: 200, message: "Updated" }
  }

  async saveParty(newParty: createPartyDto) {

    // Check date 
    const checkDate = await this.checkDate(newParty.dateParty);
    console.log(checkDate);

    // Check if owner exists
    const checkUserExists = await this.checkUserExists(newParty.owner);
    console.log(checkUserExists);

    const { error } = await this.supabaseService.client
      .from('party')
      .insert([
        {
          name: newParty.name.toLowerCase(),
          description: newParty.description,
          location: newParty.location,
          players: newParty.players,
          owner: newParty.owner,
          time: newParty.time,
          zipcode: newParty.zipcode,
          dateParty: newParty.dateParty,
        },
      ]);

    if (error) {
      return new HttpException({ message: ["Une erreur est survenue. Veuillez contacter l'administrateur."] }, HttpStatus.BAD_REQUEST);
    }

    return { statusCode: 201, message: "Created" }
  }

  async joinParty(joinParty: joinPartyDto) {
    const { data: partyProfiles } = await this.supabaseService.client
      .from('partyProfiles')
      .select('*')
      .eq('partyId', joinParty.partyId)
      .eq('profileId', joinParty.profileId)
      .neq('status', -2);

    const userAlreadyInParty = partyProfiles.some(profile => profile.profileId === joinParty.profileId);

    if (userAlreadyInParty) {
      return new HttpException({ message: ["L'utilisateur est déjà dans la soirée."] }, HttpStatus.BAD_REQUEST);
    }

    // Check if a user has not left the party since the last 10 minutes
    const { data: partyProfiles3 } = await this.supabaseService.client
      .from('partyProfiles')
      .select('*')
      .eq('partyId', joinParty.partyId)
      .eq('profileId', joinParty.profileId)
      .eq('status', -2);

    if (partyProfiles3.length !== 0) {
      const today = new Date();
      const timeToJoin = new Date(partyProfiles3[partyProfiles3.length - 1].created_at);
      timeToJoin.setMinutes(timeToJoin.getMinutes() + 10);

      if (today < timeToJoin) {
        return new HttpException({ message: [" Vous devez attendre un moment avant de pouvoir rejoindre la fête."] }, HttpStatus.BAD_REQUEST);
      }
    }

    const { error } = await this.supabaseService.client
      .from('partyProfiles')
      .insert([
        {
          partyId: joinParty.partyId,
          profileId: joinParty.profileId,
        },
      ]);

    if (error) {
      throw error;
    }

    return { statusCode: 201, message: "Created" }
  }


  async getPartyByName(name: string) {
    const { data: party } = await this.supabaseService.client
      .from('party')
      .select('*')
      .eq('name', name);

    return party;
  }

  async getPartyById(id: string) {
    const { data: party } = await this.supabaseService.client
      .from('party')
      .select('*')
      .eq('id', id);

    return { party, statusCode: 200, message: "OK" };
  }

  async updateParty(updateParty: updatePartyDto) {
    const getParty = await this.getPartyById(updateParty.id);

    if (getParty.party.length == 0) {
      return new HttpException({ message: ["La soirée n'existe pas."] }, HttpStatus.NOT_FOUND);
    }

    const { data, error } = await this.supabaseService.client
      .from('party')
      .update([
        {
          name: updateParty.name.toLowerCase(),
          description: updateParty.description,
          location: updateParty.location,
          players: updateParty.players,
          owner: updateParty.owner,
          time: updateParty.time,
          zipcode: updateParty.zipcode,
          dateParty: updateParty.dateParty,
        },
      ])
      .eq('id', updateParty.id)

    return { statusCode: 200, message: "Updated" }
  }

  // Function to delete party changing status to -1
  async deleteParty(id: string) {
    const getParty = await this.getPartyById(id);

    if (getParty.party.length == 0) {
      return new HttpException({ message: ["La soirée n'existe pas."] }, HttpStatus.NOT_FOUND);
    }

    const { data, error } = await this.supabaseService.client
      .from('party')
      .update([
        {
          status: -1,
        },
      ])
      .eq('id', id)

    return { statusCode: 204, message: "Deleted" }
  }

  // Function to leave party putting status to -2
  async leaveParty(dataToLeave: any) {

    const { data: partyProfiles } = await this.supabaseService.client
      .from('partyProfiles')
      .select('*')
      .eq('partyId', dataToLeave.partyId);

    const userAlreadyInParty = partyProfiles.some(profile => profile.profileId === dataToLeave.profileId);

    if (!userAlreadyInParty) {
      return new HttpException({ message: ["L'utilisateur n'est pas dans la soirée."] }, HttpStatus.BAD_REQUEST);
    }

    const { error } = await this.supabaseService.client
      .from('partyProfiles')
      .update([
        {
          status: -2,
        },
      ])
      .eq('partyId', dataToLeave.partyId)
      .eq('profileId', dataToLeave.profileId);

    if (error) {
      return new HttpException({ message: ["Une erreur est survenue."] }, HttpStatus.BAD_REQUEST);
    }

    return { statusCode: 204, message: "Deleted" }
  }

  async savePartyAdmin(newParty: createPartyAdminDto) {
    const { data, error } = await this.supabaseService.client
      .from('party')
      .insert([
        {
          name: newParty.name.toLowerCase(),
          description: newParty.description,
          location: newParty.location,
          players: newParty.players,
          owner: newParty.owner,
          time: newParty.time,
          zipcode: newParty.zipcode,
          dateParty: newParty.dateParty,
          status: newParty.status,
        },
      ]);

    if (error) {
      throw error;
    }
    return { statusCode: 201, message: "Created" }
  }

  // Update party admin
  async updatePartyAdmin(updateParty: updatePartyAdminDto) {
    const getParty = await this.getPartyById(updateParty.id);

    if (getParty.party.length == 0) {
      return new HttpException({ message: ["La soirée n'existe pas."] }, HttpStatus.NOT_FOUND);
    }

    const { data, error } = await this.supabaseService.client
      .from('party')
      .update([
        {
          name: updateParty.name.toLowerCase(),
          description: updateParty.description,
          location: updateParty.location,
          players: updateParty.players,
          owner: updateParty.owner,
          time: updateParty.time,
          zipcode: updateParty.zipcode,
          dateParty: updateParty.dateParty,
          status: updateParty.status,
        },
      ])
      .eq('id', updateParty.id)

    return { statusCode: 200, message: "Updated" }
  }




  // Checkers
  async checkPartyName(name: string) {
    const { data: party } = await this.supabaseService.client
      .from('party')
      .select('*')
      .eq('name', name);

    if (party.length > 0) {
      return new HttpException({ message: ["Le nom de la soirée existe déjà."] }, HttpStatus.BAD_REQUEST);
    }
    return { statusCode: 200, message: "OK" }
  }

  async checkPartyId(id: string) {
    const { data: party } = await this.supabaseService.client
      .from('party')
      .select('*')
      .eq('id', id);

    if (party.length == 0) {
      return new HttpException({ message: ["La soirée n'existe pas."] }, HttpStatus.NOT_FOUND);
    }
    return { statusCode: 200, message: "OK" }
  }

  // Check if it's a good date (could create 12h before)
  async checkDate(dateParty: Date) {
    const today = new Date();
    const dateToCheck = new Date(dateParty);
    dateToCheck.setDate(dateToCheck.getDate() + 1);

    if (today > dateToCheck) {
      return new HttpException({ message: ["La date de la fête doit être prévue 12h avant sa création."] }, HttpStatus.BAD_REQUEST);
    }
    return { statusCode: 200, message: "OK" }
  }

  // Check if there are participants in the party
  async checkParticipantsNumbers(partyId: string) {
    const { data: partyProfiles } = await this.supabaseService.client
      .from('partyProfiles')
      .select('*')
      .eq('partyId', partyId);

    if (partyProfiles.length > 0) {
      return new HttpException({ message: ["La soirée contient des participants."] }, HttpStatus.BAD_REQUEST);
    }
    return { statusCode: 200, message: "OK" }
  }

  // Check if the party is full
  async checkPartyFull(partyId: string) {
    const { data: party } = await this.supabaseService.client
      .from('party')
      .select('*')
      .eq('id', partyId);

    const { data: partyProfiles } = await this.supabaseService.client
      .from('partyProfiles')
      .select('*')
      .eq('partyId', partyId);

    if (partyProfiles.length >= party[0].players) {
      return new HttpException({ message: ["La soirée est déjà pleine."] }, HttpStatus.BAD_REQUEST);
    }
    return { statusCode: 200, message: "OK" }
  }

  // Check if the user exists
  async checkUserExists(profileId: string) {
    const { data: profile } = await this.supabaseService.client
      .from('profiles')
      .select('*')
      .eq('id', profileId);

    if (profile.length == 0) {
      return new HttpException({ message: ["L'utilisateur n'existe pas."] }, HttpStatus.NOT_FOUND);
    }
    return { statusCode: 200, message: "OK" }
  }

  // Check if a user has not left the party since the last 10 minutes
  async checkTimeToJoin(partyId: string, profileId: string) {
    const { data: partyProfiles } = await this.supabaseService.client
      .from('partyProfiles')
      .select('*')
      .eq('partyId', partyId)
      .eq('profileId', profileId)
      .eq('status', -1);

    const today = new Date();
    const timeToJoin = new Date(partyProfiles[0].createdAt);
    timeToJoin.setMinutes(timeToJoin.getMinutes() + 10);

    if (today < timeToJoin) {
      return new HttpException({ message: ["Vous ne pouvez pas rejoindre la soirée."] }, HttpStatus.BAD_REQUEST);
    }
    return { statusCode: 200, message: "OK" }
  }

}
