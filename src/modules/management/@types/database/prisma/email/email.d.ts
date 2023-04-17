import type { Prisma } from '@prisma/client';

// * ---------------------------------------------------------------------- * //

export type EmailCreateInput = Prisma.EmailCreateInput;

export type EmailDelegate = Prisma.EmailDelegate<undefined>;

export type EmailInclude = Prisma.EmailInclude;

export type EmailNestedInput = Prisma.EmailCreateNestedManyWithoutUserInput;

export type EmailTypeNestedInput = Prisma.EmailTypeCreateNestedOneWithoutEmailsInput;

export type EmailUpdateInput = Prisma.EmailUpdateInput;

export type EmailWhereInput = Prisma.EmailWhereInput;

export type EmailWhereUniqueInput = Prisma.EmailWhereUniqueInput;
