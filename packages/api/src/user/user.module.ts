import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@webok/core/lib/user'
import { UserRepository, UserService } from '@webok/services/lib/user'
import { UserController } from './user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [{ provide: 'IUserService', useClass: UserService }],
  controllers: [UserController],
})
export class UserModule {}
