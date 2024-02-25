import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthUsuarioDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    senha: string;
}
