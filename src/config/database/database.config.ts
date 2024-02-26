import 'dotenv/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_ENTITIES,
  DB_MIGRATIONS,
} = process.env;

const databaseOptions: MysqlConnectionOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [DB_ENTITIES],
  migrations: [DB_MIGRATIONS],
  synchronize: true,
  migrationsRun: true,
};

export default databaseOptions;
