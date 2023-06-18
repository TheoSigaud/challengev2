import { IsNotEmpty, IsOptional, IsUUID, IsInt, Min, IsString, Matches, IsDateString } from 'class-validator';

export class createPartyDto {
    @IsNotEmpty({message:"Veuillez remplir tous les champs."})
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    location: string;

    @IsInt()
    @Min(2)
    players: number;

    @IsUUID()
    owner: string;

    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    time: string;

    @IsInt()
    zipcode: number | null;

    @IsDateString()
    dateParty: Date | null;

    constructor(data: Partial<createPartyDto>) {
        Object.assign(this, data);
    }
}