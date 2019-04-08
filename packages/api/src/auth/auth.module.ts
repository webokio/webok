import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoginRecord, LoginRecordRepository } from '@webok/models/lib/auth'
import { User, UserRepository } from '@webok/models/lib/user'
import { AuthDtoMapper, AuthService, HashingService } from '@webok/services/lib/auth'
import config from 'config'
import { Duration, DurationObject } from 'luxon'
import { AuthController } from './auth.controller'
import { AuthStrategy } from './auth.strategy'

interface AuthConfig {
  secretKey: string
  accessTokenTTL: DurationObject
  refreshTokenTTL: DurationObject
}

const authConfig: AuthConfig = config.get<AuthConfig>('auth')

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: authConfig.secretKey,
      signOptions: {
        expiresIn: Duration.fromObject(authConfig.accessTokenTTL).as('seconds'),
      },
    }),
    TypeOrmModule.forFeature([LoginRecord, LoginRecordRepository, User, UserRepository]),
  ],
  providers: [
    AuthDtoMapper,
    AuthService,
    HashingService,
    { provide: 'config.auth.refreshTokenTTL', useValue: authConfig.refreshTokenTTL },
    { provide: 'config.auth.secretKey', useValue: authConfig.secretKey },
    AuthStrategy,
  ],
  exports: [HashingService],
  controllers: [AuthController],
})
export class AuthModule {}
