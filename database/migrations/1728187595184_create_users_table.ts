import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username', 100).notNullable()
      table.string('password').notNullable()
      table.string('full_name', 100).notNullable()
      table.string('email', 100).nullable()
      table.string('phone', 20).nullable()
      table.string('nip', 24).nullable()
      table.string('nisn', 16).nullable()
      table.enum('role', ['admin', 'operator', 'guru', 'siswa']).notNullable()
      table.enum('gender', ['male', 'female']).notNullable()
      table.integer('photo').unsigned().nullable()

      table.boolean('is_active').defaultTo(false).notNullable()
      table.boolean('is_delete').defaultTo(false).notNullable()

      table.integer('created_by').unsigned().nullable()
      table.integer('updated_by').unsigned().nullable()
      table.integer('deleted_by').unsigned().nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()

      table
        .foreign('photo')
        .references('id')
        .inTable('assets')
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
