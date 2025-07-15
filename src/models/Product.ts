// src/entities/product.entity.ts
import { Edm } from 'odata-v4-server';

export class Product {
  @Edm.Key
  @Edm.Int32
  id: number;

  @Edm.String
  name: string;

  @Edm.Decimal
  price: number;
}
