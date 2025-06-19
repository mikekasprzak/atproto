import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('ap_actor_kv')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('did', 'varchar', (col) => col.notNull())
    .addColumn('key', 'varchar(32)', (col) => col.notNull())
    .addColumn('value', 'varchar', (col) => col.notNull())
    .addColumn('updatedAt', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute()

  await db.schema
    .createIndex('ap_actor_kv_did_idx')
    .on('ap_actor_kv')
    .column('did')
    .execute()

  await db.schema
    .createIndex('ap_actor_kv_did_key_idx')
    .on('ap_actor_kv')
    .columns(['did', 'key'])
    .execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex('ap_actor_kv_did_key_idx').execute()
  await db.schema.dropIndex('ap_actor_kv_did_idx').execute()
  await db.schema.dropTable('ap_actor_kv').execute()
}
