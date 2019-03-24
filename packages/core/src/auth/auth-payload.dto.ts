export interface AuthPayloadDtoOptions {
  readonly authId: number
  readonly userId: number
}

export class AuthPayloadDto {
  readonly authId: number
  readonly userId: number

  constructor (authPayloadOptions: AuthPayloadDtoOptions) {
    const { authId, userId } = authPayloadOptions
    this.authId = authId
    this.userId = userId
  }

  // Special method to force DTO usage
  __isDto () {
    return true
  }
}
