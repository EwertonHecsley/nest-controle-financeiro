import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsuarioDto {

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    senha: string

    id?: number;
}