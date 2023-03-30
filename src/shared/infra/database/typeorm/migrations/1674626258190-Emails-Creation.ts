import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ---------------------------------------------------------------------- * //

export class EmailsCreation1674626258190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const emails = new Table({
      name: 'emails',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()'
        },
        {
          name: 'user_id',
          type: 'uuid'
        },
        {
          name: 'type_id',
          type: 'uuid'
        },
        {
          name: 'verified',
          type: 'boolean',
          default: false
        },
        {
          name: 'email',
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
      ],
      foreignKeys: [
        {
          name: 'FK_email_user',
          referencedTableName: 'users',
          referencedColumnNames: [ 'id' ],
          columnNames: [ 'user_id' ],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        {
          name: 'FK_email_type',
          referencedTableName: 'email_types',
          referencedColumnNames: [ 'id' ],
          columnNames: [ 'type_id' ],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    });

    await queryRunner.createTable(emails);
  }

  // ------------------------------------------------------------------------ //

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('emails');
  }
}
