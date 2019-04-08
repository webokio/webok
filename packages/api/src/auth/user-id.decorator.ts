import { createParamDecorator } from '@nestjs/common'
import { AuthRequestInterface } from '@webok/core/lib/auth'

export const UserId = createParamDecorator(
  (data, request): number => {
    const { user } = request as AuthRequestInterface
    return user.userId
  },
)
