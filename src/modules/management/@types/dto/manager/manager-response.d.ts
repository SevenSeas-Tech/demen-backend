import type { Manager } from '@management:models/manager';

// * ---------------------------------------------------------------------- * //

type ManagerResponseData = Omit<Manager, 'password'>

// * ---------------------------------------------------------------------- * //

export type { ManagerResponseData };
