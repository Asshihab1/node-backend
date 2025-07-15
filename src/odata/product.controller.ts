import { ODataController, Edm, odata } from 'odata-v4-server';
import { Product } from 'src/models/Product';
import { PrismaService } from 'src/prisma/prisma.service';
import { convertToPrismaQuery } from './odata.query';

const prisma = new PrismaService();

@odata.type(Product)
@Edm.EntitySet('Products')
export class ProductsController extends ODataController {
  @odata.GET
  async get(@odata.query query: any): Promise<Product[]> {
    console.log('Received OData query:', query);
      const rawQuery: any = {};

    const options = query?.value?.options || [];
    for (const option of options) {
      switch (option.type) {
        case 'Filter':
          rawQuery.$filter = option.raw.replace(/^\$filter=/, '');
          break;
        case 'Top':
          rawQuery.$top = option.raw.replace(/^\$top=/, '');
          break;
        case 'Skip':
          rawQuery.$skip = option.raw.replace(/^\$skip=/, '');
          break;
        case 'OrderBy':
          rawQuery.$orderby = option.raw.replace(/^\$orderby=/, '');
          break;
        case 'Expand':
          rawQuery.$expand = option.raw.replace(/^\$expand=/, '');
          break;
      }
    }

    // const prismaQuery = convertToPrismaQuery(rawQuery);


//    console.log(typeof prismaQuery.where.price , prismaQuery ,'data')
    return prisma.product.findMany(!query ? {} : convertToPrismaQuery(rawQuery));
  }

  // ============= CRUD Operations =============
  @odata.GET
  async getOne(@odata.key key: number): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id: key } });
  }

  @odata.POST
  async insert(@odata.body data: Product): Promise<Product> {
    return prisma.product.create({ data });
  }

  @odata.PATCH
  async update(
    @odata.key key: number,
    @odata.body data: Partial<Product>,
  ): Promise<Product> {
    return prisma.product.update({ where: { id: key }, data });
  }

  @odata.PUT
  async replace(
    @odata.key key: number,
    @odata.body data: Product,
  ): Promise<Product> {
    // Ensure the 'id' is not being changed
    delete (data as any).id;

    return prisma.product.update({
      where: { id: key },
      data,
    });
  }

  @odata.DELETE
  async delete(@odata.key key: number): Promise<Product> {
    return prisma.product.delete({ where: { id: key } });
  }
}
