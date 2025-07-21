// src/models/Product.ts
import { Edm } from 'odata-v4-server';
import { Order } from './Order';

export class Product {
  @Edm.Key
  @Edm.Int32
  id!: number;

  @Edm.String
  name!: string;

  @Edm.String
  description?: string | null;

  @Edm.Double 
  price!: number;

  @Edm.DateTimeOffset
  createdAt!: Date;

  @Edm.DateTimeOffset
  updatedAt!: Date;

  @Edm.Collection(Edm.EntityType(Order))
  orders?: Order[];  // <- this must exist and be decorated properly
}

