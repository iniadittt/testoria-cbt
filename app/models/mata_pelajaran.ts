import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class MataPelajaran extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column({ columnName: 'tahun_ajaran' })
  declare tahunAjaran: string

  @column()
  declare tingkat: number

  @column()
  declare semester: number

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
