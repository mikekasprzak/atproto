import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('ap_activity')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('type', 'varchar(32)', (col) => col.notNull())
    .addColumn('attributedTo', 'varchar(1024)', (col) => col.notNull())
    .addColumn('subject', 'varchar(1024)', (col) => col.notNull())
    .addColumn('createdAt', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('updatedAt', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute()

  await db.schema
    .createTable('ap_activity_kv')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('activityId', 'bigint', (col) => col.notNull())
    .addColumn('key', 'varchar(32)', (col) => col.notNull())
    .addColumn('value', 'varchar', (col) => col.notNull())
    .addColumn('updatedAt', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute()

  await db.schema
    .createIndex('ap_activity_attributedTo_idx')
    .on('ap_activity')
    .column('attributedTo')
    .execute()

  await db.schema
    .createIndex('ap_activity_subject_idx')
    .on('ap_activity')
    .column('subject')
    .execute()

  await db.schema
    .createIndex('ap_activity_kv_activityId_key_idx')
    .on('ap_activity_kv')
    .columns(['activityId', 'key'])
    .execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex('ap_activity_kv_activityId_key_idx').execute()
  await db.schema.dropIndex('ap_activity_subject_idx').execute()
  await db.schema.dropIndex('ap_activity_attributedTo_idx').execute()
  await db.schema.dropTable('ap_activity_kv').execute()
  await db.schema.dropTable('ap_activity').execute()
}
