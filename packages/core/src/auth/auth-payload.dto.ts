export interface AuthPayloadDtoOptions {
  readonly authId: number
  readonly userId: number
}

export class AuthPayloadDto {
  readonly authId: number
  readonly userId: number

  // A special field to force DTO usage
  private readonly isDto = true

  constructor (authPayloadOptions: AuthPayloadDtoOptions) {
    const { authId, userId } = authPayloadOptions
    this.authId = authId
    this.userId = userId
  }
}
