import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENTITIES } from './Entities';

export const TYPEORM_CONFIG: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOSTNAME,
    port: Number.parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'mysql',
    database: process.env.DB_NAME || 'convictionsai',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    connectTimeout: 30000,
    logging: process.env.DB_LOGGING === 'true',
    keepConnectionAlive: true,
    entities: ENTITIES,
    migrationsTableName: '_migrations',
    migrations: ['./migrations/*.ts']
};
