import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { HashSenhaService } from 'src/usuario/services/HashSenha.service';
import { PrismaService } from 'src/database/Prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { GuardService } from './Guard.service';

@Module({
  imports: [
    UsuarioModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuarioService, HashSenhaService, PrismaService, GuardService]
})
export class AuthModule { }
