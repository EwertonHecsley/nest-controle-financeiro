import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';


@Injectable()
export class GuardService {
    constructor(private readonly authService: AuthService) { }

    verifiAuthorization(@Req() req: Request) {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new UnauthorizedException("Para ter acesso,deve ser passado um token válido");
        }


    }


}