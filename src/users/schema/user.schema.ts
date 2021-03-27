import { Schema,Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop({required: true})
  firstName: string;

  @Prop({required: true})
  lastName: string;

  @Prop({unique: true})
  email: string;

  @Prop({select: false})
  password: string;

  @Prop({select: false })
  activeJwts: string[]

  @Prop({ type: String, enum: ['admin', 'member'], default: 'member' })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next: HookNextFunction) {
    try {
        if (!this.isModified('password')) {
          return next();
        }
        const saltRounds = 14;
        const hashed = await bcrypt.hash(this['password'], saltRounds);
        this['password'] = hashed;
        return next();
      } catch (err) {
        return next(err);
      }
})

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => callback(err, isMatch));
};

