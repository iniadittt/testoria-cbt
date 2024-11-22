export interface MataPelajaranType {
  id: number
  name: string
  tahunAjaran: string
  tingkat: number
  semester: number
  createdBy: number | null
  updatedBy: number | null
  createdAt: string
  updatedAt: string | null
}

export interface CreatedByUserType {
  id: number
  username: string
  password: string
  fullName: string
  email: string
  phone: string
  nip: string | null
  nisn: string | null
  role: string
  gender: string
  photo: string | null
  createdBy: number | null
  updatedBy: number | null
  createdAt: string
  updatedAt: string
}

export interface SoalType {
  id: number
  type: string
  pertanyaan: string
  assetsId: number | null
  bobot: number
  mataPelajaranId: number
  createdBy: number
  updatedBy: number | null
  createdAt: string
  updatedAt: string | null
  asset: any | null
  mataPelajaran: MataPelajaranType
  createdByUser: CreatedByUserType
}

export interface JawabanType {
  id: number
  soalId: number
  jawaban: string
  assetsId: number | null
  isKunci: number
  createdBy: number
  updatedBy: number | null
  createdAt: string
  updatedAt: string | null
  asset: any | null
  soal: SoalType
}

export interface SoalAfterFilteredType {
  id: number
  type: string
  pertanyaan: string
  bobot: number
  asset: any | null
  createdByUser: { id: number; fullName: string }
  createdAt: string
  mataPelajaran: {
    id: number
    name: string
    tahunAjaran: string
    tingkat: number
    semester: number
  }
  jawaban: { id: number; jawaban: string; asset: any | null }[]
}
