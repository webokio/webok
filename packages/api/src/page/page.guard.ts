import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { PageService } from '@webok/services/lib/page'
import { PageDto } from '@webok/core/lib/page'
import { RequestInterface } from '../auth/auth-request.interface'

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor (private readonly pageService: PageService) {}
  async canActivate (context: ExecutionContext): Promise<boolean> {
    const req: RequestInterface = context.switchToHttp().getRequest()
    if (!req.user) {
      return false
    }
    const pageDto: PageDto | undefined = await this.pageService.get(req.user.userId, req.params.pageId)
    return !!pageDto
  }
}
