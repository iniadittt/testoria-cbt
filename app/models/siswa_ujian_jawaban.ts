import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Jawaban from './jawaban.js'
import SiswaUjianSoal from './siswa_ujian_soal.js'

export default class SiswaUjianJawaban extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'siswa_ujian_soal_id' })
  declare siswaUjianSoalId: number

  @column({ columnName: 'jawaban_pg' })
  declare jawabanPg: number | null

  @column({ columnName: 'jawaban_essai' })
  declare jawabanEssai: string | null

  @column()
  declare correct: boolean | null

  @column()
  declare nilai: number | null

  @column({ columnName: 'is_active' })
  declare isActive: boolean

  @column({ columnName: 'is_delete' })
  declare isDelete: boolean

  @column({ columnName: 'created_by' })
  declare createdBy: number | null

  @column({ columnName: 'updated_by' })
  declare updatedBy: number | null

  @column({ columnName: 'deleted_by' })
  declare deletedBy: number | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime | null

  @column.dateTime({ columnName: 'deleted_at' })
  declare deletedAt: DateTime | null

  @belongsTo(() => SiswaUjianSoal, {
    foreignKey: 'siswaUjianSoalId',
  })
  declare siswaUjianSoal: BelongsTo<typeof SiswaUjianSoal>

  @belongsTo(() => Jawaban, {
    foreignKey: 'jawabanSiswa',
  })
  declare jawaban: BelongsTo<typeof Jawaban>

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare createdByUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'updatedBy',
  })
  declare updatedByUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'deletedBy',
  })
  declare deletedByUser: BelongsTo<typeof User>
}
