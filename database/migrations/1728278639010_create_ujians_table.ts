import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ujians'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.enum('type', ['uh', 'uts', 'uas']).notNullable()
      table.integer('kkm').notNullable()
      table.string('token', 7).unique().nullable()
      table.string('tempat', 254).notNullable()
      table.integer('total_pg').notNullable()
      table.integer('total_essai').notNullable()
      table.time('waktu_pengerjaan').notNullable()
      table.dateTime('mulai').notNullable()
      table.dateTime('selesai').notNullable()
      table.boolean('overtime').notNullable().defaultTo(false)
      table.boolean('show_nilai').notNullable().defaultTo(false)
      table.integer('kelas_id').unsigned().notNullable()
      table.integer('pengawas').unsigned().notNullable()
      table.integer('pic_admin').unsigned().notNullable()
      table.integer('created_by').unsigned().nullable()
      table.integer('updated_by').unsigned().nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table
        .foreign('kelas_id')
        .references('id')
        .inTable('kelas')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('pengawas')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('pic_admin')
        .references('id')
        .inTable('users')
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

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
