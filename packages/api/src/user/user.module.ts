import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, UserRepository } from '@webok/models/lib/user'
import { UserDtoMapper, UserService } from '@webok/services/lib/user'
import { AuthModule } from '../auth'
import { UserController } from './user.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    // Import AuthModule to use HashingService
    AuthModule,
  ],
  providers: [UserDtoMapper, UserService],
  controllers: [UserController],
  exports: [UserDtoMapper],
})
export class UserModule {}
