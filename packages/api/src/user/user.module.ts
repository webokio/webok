import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthConfig } from '@webok/core/lib/auth'
import { AuthService } from '@webok/services/lib/auth'
import { User } from '@webok/core/lib/user'
import { UserRepository, UserService, PasswordHelper } from '@webok/services/lib/user'
import { AuthController } from './auth.controller'
import { UserController } from './user.controller'

@Module({
  imports: [JwtModule.register(AuthConfig), TypeOrmModule.forFeature([User, UserRepository])],
  providers: [
    { provide: 'IAuthService', useClass: AuthService },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IPasswordHelper', useClass: PasswordHelper },
  ],
  controllers: [AuthController, UserController],
})
export class UserModule {}
