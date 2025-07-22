// src/odata/odata-server.ts
import { ODataServer, odata } from 'odata-v4-server';
import { createODataController } from './generic-odata.controller';
import { Product } from '@model/Product';
import { Order } from '@model/Order';
import { GenericODataService } from './services/generic-odata.service';
import { PrismaService } from '@prisma/prisma.service';

const prismaService = new PrismaService();
const service = new GenericODataService(prismaService);

// Create unique controller classes for each model
const ProductController = createODataController(Product, 'product', service);
const OrderController = createODataController(Order, 'order', service);

// Register both controllers
@odata.controller(ProductController, true)
@odata.controller(OrderController, true)
export class MyODataServer extends ODataServer {}
