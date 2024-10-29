import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) {}

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { email }
        });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({
            relations: {
                task: true
            }
        });
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {
                task: true
            }
        });

        if (!user)
            throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);

        return user;
    }

    async create(user: User): Promise<User> {
        const userExists = await this.findByEmail(user.email);

        if (!userExists) {
            user.password = await this.bcrypt.hashPassword(user.password);
            return this.userRepository.save(user);
        }

        throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    async update(user: User): Promise<User> {
        const updateUser: User = await this.findById(user.id);
        const userExists = await this.findByEmail(user.email);

        if (userExists && userExists.id !== user.id)
            throw new HttpException('Email already registered!', HttpStatus.BAD_REQUEST);

        updateUser.password = await this.bcrypt.hashPassword(user.password);
        return this.userRepository.save(updateUser);
    }
}