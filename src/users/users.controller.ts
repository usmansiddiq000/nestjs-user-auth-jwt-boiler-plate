import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UserSerializer } from './serializer/user.serializer';


import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/user-login.dto';


import { Roles } from 'src/decorators/roles.decorators';

@Controller('api/users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
        ){}
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('signup')
    async create(@Body() body: CreateUserDto): Promise<UserSerializer> {
        try{
            let user = await this.userService.getByEmail(body.email)
            if(user) throw new Error('Email already exists');
            user = await this.userService.create(body);
            const newUser  =  user.toJSON()
            newUser.token = this.jwtService.sign(newUser);
            return new UserSerializer (newUser);
        }
        catch(error) {
            throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Get()
    @Roles('admin')
    @UseInterceptors(ClassSerializerInterceptor)
    async getAll(): Promise<UserSerializer[]> {
        try{
            const users = await this.userService.getAll();
            return users.map(u => new UserSerializer(u.toObject()));
        }
        catch(error) {
            throw new HttpException('Error', HttpStatus.EXPECTATION_FAILED);
        }
    }

    @Post('/signin')
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Body() body : LoginUserDto): Promise<UserSerializer> {
        try{
            const user = await this.userService.login(body);
            const newUser  =  user.toJSON()
            newUser.token = this.jwtService.sign(newUser);
            return new UserSerializer (newUser);
        }
        catch(error) {
            throw new HttpException('Error', HttpStatus.EXPECTATION_FAILED);
        }
    }
}
