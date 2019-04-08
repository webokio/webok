import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import TypeOrmConfig from '@webok/models/lib/typeorm/typeorm.config'
import { AuthModule } from './auth'
import { PageModule } from './page'
import { UserModule } from './user'

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), AuthModule, UserModule, PageModule],
})
export class AppModule {}
