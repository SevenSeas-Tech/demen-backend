import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStudents1637263430986 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create table students (username varchar) inherits (users)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('students');
  }
}
