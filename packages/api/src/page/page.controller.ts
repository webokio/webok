import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common'
import { PageService, Page, CreatePageData, UpdatePageData } from '@webok/core/lib/page'
import { ParamsWithId } from '../common/controller'

@Controller('pages')
export class PageController {
  constructor (protected readonly pageService: PageService) {}

  @Get()
  find (): Promise<Page[]> {
    return this.pageService.find()
  }

  @Get(':id')
  async get (@Param() { id }: ParamsWithId): Promise<Page> {
    const page = await this.pageService.get(id)
    return page.orElseThrow(() => new NotFoundException())
  }

  @Post()
  create (@Body() data: CreatePageData): Promise<Page> {
    return this.pageService.create(data)
  }

  @Patch(':id')
  async update (@Param() { id }: ParamsWithId, @Body() data: UpdatePageData): Promise<Page> {
    const page = await this.pageService.update(id, data)
    return page.orElseThrow(() => new NotFoundException())
  }

  @Delete(':id')
  async remove (@Param() { id }: ParamsWithId) {
    await this.pageService.remove(id)
  }
}
