import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChannels1635042809052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'channels',
        columns: [
          { name: 'id', type: 'varchar', isPrimary: true },
          { name: 'title', type: 'varchar' },
          { name: 'description', type: 'varchar' },
          { name: 'thumbnail', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('channels');
  }
}
