import { Module, INestApplication, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import TypeOrmConfig from '@webok/core/lib/typeorm.config'
import { PageModule } from './page'

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), PageModule],
})
export class AppModule {}

export const configureCommon = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe())
}
