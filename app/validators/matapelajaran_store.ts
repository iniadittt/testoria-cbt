import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const nameMinLength = 1
const nameMaxLength = 100

const tahunAjaranMinLength = 1
const tahunAjaranMaxLength = 100

vine.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Name harus diisi',
  'name.string': 'Name harus sebuah huruf atau angka',
  'name.minLength': `Name harus memiliki minimal ${nameMinLength} karakter`,
  'name.maxLength': `Name tidak boleh lebih dari ${nameMaxLength} karakter`,

  'tahunAjaran.required': 'Tahun Ajaran harus diisi',
  'tahunAjaran.string': 'Tahun Ajaran harus sebuah huruf atau angka',
  'tahunAjaran.minLength': `Tahun Ajaran harus memiliki minimal ${tahunAjaranMinLength} karakter`,
  'tahunAjaran.maxLength': `Tahun Ajaran tidak boleh lebih dari ${tahunAjaranMaxLength} karakter`,

  'tingkat.required': 'Tingkat harus diisi',
  'tingkat.number': 'Tingkat harus sebuah angka',
  'tingkat.positive': 'Tingkat harus bernilai potisif',
  'tingkat.min': 'Tingkat harus bernilai minimal 1',
  'tingkat.max': 'Tingkat harus bernilai maximal 10',

  'semester.required': 'Semester harus diisi',
  'semester.number': 'Semester harus sebuah angka',
  'semester.positive': 'Semester harus bernilai potisif',
  'semester.min': 'Semester harus bernilai minimal 1',
  'semester.max': 'Semester harus bernilai maximal 2',
})

export const StoreMataPelajaranValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(nameMinLength).maxLength(nameMaxLength),
    tahunAjaran: vine.string().minLength(tahunAjaranMinLength).maxLength(tahunAjaranMaxLength),
    tingkat: vine.number().positive().min(1).max(10),
    semester: vine.number().positive().min(1).max(2),
  })
)
