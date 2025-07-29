// src/odata/odata-server.ts
import { ODataServer, odata } from 'odata-v4-server';
import { createODataController } from '@odata/generic-odata.controller';
import { GenericODataService } from '@odata/services/generic-odata.service';
import { PrismaService } from '@prisma/prisma.service';
import { Product } from '@models/product/Product';
import { Order } from '@models/product/Order';

const prismaService = new PrismaService();
const service = new GenericODataService(prismaService);

// =========== Create OData Controllers ============
const ProductController = createODataController(Product, 'product', service);
const OrderController = createODataController(Order, 'order', service);
// const TodoController = createODataController(Todo, 'todo', service);

// ============ Register OData Controllers ============
@odata.controller(ProductController, true)
@odata.controller(OrderController, true)
export class MyODataServer extends ODataServer {}
