import { Edm } from 'odata-v4-server';

export class Product {
  @Edm.Key
  @Edm.Int32
  id: number;

  @Edm.String
  name: string;

  @Edm.Double
  price: number;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  updatedAt: Date;

  @Edm.String
  description?: string;

  @Edm.String
  category?: string;
}