import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './dtos/Usuario.dto';
import { Response } from 'express';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) { }

    @Post()
    async criarUsuario(@Body() usuario: UsuarioDto, @Res() res: Response) {
        const result = await this.usuarioService.createUser(usuario);
        const { senha: _, ...usuarioFormatado } = result;

        return res.status(HttpStatus.CREATED).json({ mensaem: 'Usuário cadastrado com sucesso.', usuario: usuarioFormatado })
    }
}
