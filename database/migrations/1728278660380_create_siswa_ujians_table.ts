import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'siswa_ujians'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('siswa_id').unsigned().notNullable()
      table.string('token_ujian', 16).notNullable()
      table.float('nilai_akhir').nullable()
      table.dateTime('mulai').nullable()

      table.boolean('is_selesai').defaultTo(false).notNullable()
      table.boolean('is_active').defaultTo(false).notNullable()
      table.boolean('is_delete').defaultTo(false).notNullable()

      table.integer('created_by').unsigned().nullable()
      table.integer('updated_by').unsigned().nullable()
      table.integer('deleted_by').unsigned().nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()

      table
        .foreign('siswa_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('token_ujian')
        .references('token')
        .inTable('ujians')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('created_by')
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table
        .foreign('updated_by')
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table
        .foreign('deleted_by')
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
