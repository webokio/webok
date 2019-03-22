import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Duration, DurationObject } from 'luxon'
import config from 'config'
import { LoginRecord, LoginRecordRepository } from '@webok/models/lib/auth'
import { User, UserRepository } from '@webok/models/lib/user'
import { AuthService, PasswordHelper } from '@webok/services/lib/auth'
import { AuthController } from './auth.controller'

interface AuthConfig {
  secretKey: string
  accessTokenTTL: DurationObject
  refreshTokenTTL: DurationObject
}

const authConfig: AuthConfig = config.get<AuthConfig>('auth')

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: authConfig.secretKey,
      signOptions: {
        expiresIn: Duration.fromObject(authConfig.accessTokenTTL).as('seconds'),
      },
    }),
    TypeOrmModule.forFeature([LoginRecord, LoginRecordRepository]),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  providers: [
    { provide: 'IAuthService', useClass: AuthService },
    { provide: 'IPasswordHelper', useClass: PasswordHelper },
    { provide: 'config.auth.refreshTokenTTL', useValue: authConfig.refreshTokenTTL },
  ],
  exports: [{ provide: 'IPasswordHelper', useClass: PasswordHelper }],
  controllers: [AuthController],
})
export class AuthModule {}
