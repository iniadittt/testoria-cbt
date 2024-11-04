export interface MataPelajaranType {
  id: number
  name: string
  tahunAjaran: string
  tingkat: number
  semester: number
  isActive: boolean
  isDelete: boolean
  createdBy: number
  updatedBy: number | null
  deletedBy: number | null
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  createdByUser: { id: number; fullName: string }
}
