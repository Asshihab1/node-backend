// src/entities/product.entity.ts
import { Edm } from 'odata-v4-server';

// src/entities/product.entity.ts

export class Product {
  @Edm.Key
  @Edm.Int32
  id!: number;

  @Edm.String
  name!: string;

  @Edm.String
  description?:  string | null;

  @Edm.Double 
  price!: number;

  @Edm.DateTimeOffset
  createdAt!: Date;

  @Edm.DateTimeOffset
  updatedAt!: Date;
}

