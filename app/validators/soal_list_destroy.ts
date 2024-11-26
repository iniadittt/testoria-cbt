import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const minLength = 1

vine.messagesProvider = new SimpleMessagesProvider({
  'array.minLength': `Daftar harus memiliki setidaknya ${minLength} soal.`,
  'array.*.number': 'Setiap item dalam daftar harus berupa angka.',
})

export const DestroyListSoalValidator = vine.compile(
  vine.object({
    list: vine.array(vine.number()).minLength(minLength),
  })
)
