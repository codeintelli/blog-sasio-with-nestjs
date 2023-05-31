import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './jwt.strategy';
import { AuthService } from './services/auth.service';
import { UserSchema } from 'src/Models/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ContextService } from 'src/common/services/context.service';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [PassportModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), CommonModule],
    providers: [JwtStrategyService, AuthService, ContextService],
    exports: [JwtStrategyService, AuthService, ContextService]
})
export class AuthModule {
}
