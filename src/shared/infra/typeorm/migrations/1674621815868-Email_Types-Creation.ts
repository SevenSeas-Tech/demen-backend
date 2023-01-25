import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ------------------------------------------------------------------------------------------ * //

export class EmailTypesCreation1674621815868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const emailTypes = new Table({
      name: 'email_types',
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

    await queryRunner.createTable(emailTypes);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('email_types');
  }
}
