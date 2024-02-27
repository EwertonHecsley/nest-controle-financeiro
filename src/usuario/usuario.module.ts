import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/database/Prisma.service';
import { HashSenhaService } from './services/HashSenha.service';
import { JwtService } from '@nestjs/jwt';


@Module({
    providers: [UsuarioService, PrismaService, HashSenhaService, JwtService],
    controllers: [UsuarioController]
})
export class UsuarioModule { }
