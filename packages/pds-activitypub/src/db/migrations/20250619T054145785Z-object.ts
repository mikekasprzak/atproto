import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('ap_object')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('type', 'varchar(32)', (col) => col.notNull())
    .addColumn('attributedTo', 'varchar(1024)', (col) => col.notNull())
    .addColumn('content', 'varchar', (col) => col.notNull())
    .addColumn('createdAt', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('updatedAt', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute()

  await db.schema
    .createTable('ap_object_kv')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('objectId', 'bigint', (col) => col.notNull())
    .addColumn('key', 'varchar(32)', (col) => col.notNull())
    .addColumn('value', 'varchar', (col) => col.notNull())
    .addColumn('updatedAt', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute()

  await db.schema
    .createIndex('ap_object_attributedTo_idx')
    .on('ap_object')
    .column('attributedTo')
    .execute()

  await db.schema
    .createIndex('ap_object_kv_objectId_key_idx')
    .on('ap_object_kv')
    .columns(['objectId', 'key'])
    .execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex('ap_object_kv_objectId_key_idx').execute()
  await db.schema.dropIndex('ap_object_attributedTo_idx').execute()
  await db.schema.dropTable('ap_object_kv').execute()
  await db.schema.dropTable('ap_object').execute()
}
