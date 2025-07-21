// src/odata/odata-server.ts
import { ODataServer, odata } from 'odata-v4-server';
import { createODataController } from './generic-odata.controller';
import { Product } from 'src/models/Product';
import { Order } from 'src/models/Order';
import { GenericODataService } from 'src/odata/services/generic-odata.service';
import { PrismaService } from 'src/prisma/prisma.service';

const prismaService = new PrismaService();
const service = new GenericODataService(prismaService);

// Create unique controller classes for each model
const ProductController = createODataController(Product, 'product', service);
const OrderController = createODataController(Order, 'order', service);

// Register both controllers
@odata.controller(ProductController, true)
@odata.controller(OrderController, true)
export class MyODataServer extends ODataServer {}
