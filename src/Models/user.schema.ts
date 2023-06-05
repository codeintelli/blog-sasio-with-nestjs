import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import Roles from 'src/Modules/user/enum/role.enum';
import { Exclude } from 'class-transformer';
export type userDocument = User & Document;
@Schema({ timestamps: true })
export class User {
    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    email: string;

    @Prop({ select: false })
    @Exclude()
    password: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isOnline: boolean;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({
        default: Roles.USER
    })
    role: Roles.USER;

    @Prop()
    resetPasswordToken: string;

    @Prop()
    resetPasswordExpire: Date

}
export const UserSchema = SchemaFactory.createForClass(User);