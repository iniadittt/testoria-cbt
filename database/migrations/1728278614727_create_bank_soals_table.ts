import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bank_soals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('type', ['pg', 'multiple', 'essai']).notNullable()
      table.text('pertanyaan').nullable()
      table.integer('assets_id').unsigned().nullable()
      table.float('bobot').nullable()
      table.integer('mata_pelajaran_id').unsigned().notNullable()
      table.integer('created_by').unsigned().nullable()
      table.integer('updated_by').unsigned().nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table
        .foreign('assets_id')
        .references('id')
        .inTable('assets')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('mata_pelajaran_id')
        .references('id')
        .inTable('mata_pelajarans')
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
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
