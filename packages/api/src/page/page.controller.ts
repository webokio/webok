import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common'
import { PageService, Page, CreatePageData, UpdatePageData } from '@webok/core/lib/page'

@Controller('pages')
export class PageController {
  constructor (private readonly pageService: PageService) {}

  @Get()
  find (): Promise<Page[]> {
    return this.pageService.find()
  }

  @Get(':id')
  async get (@Param('id') id: number): Promise<Page> {
    const page = await this.pageService.get(id)
    return page.orElseThrow(() => new NotFoundException())
  }

  @Post()
  create (@Body() data: CreatePageData): Promise<Page> {
    return this.pageService.create(data)
  }

  @Patch(':id')
  async update (@Param('id') id: number, @Body() data: UpdatePageData): Promise<Page> {
    const page = await this.pageService.update(id, data)
    return page.orElseThrow(() => new NotFoundException())
  }

  @Delete(':id')
  async remove (@Param('id') id: number): Promise<void> {
    await this.pageService.remove(id)
  }
}
