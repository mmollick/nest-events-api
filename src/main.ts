import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { DB_CONNECTION } from './database/database.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Optionally run migrations
  const runMigrations = configService.get('database.runMigrations');
  if (runMigrations) {
    logger.log('Running Migrations');
    const db = app.get(DB_CONNECTION);
    await migrate(db, { migrationsFolder: './drizzle' });
  }

  await app.listen(configService.get('port'));
}
bootstrap();
