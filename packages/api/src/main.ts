import fs from 'fs'
import path from 'path'
import { NestFactory } from '@nestjs/core'
import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

const configureDocs = (app: INestApplication) => {
  const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))
  const options = new DocumentBuilder()
    .setTitle('WebOK')
    .setVersion(version)
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('explorer', app, document)
}

export const start = async () => {
  const app: INestApplication = await NestFactory.create(AppModule)
  configureDocs(app)
  await app.listen(process.env.PORT || 4100)
}

if (require.main === module) {
  start().catch(console.error)
}
