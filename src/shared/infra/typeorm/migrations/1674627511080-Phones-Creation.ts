import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ------------------------------------------------------------------------------------------ * //

export class PhonesCreation1674627511080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const phones = new Table({
      name: 'phones',
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
          name: 'international_code',
          type: 'varchar'
        },
        {
          name: 'region_code',
          type: 'varchar'
        },
        {
          name: 'phone',
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
          name: 'FK_phone_user',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    });

    await queryRunner.createTable(phones);
  }

  // -------------------------------------------------------------------------------------------- //

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('phones');
  }
}
