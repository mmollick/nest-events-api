import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { DB_CONNECTION } from './database/database.constant';
import { AppConfig } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);

  // Optionally run migrations
  const runMigrations = configService.get('database.runMigrations');
  if (runMigrations) {
    console.log('Running Migrations');
    const db = app.get(DB_CONNECTION);
    await migrate(db, { migrationsFolder: './drizzle' });
  }

  await app.listen(configService.get('port'));
}
bootstrap();
