export type AppConfig = {
  port: number;
  database: {
    uri: string;
    runMigrations: boolean;
  };
};

export default (): AppConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.DB_URI,
    runMigrations: process.env.DB_MIGRATE !== 'false',
  },
});
