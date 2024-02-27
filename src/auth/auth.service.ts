import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashSenhaService } from 'src/usuario/services/HashSenha.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly hashSenha: HashSenhaService,
        private readonly jwtService: JwtService) { }

    async singIn(email: string, senha: string) {
        const usuario = await this.usuarioService.buscarUsuarioEmail(email);
        if (!usuario) throw new HttpException('Email inválido', HttpStatus.UNAUTHORIZED);

        const verificaSenha = await this.hashSenha.compareHashSenha(senha, usuario.senha);
        if (!verificaSenha) throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);

        const token = await this.jwtService.signAsync({ id: usuario.id, email: usuario.email });

        return { usuario, token }
    }
}
