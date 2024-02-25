import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashSenhaService } from 'src/usuario/services/HashSenha.service';
import { AuthUsuarioDto } from './dtos/AuthUsuario.dto';
import { Response } from 'express';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('login')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly hashSenhaService: HashSenhaService,
        private readonly usuarioService: UsuarioService) { }

    @Post()
    async login(@Body() usuarioReq: AuthUsuarioDto, @Res() res: Response) {
        const { email, senha } = usuarioReq;

        const usuario = await this.usuarioService.buscarUsuarioEmail(email);
        if (!usuario) throw new HttpException('Email inválido', HttpStatus.UNAUTHORIZED);

        const verificaSenha = await this.hashSenhaService.compareHashSenha(senha, usuario.senha);
        if (!verificaSenha) throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);

        const { senha: _, ...usuarioFormatado } = usuario;

        const token = await this.authService.gerarToken({ id: usuario.id, email: usuario.email });

        return res.status(HttpStatus.ACCEPTED).json({ mensagem: 'Usuário logado com sucesso.', usuario: usuarioFormatado, token });
    }
}
