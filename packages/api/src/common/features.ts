import { INestApplication, ValidationPipe } from '@nestjs/common'

export const configureFeatures = async (app: INestApplication): Promise<void> => {
  app.useGlobalPipes(new ValidationPipe())
}
