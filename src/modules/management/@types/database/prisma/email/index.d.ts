import type { Prisma } from '@prisma/client';

// * ---------------------------------------------------------------------- * //

export type EmailDelegate = Prisma.EmailDelegate<undefined>;

export type EmailNestedInput = Prisma.EmailCreateNestedManyWithoutUserInput;

export type EmailTypeNestedInput = Prisma.EmailTypeCreateNestedOneWithoutEmailsInput;

export type EmailUpdateInput = Prisma.EmailUpdateInput;

export type EmailWhereInput = Prisma.EmailWhereInput;

export type EmailWhereUniqueInput = Prisma.EmailWhereUniqueInput;
