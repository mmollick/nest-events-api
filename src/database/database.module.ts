import { Global, Module } from '@nestjs/common';
import { DB_CLIENT, DB_CONNECTION } from './database.constant';
import { DatabaseConnection } from './database-connection.service';

@Global()
@Module({
  providers: [
    {
      provide: DB_CONNECTION,
      useClass: DatabaseConnection,
    },
    {
      provide: DB_CLIENT,
      useFactory: (connection: DatabaseConnection) => {
        return connection.client;
      },
      inject: [DB_CONNECTION],
    },
  ],
  exports: [DB_CLIENT],
})
export class DatabaseModule {}
