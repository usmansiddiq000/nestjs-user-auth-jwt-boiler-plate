import { Exclude, Transform } from 'class-transformer';

export class UserSerializer {
    firstName: string
    lastName: string
    email: string
    role: string[]
    token: string

    @Transform(({value}) => value.toString())
    _id: string

    @Exclude()
    password: string;

    @Exclude()
    activeJwts: string[]

  constructor(partial: Partial<UserSerializer>) {
    Object.assign(this, partial);
  }
}