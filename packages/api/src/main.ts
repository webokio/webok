import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

export const start = async () => {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT || 4100)
}

if (require.main === module) {
  start().catch(console.error)
}
