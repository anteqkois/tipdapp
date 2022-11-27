import { ZodTypeAny } from 'zod';
import { ZodParseErrors } from '../types';
export * from 'zod';
export declare const validationHelper: <D>(data: D, validation: ZodTypeAny) => ZodParseErrors;
