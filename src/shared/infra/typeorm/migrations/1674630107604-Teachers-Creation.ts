import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ------------------------------------------------------------------------------------------ * //

export class TeachersCreation1674630107604 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const teachers = new Table({
      name: 'teachers',
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
          name: 'last_name',
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

    await queryRunner.createTable(teachers);
  }

  // -------------------------------------------------------------------------------------------- //

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teachers');
  }
}
