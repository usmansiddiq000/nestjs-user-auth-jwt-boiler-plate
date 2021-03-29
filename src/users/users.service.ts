import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/user-create.dto';
import { LoginUserDto } from './dto/user-login.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async create (user:CreateUserDto): Promise<IUser> {
        return await this.userModel.create(user);
    }

    async getAll(): Promise<IUser[]> {
        return await this.userModel.find({});
    }

    async getByEmail(email:string): Promise<IUser>{
        return this.userModel.findOne({email})
    }

    async login(data: LoginUserDto): Promise <IUser> {
        const user  = await this.getByEmail(data.email);
        return user;
    }
}
