// src/models/Order.ts
import { Edm } from 'odata-v4-server';
import { Product } from '@model/Product';

export class Order {
  @Edm.Key
  @Edm.Int32
  id: number;

  @Edm.Int32
  productId: number;

  @Edm.Int32
  quantity: number;

  @Edm.Double
  totalPrice: number;

  @Edm.DateTimeOffset
  createdAt: Date;

  @Edm.DateTimeOffset
  updatedAt: Date;

  @Edm.EntityType(Product)
  product?: Product;
}
