import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ------------------------------------------------------------------------------------------ * //

export class SubjectsCreation1674629056168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const subjects = new Table({
      name: 'subjects',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'description',
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

    await queryRunner.createTable(subjects);
  }

  // -------------------------------------------------------------------------------------------- //

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subjects');
  }
}
