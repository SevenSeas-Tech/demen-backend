import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStaffMembers1637684783026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create table staff_members (password varchar) inherits (users)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('staff_members');
  }
}
