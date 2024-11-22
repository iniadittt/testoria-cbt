import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const kelasMinLength = 1
const kelasMaxLength = 100

vine.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Nama kelas harus diisi',
  'name.string': 'Nama kelas harus sebuah huruf atau angka',
  'name.minLength': `Nama kelas harus memiliki minimal ${kelasMinLength} karakter`,
  'name.maxLength': `Nama kelas tidak boleh lebih dari ${kelasMaxLength} karakter`,

  'guruId.required': 'Data guru harus diisi',
  'guruId.number': 'Data guru harus sebuah angka',
  'guruId.positive': 'Data guru harus bernilai potisif',
})

export const UpdateKelasValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(kelasMinLength).maxLength(kelasMaxLength),
    guruId: vine.number().positive(),
  })
)
