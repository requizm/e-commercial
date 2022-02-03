import { Connection, createConnection } from 'typeorm';
import { Category } from './entity/Category';
import { Product } from './entity/Product';
import { User } from './entity/User';

export async function initializeConnection(): Promise<Connection> {
  return createConnection({
    name: 'default',
    type: 'sqlite',
    database: 'test.sqlite',
    entities: [User, Category, Product],
    synchronize: true,
    logging: true,
  });
}
