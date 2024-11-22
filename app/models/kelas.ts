import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import MataPelajaran from './mata_pelajaran.js'

export default class Kelas extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare kode: string

  @column()
  declare name: string

  @column({ columnName: 'guru_id' })
  declare guruId: number

  @column({ columnName: 'mata_pelajaran_id' })
  declare mataPelajaranId: number

  @column({ columnName: 'created_by' })
  declare createdBy: number | null

  @column({ columnName: 'updated_by' })
  declare updatedBy: number | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime | null

  @belongsTo(() => User, {
    foreignKey: 'guruId',
  })
  declare guru: BelongsTo<typeof User>

  @belongsTo(() => MataPelajaran, {
    foreignKey: 'mataPelajaranId',
  })
  declare mataPelajaran: BelongsTo<typeof MataPelajaran>

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare createdByUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'updatedBy',
  })
  declare updatedByUser: BelongsTo<typeof User>
}
