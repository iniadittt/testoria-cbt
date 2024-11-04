import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Kelas from './kelas.js'

export default class Ujian extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare type: 'uh' | 'uts' | 'uas'

  @column()
  declare kkm: number

  @column()
  declare token: string | null

  @column()
  declare tempat: string

  @column({ columnName: 'total_pg' })
  declare totalPg: number

  @column({ columnName: 'total_essai' })
  declare totalEssai: number

  @column({ columnName: 'waktu_pengerjaan' })
  declare waktuPengerjaan: string

  @column({ columnName: 'tanggal_ujian' })
  declare tanggalUjian: string

  @column.dateTime({ columnName: 'mulai' })
  declare mulai: DateTime

  @column.dateTime({ columnName: 'selesai' })
  declare selesai: DateTime

  @column({ columnName: 'overtime' })
  declare overtime: boolean

  @column({ columnName: 'show_nilai' })
  declare showNilai: boolean

  @column({ columnName: 'kelas_id' })
  declare kelasId: number

  @column()
  declare pengawas: number

  @column({ columnName: 'pic_admin' })
  declare picAdmin: number

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

  @belongsTo(() => Kelas, {
    foreignKey: 'kelasId',
  })
  declare kelas: BelongsTo<typeof Kelas>

  @belongsTo(() => User, {
    foreignKey: 'pengawas',
  })
  declare pengawasUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'picAdmin',
  })
  declare picAdminUser: BelongsTo<typeof User>

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

  public async activate() {
    this.isActive = true
    await this.save()
  }

  public async deactivate() {
    this.isActive = false
    await this.save()
  }

  public async softDelete(deletedBy: number) {
    this.isDelete = true
    this.deletedBy = deletedBy
    this.deletedAt = DateTime.now()
    await this.save()
  }

  public async restore() {
    this.isDelete = false
    this.deletedBy = null
    this.deletedAt = null
    await this.save()
  }

  public isActiveStatus(): boolean {
    return this.isActive
  }
}
