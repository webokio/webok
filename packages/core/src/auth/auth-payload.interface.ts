// Use interface instead of class because JWT.sign() requires plain object
export interface AuthPayloadInterface {
  readonly authId: number
  readonly userId: number
}
