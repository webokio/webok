import { AuthDto } from "./auth.dto";
import { CreateAuthDto } from "./create-auth.dto";
import { ModifyAuthDto } from "./modify-auth.dto";

export interface AuthServiceInterface {
  create (createAuthDto: CreateAuthDto): Promise<AuthDto>
  refresh (authId: number, modifyAuthDto: ModifyAuthDto): Promise<AuthDto>
  remove (authId: number, modifyAuthDto: ModifyAuthDto): Promise<AuthDto>
}
