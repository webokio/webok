import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page, PageService } from '@webok/pages'
import { PagesController } from './pages.controller'

const PageServiceProvider = {
  provide: PageService,
  useClass: PageService,
}

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [PagesController],
  providers: [PageServiceProvider],
})
class PagesModule {}

export { PagesModule }
