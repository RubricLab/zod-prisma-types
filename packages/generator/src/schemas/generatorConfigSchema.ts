import { PrismaVersionSchema } from '../utils';
import { z } from 'zod';

////////////////////////////////////////////////
// UTILS
/////////////////////////////////////////////////

// Helper to convert optional string ("true" | "false") to boolean with a default value
const boolFromString = (defaultValue: boolean) =>
  z
    .string()
    .optional()
    .transform((val) => val === 'true')
    .default(defaultValue);

////////////////////////////////////////////////
// SCHEMA
/////////////////////////////////////////////////

export const configSchema = z.object({
  useMultipleFiles: boolFromString(false),
  writeBarrelFiles: boolFromString(true),
  createInputTypes: boolFromString(true),
  createModelTypes: boolFromString(true),
  createOptionalDefaultValuesTypes: boolFromString(false),
  createRelationValuesTypes: boolFromString(false),
  createPartialTypes: boolFromString(false),
  addInputTypeValidation: boolFromString(true),
  addIncludeType: boolFromString(true),
  addSelectType: boolFromString(true),
  validateWhereUniqueInput: boolFromString(true),
  useDefaultValidators: boolFromString(true),
  coerceDate: boolFromString(true),
  writeNullishInModelTypes: boolFromString(false),
  /**
   * @deprecated This option is deprecated. Zod implemented a fix for this issue.
   */
  useTypeAssertions: boolFromString(false),
  prismaClientPath: z.string().default('@prisma/client'),
  provider: z.string().optional(),
  isMongoDb: boolFromString(false),
  inputTypePath: z.string().optional().default('inputTypeSchemas'), // currently only used internally
  outputTypePath: z.string().optional().default('outputTypeSchemas'), // currently only used internally
  prismaVersion: PrismaVersionSchema.optional(),
  decimalJSInstalled: z.boolean().default(false),
});

export type GeneratorConfig = z.infer<typeof configSchema>;
