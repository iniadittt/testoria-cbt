export interface MataPelajaranType {
  id: number
  name: string
  tahunAjaran: string
  tingkat: number
  semester: number
}

export interface JawabanType {
  id: number
  jawaban: string
  asset: string | null
}

export interface SoalType {
  id: number
  type: string
  pertanyaan: string
  jawaban: JawabanType[]
  bobot: number
  asset: string | null
  createdByUser: {
    id: number
    fullName: string
  }
  createdAt: string
  mataPelajaran: MataPelajaranType
  mataPelajaranName: string
  mataPelajaranTahunAjaran: string
  mataPelajaranTingkat: number
  mataPelajaranSemester: number
}
