import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extrairTokenHeader(request);

        if (!token) throw new HttpException('Para ter acesso, um token válido deve ser fornecido.', HttpStatus.UNAUTHORIZED);

        try {
            const payload = await this.jwtService.verifyAsync(token);
            console.log(payload);
            request.usuario = payload;
            return true;
        } catch (error) {
            throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
        }
    }

    private extrairTokenHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
