import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import fs from 'fs'
import path from 'path'
import { AppModule } from './app.module'
import { configureFeatures } from './features'

const configureDocs = async (app: INestApplication): Promise<void> => {
  const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))
  const options = new DocumentBuilder()
    .setTitle('WebOK')
    .setVersion(version)
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('explorer', app, document)
}

export const start = async () => {
  const app: INestApplication = await NestFactory.create(AppModule)
  await configureFeatures(app)
  await configureDocs(app)
  await app.listen(process.env.PORT || 4100)
}

if (require.main === module) {
  start().catch(console.error)
}
