import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { Duration, DurationObject } from 'luxon'
import config from 'config'
import { LoginRecord, LoginRecordRepository } from '@webok/models/lib/auth'
import { User, UserRepository } from '@webok/models/lib/user'
import { AuthDtoMapper, AuthService, HashingService } from '@webok/services/lib/auth'
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
    TypeOrmModule.forFeature([LoginRecord, LoginRecordRepository]),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  providers: [
    AuthDtoMapper,
    AuthService,
    HashingService,
    { provide: 'config.auth.refreshTokenTTL', useValue: authConfig.refreshTokenTTL },
    AuthStrategy,
  ],
  exports: [HashingService],
  controllers: [AuthController],
})
export class AuthModule {}
