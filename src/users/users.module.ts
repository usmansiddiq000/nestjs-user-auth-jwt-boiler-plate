import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schema/user.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({ secret: 'hard!to-guess_secret', publicKey: 'this is public' })
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [JwtModule]
})
export class UsersModule {}
