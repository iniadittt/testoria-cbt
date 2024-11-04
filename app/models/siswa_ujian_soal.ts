import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import SiswaUjian from './siswa_ujian.js'
import BankSoalUjian from './bank_soal_ujian.js'
import Jawaban from './jawaban.js'
export default class SiswaUjianSoal extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'siswa_ujian_id' })
  declare siswaUjianId: number

  @column({ columnName: 'bank_soal_ujian_id' })
  declare bankSoalUjianId: number

  @column({ columnName: 'is_ragu' })
  declare isRagu: boolean

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

  @belongsTo(() => SiswaUjian, {
    foreignKey: 'siswaUjianId',
  })
  declare siswaUjian: BelongsTo<typeof SiswaUjian>

  @belongsTo(() => BankSoalUjian, {
    foreignKey: 'bankSoalUjianId',
  })
  declare bankSoalUjian: BelongsTo<typeof BankSoalUjian>

  @belongsTo(() => Jawaban, {
    foreignKey: 'siswaUjianJawabanId',
  })
  declare siswaUjianJawaban: BelongsTo<typeof Jawaban>

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
