import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, UserRepository } from '@webok/models/lib/user'
import { UserService, PasswordHelper } from '@webok/services/lib/user'
import { UserController } from './user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IPasswordHelper', useClass: PasswordHelper },
  ],
  controllers: [UserController],
})
export class UserModule {}
