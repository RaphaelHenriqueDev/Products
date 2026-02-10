import { Product } from 'src/products/entities/product.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [Product],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
