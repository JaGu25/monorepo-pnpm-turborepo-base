import { writeFileSync } from 'fs';
import { resolve } from 'path';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '../src/app.module';

async function generateOpenApi() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('Enterprise Notes CRUD API')
    .setVersion('1.0')
    .addTag('notes')
    .addServer('http://localhost:3001')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const outputPath = resolve(__dirname, '../../../packages/contracts/openapi.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2));

  await app.close();
}

generateOpenApi();
