import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/Prisma.service';
import { UsuarioDto } from './dtos/Usuario.dto';
import { HashSenhaService } from './services/HashSenha.service';

@Injectable()
export class UsuarioService {
    constructor(private prismaService: PrismaService, private hashSenhaService: HashSenhaService) { }

    async createUser(usuario: UsuarioDto) {
        const { nome, email, senha } = usuario;

        const senhaHash = await this.hashSenhaService.hashSenha(senha);

        const novoUsuario = await this.prismaService.prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaHash
            }
        })

        return novoUsuario;
    }

    async buscarUsuarioEmail(email: string) {
        return await this.prismaService.prisma.usuario.findFirst({ where: { email } });
    }
}
