import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async gerarToken(payload: any) {
        return await this.jwtService.signAsync(payload);
    }

    async verificaToken(token: string) {
        return await this.jwtService.verifyAsync(token);
    }
}
