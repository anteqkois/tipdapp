import { address } from '@tipdapp/contracts';

export type AvaibleChains = Capitalize<keyof typeof address>;
