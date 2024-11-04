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

  @belongsTo(() => BankSoal, {
    foreignKey: 'soalId',
  })
  declare soal: BelongsTo<typeof BankSoal>

  @belongsTo(() => Asset, {
    foreignKey: 'assetsId',
  })
  declare asset: BelongsTo<typeof Asset>

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
