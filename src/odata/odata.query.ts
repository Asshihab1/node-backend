import { filter as parseFilter } from 'odata-v4-parser';

export function convertToPrismaQuery(query: any): any {
  const prismaQuery: any = {};

  if (query?.$filter) {
    const ast = parseFilter(query.$filter);
    prismaQuery.where = mapFilterToPrisma(ast);
  }

  if (query?.$top) prismaQuery.take = parseInt(query.$top, 10);
  if (query?.$skip) prismaQuery.skip = parseInt(query.$skip, 10);

  if (query?.$orderby) {
    prismaQuery.orderBy = query.$orderby.split(',').map((part: string) => {
      const [field, dir] = part.trim().split(' ');
      return { [field]: dir?.toLowerCase() === 'desc' ? 'desc' : 'asc' };
    });
  }

  if (query?.$expand) {
    prismaQuery.include = mapExpandToInclude(query.$expand);
  }

  return prismaQuery;
}

function mapExpandToInclude(expand: string): any {
  const includes: any = {};
  expand.split(',').forEach((relation) => {
    includes[relation.trim()] = true;
  });
  return includes;
}

// Recursive function to convert OData AST filter to Prisma filter
function mapFilterToPrisma(ast: any): any {
  if (!ast) return {};

  switch (ast.type) {
    case 'EqualsExpression':
      return {
        [getField(ast.value.left)]: getLiteral(ast.value.right),
      };

    case 'NotEqualsExpression':
      return {
        NOT: {
          [getField(ast.value.left)]: getLiteral(ast.value.right),
        },
      };

    case 'GreaterThanExpression':
      return {
        [getField(ast.value.left)]: { gt: getLiteral(ast.value.right) },
      };

    case 'GreaterOrEqualsExpression':
      return {
        [getField(ast.value.left)]: { gte: getLiteral(ast.value.right) },
      };

    case 'LessThanExpression':
      return {
        [getField(ast.value.left)]: { lt: getLiteral(ast.value.right) },
      };

    case 'LessOrEqualsExpression':
      return {
        [getField(ast.value.left)]: { lte: getLiteral(ast.value.right) },
      };

    case 'AndExpression':
      return {
        AND: [
          mapFilterToPrisma(ast.value.left),
          mapFilterToPrisma(ast.value.right),
        ],
      };

    case 'OrExpression':
      return {
        OR: [
          mapFilterToPrisma(ast.value.left),
          mapFilterToPrisma(ast.value.right),
        ],
      };

    default:
      throw new Error(`Unsupported filter type: ${ast.type}`);
  }
}

// Extract the property name from the AST node
function getField(node: any): string {
  // The field might be deeply nested; drill down to get the 'name'
  while (node && node.value) {
    node = node.value;
  }
  if (!node || !node.name) {
    throw new Error(
      `Cannot extract field name from node: ${JSON.stringify(node)}`,
    );
  }
  return node.name;
}

// Extract the literal value from the AST node
function getLiteral(node: any): any {
  const raw = node?.raw ?? node?.value ?? null;
  if (!isNaN(raw)) return Number(raw);
  return raw;
}
