import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStaffUser1637684783026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' },
          { name: 'username', type: 'varchar', isUnique: true },
          { name: 'name', type: 'varchar' },
          { name: 'last_name', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'phone', type: 'varchar' },
          // { name: 'admin', type: 'boolean', default: false },
          { name: 'verified', type: 'boolean', default: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' }
        ]
      })
    );
    // await queryRunner.query('create table staff_members (password varchar) inherits (users)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
  }
}