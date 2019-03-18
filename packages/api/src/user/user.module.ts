import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from 'config'
import { User, UserRepository } from '@webok/models/lib/user'
import { UserService, AuthService, PasswordHelper } from '@webok/services/lib/user'
import { UserController } from './user.controller'
import { AuthController } from './auth.controller'

interface AuthConfig {
  secretKey: string
  expiresIn: string
}

const authConfig: AuthConfig = config.get<AuthConfig>('auth')

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: authConfig.secretKey,
      signOptions: {
        expiresIn: authConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IAuthService', useClass: AuthService },
    { provide: 'IPasswordHelper', useClass: PasswordHelper },
  ],
  controllers: [AuthController, UserController],
})
export class UserModule {}
