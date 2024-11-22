import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Asset from './asset.js'
import BankSoal from './bank_soal.js'

export default class Jawaban extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'soal_id' })
  declare soalId: number

  @column({ columnName: 'assets_id' })
  declare assetsId: number | null

  @column()
  declare jawaban: string | null

  @column({ columnName: 'is_kunci' })
  declare isKunci: boolean

  @column({ columnName: 'created_by' })
  declare createdBy: number | null

  @column({ columnName: 'updated_by' })
  declare updatedBy: number | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime | null

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare createdByUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'updatedBy',
  })
  declare updatedByUser: BelongsTo<typeof User>

  @belongsTo(() => BankSoal, {
    foreignKey: 'soalId',
  })
  declare soal: BelongsTo<typeof BankSoal>

  @belongsTo(() => Asset, {
    foreignKey: 'assetsId',
  })
  declare asset: BelongsTo<typeof Asset>
}
