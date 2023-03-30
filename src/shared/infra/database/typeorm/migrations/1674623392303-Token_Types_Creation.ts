import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ---------------------------------------------------------------------- * //

export class TokenTypesCreation1674623392303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tokenTypes = new Table({
      name: 'token_types',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()'
        },
        {
          name: 'type',
          type: 'varchar'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    });

    await queryRunner.createTable(tokenTypes);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('token_types');
  }
}
