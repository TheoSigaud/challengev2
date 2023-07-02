import { Controller, Post, Get, Inject, Param, Body, Patch, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('party')
export class PartyController {

  constructor(@Inject('PARTY_SERVICE') private client: ClientProxy) { }

  @Get('')
  getParties() {
    return this.client.send({ cmd: 'party_getParties' }, {});
  }

  @Get('all-participants')
  getAllParticipants() {
    return this.client.send({ cmd: 'party_getAllPartipants' }, {});
  }

  @Get('participants/:id')
  getParticipants(@Param('id') id: any) {
    return this.client.send({ cmd: 'party_getParticipants' }, { id });
  }

  @Get(':id')
  getParty(@Param('id') id: any) {
    return this.client.send({ cmd: 'party_getParty' }, { id });
  }

  @Patch('refuse')
  declineParticipant(@Body() party: any) {
    console.log(party);

    return this.client.send({ cmd: 'party_declineParticipant' }, party);
  }

  @Patch('confirm')
  acceptParticipant(@Body() party: any) {
    return this.client.send({ cmd: 'party_acceptParticipant' }, party);
  }

  @Post('save')
  saveParty(@Body() party: any) {
    return this.client.send({ cmd: 'party_saveParty' }, party);
  }

  @Post('join')
  joinParty(@Body() party: any) {
    return this.client.send({ cmd: 'party_joinParty' }, party);
  }

  @Patch(':id')
  updateParty(@Param('id') id: string, @Body() party: any) {
    return this.client.send({ cmd: 'party_updateParty' }, { ...party, id });
  }

  @Delete(':id')
  deleteParty(@Param('id') id: string) {
    return this.client.send({ cmd: 'party_deleteParty' }, id);
  }

  // method to leave a party
  @Post('leave')
  leaveParty(@Body() party: any) {
    return this.client.send({ cmd: 'party_leaveParty' }, party);
  }

  // method to save a party as admin
  @Post('admin/save')
  savePartyAdmin(@Body() party: any) {
    return this.client.send({ cmd: 'party_savePartyAdmin' }, party);
  }

}