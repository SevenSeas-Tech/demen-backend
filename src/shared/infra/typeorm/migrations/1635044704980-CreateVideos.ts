import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVideos1635044704980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'videos',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'channel_id', type: 'varchar' },
          { name: 'subject_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'description', type: 'varchar' },
          { name: 'disabled', type: 'boolean' },
          { name: 'institution', type: 'varchar', isNullable: true },
          { name: 'published_at', type: 'timestamp' },
          { name: 'teacher', type: 'varchar', isNullable: true },
          { name: 'title', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' }
        ],
        foreignKeys: [
          {
            name: 'FK_video_channel',
            referencedTableName: 'channels',
            referencedColumnNames: ['id'],
            columnNames: ['channel_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FK_video_subject',
            referencedTableName: 'subjects',
            referencedColumnNames: ['id'],
            columnNames: ['subject_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
          },
          {
            name: 'FK_video_user',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('videos');
  }
}
