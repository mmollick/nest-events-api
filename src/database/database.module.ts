import { Global, Module } from '@nestjs/common';
import { DB_CONNECTION } from './database.constant';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const dbProvider = {
  provide: DB_CONNECTION,
  useFactory: async (config: ConfigService) => {
    const queryClient = new Pool({
      connectionString: config.get('database.uri'),
    });
    return drizzle(queryClient);
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
