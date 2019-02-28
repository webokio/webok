import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common'
import {
  ApiUseTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger'
import { PageService, Page, CreatePageData, UpdatePageData, ParamsWithId } from '@webok/pages'

@ApiUseTags('Pages')
@Controller('pages')
class PagesController {
  constructor (protected readonly pageService: PageService) {}

  @ApiOkResponse({ type: [Page] })
  @Get()
  findAll (): Promise<Page[]> {
    return this.pageService.findAll()
  }

  @ApiOkResponse({ type: Page })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  @Get(':id')
  async get (@Param() { id }: ParamsWithId): Promise<Page> {
    const page = await this.pageService.get(id)
    return page.orElseThrow(() => new NotFoundException())
  }

  @ApiCreatedResponse({ type: Page })
  @ApiBadRequestResponse({})
  @Post()
  create (@Body() data: CreatePageData): Promise<Page> {
    return this.pageService.create(data)
  }

  @ApiOkResponse({ type: Page })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  @Patch(':id')
  async update (@Param() { id }: ParamsWithId, @Body() data: UpdatePageData): Promise<Page> {
    const page = await this.pageService.update(id, data)
    return page.orElseThrow(() => new NotFoundException())
  }

  @ApiOkResponse({})
  @ApiBadRequestResponse({})
  @Delete(':id')
  async remove (@Param() { id }: ParamsWithId) {
    await this.pageService.remove(id)
  }
}

export { PagesController }
