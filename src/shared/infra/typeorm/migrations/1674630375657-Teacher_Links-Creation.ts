import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ------------------------------------------------------------------------------------------ * //

export class TeacherLinksCreation1674630375657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const teacherLinks = new Table({
      name: 'teacher_links',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()'
        },
        {
          name: 'teacher_id',
          type: 'uuid'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'link',
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
          name: 'FK_link_teacher',
          referencedTableName: 'teachers',
          referencedColumnNames: ['id'],
          columnNames: ['teacher_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    });

    await queryRunner.createTable(teacherLinks);
  }

  // -------------------------------------------------------------------------------------------- //

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teacher_links');
  }
}
