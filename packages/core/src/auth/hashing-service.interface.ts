export interface HashingServiceInterface {
  hash (secret: string): Promise<string>
  compare (secret: string, secretHash: string): Promise<boolean>
}
