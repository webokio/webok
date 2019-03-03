import { Module, INestApplication, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import TypeOrmConfig from '@webok/core/lib/typeorm.config'
import { PageModule } from './page'

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), PageModule],
})
class AppModule {}

const configureCommon = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe())
}

export { AppModule, configureCommon }
