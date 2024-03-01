import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export type DatabaseClient = NodePgDatabase<typeof schema>;

@Injectable()
export class DatabaseConnection implements OnModuleDestroy, OnModuleInit {
  private logger = new Logger('DatabaseConnection');

  public readonly pool: Pool;
  public readonly client: DatabaseClient;

  /**
   * Inits a new database using the config options
   * @param config
   */
  constructor(private config: ConfigService) {
    this.logger.log('Connecting to Database');
    const connectionString = this.config.get<string>('database.uri');
    this.pool = new Pool({ connectionString });
    this.client = drizzle(this.pool, { schema });
    return this;
  }

  /**
   * When initializing module, run migrations unless config disables it
   */
  async onModuleInit() {
    const runMigrations = this.config.get('database.runMigrations');
    if (runMigrations) {
      this.logger.log('Running Migrations');
      await migrate(this.client, { migrationsFolder: './drizzle' });
    }
  }

  /**
   * Close database connection when module is destroyed
   */
  async onModuleDestroy() {
    this.logger.log('Closing Connection');
    await this.pool.end();
  }
}
