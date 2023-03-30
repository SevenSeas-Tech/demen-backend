import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ---------------------------------------------------------------------- * //

export class IssueTypesCreation1674628399201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const issueTypes = new Table({
      name: 'issue_types',
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

    await queryRunner.createTable(issueTypes);
  }

  // ------------------------------------------------------------------------ //

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('issue_types');
  }
}
