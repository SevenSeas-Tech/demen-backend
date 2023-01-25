import { Table } from 'typeorm';

import type { MigrationInterface, QueryRunner } from 'typeorm';

// * ------------------------------------------------------------------------------------------ * //

export class VideosCreation1674631642657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const videos = new Table({
      name: 'videos',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true
        },
        {
          name: 'channel_id',
          type: 'varchar'
        },
        {
          name: 'added_by',
          type: 'uuid'
        },
        {
          name: 'institution_id',
          type: 'uuid',
          isNullable: true,
          default: null
        },
        {
          name: 'teacher_id',
          type: 'uuid',
          isNullable: true,
          default: null
        },
        {
          name: 'subject_id',
          type: 'uuid'
        },
        {
          name: 'title',
          type: 'varchar'
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'thumbnail',
          type: 'varchar'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: false
        },
        {
          name: 'published_at',
          type: 'timestamp',
          isNullable: true
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
          name: 'FK_video_teacher',
          referencedTableName: 'teachers',
          referencedColumnNames: ['id'],
          columnNames: ['teacher_id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        {
          name: 'FK_video_institution',
          referencedTableName: 'institutions',
          referencedColumnNames: ['id'],
          columnNames: ['institution_id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        {
          name: 'FK_video_user',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['added_by'],
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        {
          name: 'FK_video_channel',
          referencedTableName: 'channels',
          referencedColumnNames: ['id'],
          columnNames: ['channel_id'],
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        {
          name: 'FK_video_subject',
          referencedTableName: 'subjects',
          referencedColumnNames: ['id'],
          columnNames: ['subject_id'],
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        }
      ]
    });

    await queryRunner.createTable(videos);
  }

  // ------------------------------------------------------------------------------------------ //

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('videos');
  }
}
