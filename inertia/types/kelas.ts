export interface CreatedByUserType {
  fullName: string
  id: number
}

export interface GuruType {
  fullName: string
  id: number
}

export interface MataPelajaranType {
  name: string
  id: number
}

export interface KelasType {
  id: number
  kode: string
  name: string
  guruId: number
  mataPelajaranId: number
  isActive: number
  isDelete: number
  createdBy: number
  updatedBy: number | null
  deletedBy: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdByUser: CreatedByUserType
  guru: GuruType
  mataPelajaran: MataPelajaranType
}
