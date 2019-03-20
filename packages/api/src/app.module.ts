import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import TypeOrmConfig from '@webok/models/lib/typeorm/typeorm.config'
import { UserModule } from './user'
import { AuthModule } from './auth'
import { PageModule } from './page'

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UserModule, AuthModule, PageModule],
})
export class AppModule {}
