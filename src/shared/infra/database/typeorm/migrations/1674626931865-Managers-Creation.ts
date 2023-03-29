import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ---------------------------------------------------------------------- * //

export class ManagersCreation1674626931865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .query('create table managers (password varchar) inherits (users)');
  }

  // ------------------------------------------------------------------------ //

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('managers');
  }
}
