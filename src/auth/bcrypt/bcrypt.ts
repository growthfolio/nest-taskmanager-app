import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {

    async hashPassword(password: string): Promise<string> {
        const saltRounds: number = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async comparePasswords(inputPassword: string, storedPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputPassword, storedPassword);
    }

}
