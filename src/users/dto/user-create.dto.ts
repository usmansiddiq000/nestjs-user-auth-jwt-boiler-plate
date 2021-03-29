import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly lastName: string

    @IsNotEmpty()
    readonly password: string

    @IsEmail()
    readonly email: string

    @IsEmpty()
    role: string[]

    @IsEmpty()
    activeJwt: string
}