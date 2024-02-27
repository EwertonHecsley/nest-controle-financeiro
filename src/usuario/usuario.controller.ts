import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './dtos/Usuario.dto';
import { Response } from 'express';
import { GuardService } from 'src/auth/Guard.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) { }

    @Post()
    async criarUsuario(@Body() usuario: UsuarioDto, @Res() res: Response) {
        if (await this.usuarioService.buscarUsuarioEmail(usuario.email)) throw new HttpException('Email já cadastrado.', HttpStatus.BAD_REQUEST);

        const result = await this.usuarioService.createUser(usuario);
        const { senha: _, ...usuarioFormatado } = result;

        return res.status(HttpStatus.CREATED).json({ mensaem: 'Usuário cadastrado com sucesso.', usuario: usuarioFormatado })
    }

    //Teste de busca
    @Get()
    @UseGuards(GuardService)
    async buscarUsuario(@Res() res: Response) {
        const usuario = await this.usuarioService.buscarUsuarioEmail('hecsleyavschin@gmail.com');
        return res.status(HttpStatus.OK).json(usuario);
    }
}
