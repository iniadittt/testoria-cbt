import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Ujian from './ujian.js'

export default class SiswaUjian extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'siswa_id' })
  declare siswaId: number

  @column({ columnName: 'token_ujian' })
  declare tokenUjian: string

  @column({ columnName: 'nilai_akhir' })
  declare nilaiAkhir: number | null

  @column.dateTime({ columnName: 'mulai' })
  declare mulai: DateTime | null

  @column({ columnName: 'is_selesai' })
  declare isSelesai: boolean

  @column({ columnName: 'created_by' })
  declare createdBy: number | null

  @column({ columnName: 'updated_by' })
  declare updatedBy: number | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime | null

  @belongsTo(() => User, {
    foreignKey: 'siswaId',
  })
  declare siswa: BelongsTo<typeof User>

  @belongsTo(() => Ujian, {
    foreignKey: 'tokenUjian',
    localKey: 'token',
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
