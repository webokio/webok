import { Module, INestApplication, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import TypeOrmConfig from '@webok/core/lib/typeorm.config'
import { PageModule } from './page'
import { UserModule } from './user'

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UserModule, PageModule],
})
export class AppModule {}

export const configureCommon = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe())
}
