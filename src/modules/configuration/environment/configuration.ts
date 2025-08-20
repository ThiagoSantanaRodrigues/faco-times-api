const { env } = process;

export default () => ({
  environment: env.FACO_TIMES_ENV,
  port: env.PORT ? parseInt(env.PORT, 10) : 3000,
  database: {
    host: env.DATABASE_HOST || 'postgres',
    port: env.DATABASE_PORT ? parseInt(env.DATABASE_PORT, 10) : 5432,
    username: env.POSTGRESQL_USER || 'faco_times',
    password: env.POSTGRESQL_PASSWORD || 'faco_times',
    database: env.POSTGRESQL_DB || 'faco_times',
  },
  orm: {
    synchronize: false,
    migrationsRun: true,
    entities: ['dist/modules/**/entities/**/*.entity.{js,ts}'],
    migrations: ['dist/modules/database/migrations/*.js'],
    seeds: ['dist/modules/database/seeds/**/*.js'],
    cli: {
      entitiesDir: 'src/modules/**/database/entities',
      migrationsDir: 'src/modules/database/migrations'
    }
  },
  disk: {
    path: env.DISK_PATH || '/',
    thresholdPercent: env.DISK_THRESHOLD_PERCENT || 0.5
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN
  }
});
