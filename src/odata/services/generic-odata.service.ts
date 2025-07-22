import { Injectable } from '@nestjs/common';
import { PrismaService } from "@prisma/prisma.service"
export type ModelDelegateKeys<T> = {
  [K in keyof T]: T[K] extends { findMany: (...args: any[]) => any }
    ? K
    : never;
}[keyof T];

export type PrismaModelName = Extract<ModelDelegateKeys<PrismaService>, string>;

@Injectable()
export class GenericODataService {
  constructor(private readonly prisma: PrismaService) {}

  private getModel(modelName: PrismaModelName): {
    findMany: (...args: any[]) => any;
    findUnique: (...args: any[]) => any;
    create: (...args: any[]) => any;
    update: (...args: any[]) => any;
    delete: (...args: any[]) => any;
    count: (...args: any[]) => any;
  } {
    const model = this.prisma[modelName as keyof PrismaService] as any;

    if (!model || typeof model.findMany !== 'function') {
      throw new Error(`Model '${modelName}' is not a valid Prisma model`);
    }

    return model;
  }

  findAll(modelName: PrismaModelName, query: any) {
    return this.getModel(modelName).findMany(query);
  }

  findOne(modelName: PrismaModelName, id: number) {
    return this.getModel(modelName).findUnique({ where: { id } });
  }

  create(modelName: PrismaModelName, data: any) {
    return this.getModel(modelName).create({ data });
  }

  update(modelName: PrismaModelName, id: number, data: any) {
    return this.getModel(modelName).update({ where: { id }, data });
  }

  delete(modelName: PrismaModelName, id: number) {
    return this.getModel(modelName).delete({ where: { id } });
  }

  count(modelName: PrismaModelName, where: any) {
    return this.getModel(modelName).count({ where });
  }
}
