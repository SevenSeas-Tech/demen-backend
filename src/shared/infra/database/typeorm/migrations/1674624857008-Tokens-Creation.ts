import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ---------------------------------------------------------------------- * //

export class TokensCreation1674624857008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tokens = new Table({
      name: 'tokens',
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
          name: 'expired',
          type: 'boolean',
          default: false
        },
        {
          name: 'valid_until',
          type: 'timestamp'
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
          name: 'FK_token_user',
          referencedTableName: 'users',
          referencedColumnNames: [ 'id' ],
          columnNames: [ 'user_id' ],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        {
          name: 'FK_token_type',
          referencedTableName: 'token_types',
          referencedColumnNames: [ 'id' ],
          columnNames: [ 'type_id' ],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    });

    await queryRunner.createTable(tokens);
  }

  // ------------------------------------------------------------------------ //

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}
