import * as bcrypt from 'bcrypt';

export class HashSenhaService {
    async hashSenha(senha: string): Promise<string> {
        return await bcrypt.hash(senha, 8);
    }

    async compareHashSenha(senha: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(senha, hash);
    }
}