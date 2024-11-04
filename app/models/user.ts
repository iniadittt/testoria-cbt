import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username', 'email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare fullName: string

  @column()
  declare email: string | null

  @column()
  declare phone: string | null

  @column()
  declare nip: string | null

  @column()
  declare nisn: string | null

  @column()
  declare role: 'admin' | 'operator' | 'guru' | 'siswa'

  @column()
  declare gender: 'male' | 'female'

  @column()
  declare photo: number | null

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
  declare creator: BelongsTo<typeof User>

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

  public getFormattedFullName(): string {
    return this.fullName ? this.fullName : `${this.username}`
  }

  public isAdmin(): boolean {
    return this.role === 'admin'
  }

  public isOperator(): boolean {
    return this.role === 'operator'
  }

  public isGuru(): boolean {
    return this.role === 'guru'
  }

  public isSiswa(): boolean {
    return this.role === 'siswa'
  }
}
