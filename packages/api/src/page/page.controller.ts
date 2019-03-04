import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common'
import { ApiUseTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { PageService, Page, CreatePageData, UpdatePageData } from '@webok/core/lib/page'
import { ParamsWithId } from '../common/controller'

@Controller('pages')
@ApiUseTags('Pages')
export class PageController {
  constructor (private readonly pageService: PageService) {}

  @Get()
  @ApiOkResponse({ type: [Page] })
  find (): Promise<Page[]> {
    return this.pageService.find()
  }

  @Get(':id')
  @ApiOkResponse({ type: Page })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  async get (@Param() { id }: ParamsWithId): Promise<Page> {
    const page = await this.pageService.get(id)
    return page.orElseThrow(() => new NotFoundException())
  }

  @Post()
  @ApiCreatedResponse({ type: Page })
  @ApiBadRequestResponse({})
  create (@Body() data: CreatePageData): Promise<Page> {
    return this.pageService.create(data)
  }

  @Patch(':id')
  @ApiOkResponse({ type: Page })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  async update (@Param() { id }: ParamsWithId, @Body() data: UpdatePageData): Promise<Page> {
    const page = await this.pageService.update(id, data)
    return page.orElseThrow(() => new NotFoundException())
  }

  @Delete(':id')
  @ApiOkResponse({})
  @ApiBadRequestResponse({})
  async remove (@Param() { id }: ParamsWithId): Promise<void> {
    await this.pageService.remove(id)
  }
}
