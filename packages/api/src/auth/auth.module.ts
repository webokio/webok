import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthConfig } from '@webok/core/lib/auth'
import { AuthService } from '@webok/services/lib/auth'
import { User } from '@webok/core/lib/user'
import { UserRepository, PasswordHelper } from '@webok/services/lib/user'
import { AuthController } from './auth.controller'

@Module({
  imports: [JwtModule.register(AuthConfig), TypeOrmModule.forFeature([User, UserRepository])],
  providers: [
    { provide: 'IAuthService', useClass: AuthService },
    { provide: 'IPasswordHelper', useClass: PasswordHelper },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
