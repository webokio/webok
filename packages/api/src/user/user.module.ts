import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, UserRepository, UserService } from '@webok/core/lib/user'
import { UserController } from './user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
