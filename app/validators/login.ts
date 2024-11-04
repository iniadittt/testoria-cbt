import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const usernameMinLength = 4
const usernameMaxLength = 100
const passwordMinLength = 8
const passwordMaxLength = 255

vine.messagesProvider = new SimpleMessagesProvider({
  'username.required': 'Username harus diisi',
  'username.string': 'Username harus sebuah huruf atau angka',
  'username.minLength': `Username harus memiliki minimal ${usernameMinLength} karakter`,
  'username.maxLength': `Username tidak boleh lebih dari ${usernameMaxLength} karakter`,

  'password.required': 'Password harus diisi',
  'password.string': 'Password harus sebuah huruf atau angka',
  'password.minLength': `Password harus memiliki minimal ${passwordMinLength} karakter`,
  'password.maxLength': `Password tidak boleh lebih dari ${passwordMaxLength} karakter`,
})

export const LoginValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(usernameMinLength).maxLength(usernameMaxLength),
    password: vine.string().minLength(passwordMinLength).maxLength(passwordMaxLength),
  })
)
