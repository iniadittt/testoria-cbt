import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const kodeKelasMinLength = 8
const kodeKelasMaxLength = 8

const kelasMinLength = 1
const kelasMaxLength = 100

vine.messagesProvider = new SimpleMessagesProvider({
  'kodeKelas.required': 'Kode kelas harus diisi',
  'kodeKelas.string': 'Kode kelas harus sebuah huruf atau angka',
  'kodeKelas.minLength': `Kode kelas harus memiliki minimal ${kodeKelasMinLength} karakter`,
  'kodeKelas.maxLength': `Kode kelas tidak boleh lebih dari ${kodeKelasMaxLength} karakter`,

  'name.required': 'Nama kelas harus diisi',
  'name.string': 'Nama kelas harus sebuah huruf atau angka',
  'name.minLength': `Nama kelas harus memiliki minimal ${kelasMinLength} karakter`,
  'name.maxLength': `Nama kelas tidak boleh lebih dari ${kelasMaxLength} karakter`,

  'guruId.required': 'Data guru harus diisi',
  'guruId.number': 'Data guru harus sebuah angka',
  'guruId.positive': 'Data guru harus bernilai potisif',

  'mataPelajaranId.required': 'Data mata pelajaran harus diisi',
  'mataPelajaranId.number': 'Data mata pelajaran harus sebuah angka',
  'mataPelajaranId.positive': 'Data mata pelajaran harus bernilai potisif',
})

export const StoreKelasValidator = vine.compile(
  vine.object({
    kodeKelas: vine.string().minLength(kodeKelasMinLength).maxLength(kodeKelasMaxLength),
    name: vine.string().minLength(kelasMinLength).maxLength(kelasMaxLength),
    guruId: vine.number().positive(),
    mataPelajaranId: vine.number().positive(),
  })
)
