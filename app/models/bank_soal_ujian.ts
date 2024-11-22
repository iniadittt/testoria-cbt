import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BankSoal from './bank_soal.js'
import Ujian from './ujian.js'
import User from './user.js'

export default class BankSoalUjian extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'bank_soal_id' })
  declare bankSoalId: number

  @column({ columnName: 'ujian_id' })
  declare ujianId: number

  @column({ columnName: 'created_by' })
  declare createdBy: number | null

  @column({ columnName: 'updated_by' })
  declare updatedBy: number | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime | null

  @belongsTo(() => BankSoal, {
    foreignKey: 'bankSoalId',
  })
  declare bankSoal: BelongsTo<typeof BankSoal>

  @belongsTo(() => Ujian, {
    foreignKey: 'ujianId',
  })
  declare ujian: BelongsTo<typeof Ujian>

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare createdByUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'updatedBy',
  })
  declare updatedByUser: BelongsTo<typeof User>
}
