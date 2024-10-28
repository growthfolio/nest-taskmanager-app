import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt{

    async criptografarSenha(password: string): Promise<string> {

        let saltRounds: number = 10;
        return await bcrypt.hash(password, saltRounds)

    }

    async compararSenhas(passInputed: string, db_pass: string): Promise<boolean> {
        return await bcrypt.compare(passInputed, db_pass);
    }

}