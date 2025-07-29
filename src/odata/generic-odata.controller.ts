// src/shared/generic-odata.controller.ts
import { ODataController, odata, Edm } from 'odata-v4-server';
import { convertToPrismaQuery } from '@odata/odata.query';
import {
  GenericODataService,
  PrismaModelName,
} from './services/generic-odata.service';

export function createODataController(
  entity: any,
  modelName: PrismaModelName,
  service: GenericODataService,
) {
  const esName = `${modelName.charAt(0).toUpperCase()}${modelName.slice(1)}s`;

  const ControllerClass = class extends ODataController {
    async get(query: any) {
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
          case 'Count':
            rawQuery.$count = option.raw.replace(/^\$count=/, '');
            break;
          case 'Expand':
            rawQuery.$expand = option.raw.replace(/^\$expand=/, '');
            break;
        }
      }

      const { onlyCount, ...prismaQuery } = convertToPrismaQuery(rawQuery);

      if (onlyCount) {
        const count = await service.count(modelName, prismaQuery.where);
        return { count };
      }

      return service.findAll(modelName, prismaQuery);
    }

    async count(query: any) {
      const rawQuery: any = {};
      const options = query?.value?.options || [];

      for (const option of options) {
        if (option.type === 'Filter') {
          rawQuery.$filter = option.raw.replace(/^\$filter=/, '');
        }
      }

      const { where } = convertToPrismaQuery(rawQuery);
      const count = await service.count(modelName, where);
      return count;
    }

    async getOne(key: number) {
      return service.findOne(modelName, key);
    }

    async insert(data: any) {
      return service.create(modelName, data);
    }

    async update(key: number, data: any) {
      return service.update(modelName, key, data);
    }

    async replace(key: number, data: any) {
      delete data.id;
      return service.update(modelName, key, data);
    }

    async delete(key: number) {
      return service.delete(modelName, key);
    }
  };

  Object.defineProperty(ControllerClass, 'name', {
    value: `${esName}Controller`,
  });

  odata.type(entity)(ControllerClass);
  Edm.EntitySet(esName)(ControllerClass);

  odata.GET()(ControllerClass.prototype, 'get');
  odata.GET()(ControllerClass.prototype, 'count');
  odata.GET()(ControllerClass.prototype, 'getOne');
  odata.POST()(ControllerClass.prototype, 'insert');
  odata.PATCH()(ControllerClass.prototype, 'update');
  odata.PUT()(ControllerClass.prototype, 'replace');
  odata.DELETE()(ControllerClass.prototype, 'delete');

  odata.key()(ControllerClass.prototype, 'getOne', 0);
  odata.key()(ControllerClass.prototype, 'update', 0);
  odata.key()(ControllerClass.prototype, 'replace', 0);
  odata.key()(ControllerClass.prototype, 'delete', 0);

  odata.body(ControllerClass.prototype, 'insert', 0);
  odata.body(ControllerClass.prototype, 'update', 1);
  odata.body(ControllerClass.prototype, 'replace', 1);

  odata.query(ControllerClass.prototype, 'get', 0);
  odata.query(ControllerClass.prototype, 'count', 0);

  return ControllerClass;
}
