import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  adminKey: process.env.ADMIN_KEY,
  database: {
    uri: process.env.DB_URI,
    runMigrations: process.env.DB_MIGRATE !== 'false',
  },
  kafka: {
    broker: process.env.KAFKA_BROKER ?? 'localhost:9093',
  },
});
