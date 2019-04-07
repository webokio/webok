import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common'
import {
  ApiUseTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiModelProperty,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { IsNumberString } from 'class-validator'
import { AuthRequestInterface } from '@webok/core/lib/auth'
import { PageDto, CreatePageDto, UpdatePageDto } from '@webok/core/lib/page'
import { PageService } from '@webok/services/lib/page'

class PageIdParam {
  @ApiModelProperty()
  @IsNumberString()
  readonly pageId!: number
}

@Injectable()
class PageOwnerGuard implements CanActivate {
  constructor (private readonly pageService: PageService) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request: AuthRequestInterface = context.switchToHttp().getRequest()
    const { pageId } = request.params as PageIdParam
    const pageDto: PageDto | undefined = await this.pageService.get(pageId)
    if (!pageDto) {
      return false
    }
    return pageDto.owner.id === request.user.userId
  }
}

@Controller('pages')
@ApiUseTags('Pages')
export class PageController {
  constructor (private readonly pageService: PageService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({ type: [PageDto] })
  async find (@Req() request: AuthRequestInterface): Promise<PageDto[]> {
    const pageDtos: PageDto[] = await this.pageService.find({ ownerId: request.user.userId })
    return pageDtos
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PageDto })
  @ApiBadRequestResponse({})
  @ApiUnauthorizedResponse({})
  async create (@Body() createPageDto: CreatePageDto, @Req() request: AuthRequestInterface): Promise<PageDto> {
    try {
      const pageDto: PageDto = await this.pageService.create(createPageDto, request.user.userId)
      return pageDto
    } catch (err) {
      console.log(err)
      throw new BadRequestException('Invalid page')
    }
  }

  @Get(':pageId')
  @UseGuards(AuthGuard(), PageOwnerGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PageDto })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  async get (@Param() { pageId }: PageIdParam): Promise<PageDto> {
    const pageDto: PageDto | undefined = await this.pageService.get(pageId)
    if (!pageDto) {
      throw new NotFoundException()
    }
    return pageDto
  }

  @Patch(':pageId')
  @UseGuards(AuthGuard(), PageOwnerGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PageDto })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  async update (@Param() { pageId }: PageIdParam, @Body() updatePageDto: UpdatePageDto): Promise<PageDto> {
    const pageDto: PageDto | undefined = await this.pageService.update(pageId, updatePageDto)
    if (!pageDto) {
      throw new NotFoundException()
    }
    return pageDto
  }

  @Delete(':pageId')
  @UseGuards(AuthGuard(), PageOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiNoContentResponse({})
  @ApiBadRequestResponse({})
  async remove (@Param() { pageId }: PageIdParam): Promise<void> {
    await this.pageService.remove(pageId)
  }
}
