import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class createCompanyDto {

    @IsNotEmpty({message:"Veuillez remplir tous les champs."})
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty({message:"Veuillez remplir tous les champs."})
    address : string;

    @IsNotEmpty({message:"Veuillez remplir tous les champs."})
    city: string;

    @IsNotEmpty({message:"Veuillez remplir tous les champs."})
    zipcode: number

    @IsNotEmpty({message:"Veuillez remplir tous les champs."})
    message: string;

    @IsNotEmpty({message:"Veuillez remplir tous les champs."})
    number: number;

}