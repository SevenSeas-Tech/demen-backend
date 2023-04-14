import type { Prisma } from '@prisma/client';

// * ---------------------------------------------------------------------- * //

export type EmailNestedInput = Prisma.EmailCreateNestedManyWithoutUserInput;

export type EmailTypeNestedInput = Prisma.EmailTypeCreateNestedOneWithoutEmailsInput;
