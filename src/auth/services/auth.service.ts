import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UserLogin } from '../entities/userlogin.entity';


@Injectable()
export class AuthService{
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){ }

    async validateUser(email: string, password: string): Promise<any>{

        const userExists = await this.userService.findByEmail(email)

        if(!userExists)
            throw new HttpException('User not Found!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.comparePasswords(password, userExists.password)

        if(userExists && matchPassword){
            const { password, ...response } = userExists
            return response
        }

        return null

    }

    async login(userLogin: UserLogin){

        const payload = { sub: userLogin.email }

        const userExists = await this.userService.findByEmail(userLogin.email)

        return{
            id: userExists.id,
            name: userExists.name,
            email: userLogin.email,
            password: '',
            photo: userExists.photo,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }

    }
}