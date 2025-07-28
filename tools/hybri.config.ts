import * as fs from 'fs';
import * as path from 'path';
const { execSync } = require('child_process');

let args: string[] = [];
const rawArgs = process.argv.slice(2);
if (rawArgs.length === 1) {
  args = rawArgs[0].split(' ');
} else {
  args = rawArgs;
}

// === Create Module ===
if (args.length === 3 && args[0] === 'new' && args[1] === 'module') {
  const rawName = args[2];

  const moduleName = rawName
    .split(/[\s\-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const kebabName = moduleName.toLowerCase();

  const basePath = path.join(__dirname, '..', 'src', 'module', kebabName);
  fs.mkdirSync(basePath, { recursive: true });
  fs.mkdirSync(path.join(basePath, 'database'), { recursive: true });
  fs.writeFileSync(
    path.join(basePath, 'database', `${kebabName}.prisma`),
    `// ${moduleName} Database initialization code here\n`,
    'utf-8',
  );

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
import { ${moduleName}Controller } from '@module/${kebabName}/${kebabName}.controller';
import { ${moduleName}Service } from '@module/${kebabName}/${kebabName}.service';

@Module({
  controllers: [${moduleName}Controller],
  providers: [${moduleName}Service],
})
export class ${moduleName}Module {}
`;

  const routeContent = `import { Routes } from '@nestjs/core';
import { ${moduleName}Module } from '@module/${kebabName}/${kebabName}.module';

export const ${moduleName}Routes: Routes = [
  {
    path: '${kebabName}',
    module: ${moduleName}Module,
  },
];
`;

  fs.writeFileSync(
    path.join(basePath, `${kebabName}.controller.ts`),
    controllerContent,
    'utf-8',
  );
  fs.writeFileSync(
    path.join(basePath, `${kebabName}.service.ts`),
    serviceContent,
    'utf-8',
  );
  fs.writeFileSync(
    path.join(basePath, `${kebabName}.module.ts`),
    moduleContent,
    'utf-8',
  );
  fs.writeFileSync(path.join(basePath, `route.ts`), routeContent, 'utf-8');

  // === Update api.router.ts ===
  const routerFile = path.join(
    __dirname,
    '..',
    'src',
    'routers',
    'api.router.ts',
  );
  const importLine = `import { ${moduleName}Routes } from '@module/${kebabName}/route';\n`;
  const spreadLine = `  ...${moduleName}Routes,`;

  let routerSource = fs.readFileSync(routerFile, 'utf-8');
  if (!routerSource.includes(importLine)) {
    routerSource = importLine + routerSource;
  }
  routerSource = routerSource.replace(
    /export const apiRoutes: Routes = \[/,
    `export const apiRoutes: Routes = [\n${spreadLine}`,
  );
  fs.writeFileSync(routerFile, routerSource, 'utf-8');

  // === Update app.module.ts ===
  const appModulePath = path.join(__dirname, '..', 'src', 'app.module.ts');
  let appModuleContent = fs.readFileSync(appModulePath, 'utf-8');

  const appImportLine = `import { ${moduleName}Module } from '@module/${kebabName}/${kebabName}.module';\n`;
  if (!appModuleContent.includes(appImportLine)) {
    appModuleContent = appImportLine + appModuleContent;
  }
  appModuleContent = appModuleContent.replace(
    /imports: \[/,
    `imports: [\n    ${moduleName}Module,`,
  );
  fs.writeFileSync(appModulePath, appModuleContent, 'utf-8');

  console.log(`Module "${moduleName}" created and registered successfully!`);
}

// === Merge DB ===
else if (args.length === 3 && args[0] === 'merge' && args[1] === 'db') {
  const moduleName = args[2];
  const modulePath = path.join(
    __dirname,
    '..',
    'src',
    'module',
    moduleName,
    'database',
    `${moduleName}.prisma`,
  );
  const outputPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

  if (!fs.existsSync(modulePath)) {
    console.error(` Module Prisma file not found: ${modulePath}`);
    process.exit(1);
  }

  const HEADER = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}`;

  let existing = fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, 'utf8')
    : HEADER;
  const moduleContent = fs.readFileSync(modulePath, 'utf8').trim();
  const namesToReplace = new Set<string>();

  const declarationRegex = /(model|enum|view)\s+(\w+)\s*\{[^}]*\}/g;
  let blockMatch;
  while ((blockMatch = declarationRegex.exec(moduleContent)) !== null) {
    const [, , name] = blockMatch;
    namesToReplace.add(name);
  }
  const mapRegex = /@@map\("([^"]+)"\)/g;
  let mapMatch;
  while ((mapMatch = mapRegex.exec(moduleContent)) !== null) {
    namesToReplace.add(mapMatch[1]);
  }

  const blockStripRegex = new RegExp(
    `(\\n+)?(model|enum|view)\\s+(\\w+)\\s*\\{[\\s\\S]+?\\n\\}(?=\\n|$)`,
    'g',
  );

  existing = existing.replace(blockStripRegex, (block) => {
    const nameMatch = /(model|enum|view)\s+(\w+)/.exec(block);
    const modelName = nameMatch?.[2];
    const mapMatch = /@@map\("([^"]+)"\)/.exec(block);
    const mappedName = mapMatch?.[1];

    if (
      namesToReplace.has(modelName!) ||
      (mappedName && namesToReplace.has(mappedName))
    ) {
      console.log(`🧹 Replacing existing model/view/enum: ${modelName}`);
      return '';
    }
    return block;
  });

  // Remove previous // 🌍 Module: ...
  const moduleCommentRegex = new RegExp(
    `\\n*// 🌍 Module: ${moduleName}[\\s\\S]*?(?=\\n// 🌍 Module:|\\s*$)`,
    'gm',
  );
  existing = existing.replace(moduleCommentRegex, '').trim();

  // Append new block
  const newSchema = `${existing.trim()}\n\n// 🌍 Module: ${moduleName}\n${moduleContent}\n`;

  fs.writeFileSync(outputPath, newSchema);
  console.log(` Merged module: ${moduleName} into schema.prisma`);

  try {
    execSync('npx prisma format', { stdio: 'inherit' });
    execSync('npx prisma validate', { stdio: 'inherit' });
    console.log('Schema formatted and validated!');
  } catch (err) {
    console.error(' Format or validate failed');
    process.exit(1);
  }
}

// === Invalid command ===
else {
  console.error(' Invalid command.\nUsage:');
  console.error('  npm run hybri new module <ModuleName>');
  console.error('  npm run hybri merge db <AppName>');
  process.exit(1);
}
