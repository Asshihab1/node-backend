import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);

if (args.length < 3 || args[0] !== 'new' || args[1] !== 'module') {
  console.error('Usage: hybri new module <ModuleName>');
  process.exit(1);
}

const moduleName = args[2];
const basePath = path.join(__dirname, '..', 'src', 'module', moduleName);

fs.mkdirSync(basePath, { recursive: true });

const controllerContent = `export class ${moduleName}Controller {
  // Controller methods here
}\n`;

const serviceContent = `export class ${moduleName}Service {
  // Service methods here
}\n`;

const moduleContent = `import { Module } from '@nestjs/common';
import { ${moduleName}Controller } from './${moduleName}.controller';
import { ${moduleName}Service } from './${moduleName}.service';

@Module({
  controllers: [${moduleName}Controller],
  providers: [${moduleName}Service],
})
export class ${moduleName}Module {}\n`;

// Write files
fs.writeFileSync(
  path.join(basePath, `${moduleName}.controller.ts`),
  controllerContent,
);
fs.writeFileSync(
  path.join(basePath, `${moduleName}.service.ts`),
  serviceContent,
);
fs.writeFileSync(path.join(basePath, `${moduleName}.module.ts`), moduleContent);

console.log(`Module ${moduleName} created successfully at ${basePath}`);
