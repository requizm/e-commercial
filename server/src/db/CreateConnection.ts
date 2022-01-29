import { Connection, createConnection } from 'typeorm';

export async function initializeConnection(): Promise<Connection> {
  return createConnection({
    name: 'default',
    type: 'sqlite',
    database: 'test.sqlite',
    entities: [],
    synchronize: true,
    logging: true,
  });
}
