import { Module, INestApplication, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PagesModule } from './pages/pages.module'

@Module({
  imports: [TypeOrmModule.forRoot(require('../ormconfig')), PagesModule],
})
class AppModule {}

const configureCommon = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe())
}

export { AppModule, configureCommon }
