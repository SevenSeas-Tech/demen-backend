import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ------------------------------------------------------------------------------------------ * //

export class InstitutionsCreation1674629760403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const institutions = new Table({
      name: 'institutions',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'website',
          type: 'varchar',
          isNullable: true
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

    await queryRunner.createTable(institutions);
  }

  // -------------------------------------------------------------------------------------------- //

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('institutions');
  }
}
