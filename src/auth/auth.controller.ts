import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashSenhaService } from 'src/usuario/services/HashSenha.service';
import { AuthUsuarioDto } from './dtos/AuthUsuario.dto';
import { Response } from 'express';

@Controller('login')
export class AuthController {
    constructor(
        private readonly authService: AuthService) { }

    @Post()
    async login(@Body() usuarioReq: AuthUsuarioDto, @Res() res: Response) {
        const { email, senha } = usuarioReq;

        const usuarioBd = await this.authService.singIn(email, senha);

        const { usuario, token } = usuarioBd;
        const { senha: _, ...result } = usuario;

        return res.status(HttpStatus.ACCEPTED).json({ mensagem: 'Usuário logado com sucesso.', usuario: result, token });
    }

}
