import { Connection, createConnection } from 'typeorm';
import { User } from './entity/User';

export async function initializeConnection(): Promise<Connection> {
  return createConnection({
    name: 'default',
    type: 'sqlite',
    database: 'test.sqlite',
    entities: [User],
    synchronize: true,
    logging: true,
  });
}
