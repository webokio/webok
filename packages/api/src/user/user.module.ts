import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, UserRepository } from '@webok/models/lib/user'
import { UserService } from '@webok/services/lib/user'
import { AuthModule } from '../auth'
import { UserController } from './user.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    // Import AuthModule to use PasswordHelper
    AuthModule,
  ],
  providers: [{ provide: 'IUserService', useClass: UserService }],
  controllers: [UserController],
})
export class UserModule {}
