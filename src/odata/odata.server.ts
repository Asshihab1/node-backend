// src/odata/odata-server.ts
import { ODataServer, odata } from 'odata-v4-server';
import { ProductsController } from './product.controller';

@odata.controller(ProductsController, true)
export class MyODataServer extends ODataServer {
    Products(): void{}
}
