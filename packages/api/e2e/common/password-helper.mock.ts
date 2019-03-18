import { IPasswordHelper } from '@webok/core/lib/user'

// Do not set type IPasswordHelper here so that we can use this object to verify mock
export const passwordHelperMock = {
  hashPassword: jest.fn(async (password: string): Promise<string> => password),
  verifyPassword: jest.fn(async (password: string, passwordHash: string): Promise<boolean> => true),
}

// Inject this object because it has the right type
export const passwordHelperToInject: IPasswordHelper = passwordHelperMock
