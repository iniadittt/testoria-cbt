import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const pertanyaanMin = 1
const pertanyaanMax = 2000

const bobotMin = 1
const bobotMax = 100

const jawabanMin = 1
const jawabanMax = 1000

vine.messagesProvider = new SimpleMessagesProvider({
  'pertanyaan.required': 'Pertanyaan harus diisi',
  'pertanyaan.string': 'Pertanyaan harus berupa teks',
  'pertanyaan.minLength': `Pertanyaan harus memiliki minimal ${pertanyaanMin} karakter`,
  'pertanyaan.maxLength': `Pertanyaan tidak boleh lebih dari ${pertanyaanMax} karakter`,

  'type.required': 'Tipe soal harus diisi',
  'type.enum': 'Tipe soal harus salah satu dari "pg", "multiple", atau "essai"',

  'bobot.required': 'Bobot soal harus diisi',
  'bobot.number': 'Bobot soal harus berupa angka',
  'bobot.positive': 'Bobot soal harus bernilai positif',
  'bobot.minLength': `Bobot soal harus bernilai minimal ${bobotMin}`,
  'bobot.maxLength': `Bobot soal harus bernilai maksimal ${bobotMax}`,

  'mataPelajaranId.required': 'Data mata pelajaran harus diisi',
  'mataPelajaranId.number': 'Data mata pelajaran harus berupa angka',
  'mataPelajaranId.positive': 'Data mata pelajaran harus bernilai positif',

  'assetId.number': 'Asset ID harus berupa angka',
  'assetId.positive': 'Asset ID harus bernilai positif',

  'jawaban.required': 'Jawaban harus diisi',
  'jawaban.array': 'Jawaban harus berupa array',
  'jawaban.min': 'Jawaban minimal 1 item',

  'jawaban.*.jawaban.required': 'Jawaban harus diisi',
  'jawaban.*.jawaban.string': 'Jawaban harus berupa teks',
  'jawaban.*.jawaban.minLength': `Jawaban harus memiliki minimal ${jawabanMin} karakter`,
  'jawaban.*.jawaban.maxLength': `Jawaban tidak boleh lebih dari ${jawabanMax} karakter`,

  'jawaban.*.isKunci.required': 'Status kunci jawaban harus diisi',
  'jawaban.*.isKunci.boolean': 'Status kunci jawaban harus berupa boolean',

  'jawaban.*.assetId.number': 'Asset ID untuk jawaban harus berupa angka',
  'jawaban.*.assetId.positive': 'Asset ID untuk jawaban harus bernilai positif',
})

export const StoreSoalValidator = vine.compile(
  vine.object({
    pertanyaan: vine.string().minLength(5).maxLength(200),
    type: vine.enum(['pg', 'multiple', 'essai']),
    bobot: vine.number().positive(),
    mataPelajaranId: vine.number().positive(),
    assetId: vine.number().positive().optional(),
    jawaban: vine.array(
      vine.object({
        jawaban: vine.string().minLength(1).maxLength(100),
        isKunci: vine.boolean(),
        assetId: vine.number().positive().optional(),
      })
    ),
  })
)
