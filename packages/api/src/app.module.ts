import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import TypeOrmConfig from '@webok/models/lib/typeorm/typeorm.config'
import { AuthModule } from './auth'
import { UserModule } from './user'
import { PageModule } from './page'

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), AuthModule, UserModule, PageModule],
})
export class AppModule {}
