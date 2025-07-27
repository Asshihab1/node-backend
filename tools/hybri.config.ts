// scripts/create-module.ts
import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);

if (args.length < 3 || args[0] !== 'new' || args[1] !== 'module') {
  console.error('Usage: hybri new module <ModuleName>');
  process.exit(1);
}

const rawName = args[2];


const moduleName = rawName
  .split(/[\s\-]+/)
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

const basePath = path.join(__dirname, '..', 'src', 'module', moduleName.toLowerCase());
fs.mkdirSync(basePath, { recursive: true });

const controllerContent = `import { Controller, Get } from '@nestjs/common';

@Controller()
export class ${moduleName}Controller {
  @Get()
  getHello() {
    return { message: '${moduleName} works' };
  }
}
`;

const serviceContent = `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${moduleName}Service {
  // Service methods here
}
`;

const moduleContent = `import { Module } from '@nestjs/common';
import { ${moduleName}Controller } from '@module/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.controller';
import { ${moduleName}Service } from '@module/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.service';

@Module({
  controllers: [${moduleName}Controller],
  providers: [${moduleName}Service],
})
export class ${moduleName}Module {}
`;

const routeContent = `import { Routes } from '@nestjs/core';
import { ${moduleName}Module } from '@module/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.module';

export const ${moduleName}Routes: Routes = [
  {
    path: '${moduleName.toLowerCase()}',
    module: ${moduleName}Module,
  },
];
`;

fs.writeFileSync(path.join(basePath, `${moduleName.toLowerCase()}.controller.ts`), controllerContent);
fs.writeFileSync(path.join(basePath, `${moduleName.toLowerCase()}.service.ts`), serviceContent);
fs.writeFileSync(path.join(basePath, `${moduleName.toLowerCase()}.module.ts`), moduleContent);
fs.writeFileSync(path.join(basePath, `route.ts`), routeContent);

// === Update api.router.ts ===
const routerFile = path.join(__dirname, '..', 'src', 'routers', 'api.router.ts');
const importLine = `import { ${moduleName}Routes } from '@module/${moduleName.toLowerCase()}/route';\n`;
const spreadLine = `  ...${moduleName}Routes,`;

let routerSource = fs.readFileSync(routerFile, 'utf-8');
if (!routerSource.includes(importLine)) {
  routerSource = importLine + routerSource;
}
routerSource = routerSource.replace(
  /export const apiRoutes: Routes = \[/,
  `export const apiRoutes: Routes = [\n${spreadLine}`
);
fs.writeFileSync(routerFile, routerSource);

// === Update app.module.ts ===
const appModulePath = path.join(__dirname, '..', 'src', 'app.module.ts');
let appModuleContent = fs.readFileSync(appModulePath, 'utf-8');

const appImportLine = `import { ${moduleName}Module } from '@module/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.module';\n`;
if (!appModuleContent.includes(appImportLine)) {
  appModuleContent = appImportLine + appModuleContent;
}
appModuleContent = appModuleContent.replace(
  /imports: \[/,
  `imports: [\n    ${moduleName}Module,`
);
fs.writeFileSync(appModulePath, appModuleContent);

console.log(`Module "${moduleName}" created and registered successfully!`);
