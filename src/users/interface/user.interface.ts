import mongoose , { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    activeJwts: string[]
    role: string[]
    token: string
}