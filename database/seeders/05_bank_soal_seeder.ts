import { BaseSeeder } from '@adonisjs/lucid/seeders'
import BankSoal from '#models/bank_soal'

export default class extends BaseSeeder {
  async run() {
    const jumlahBankSoal: number = 200
    const typeSoalOptions = ['pg', 'multiple', 'essai']
    type TypeSoal = 'pg' | 'multiple' | 'essai' | undefined

    for (let i = 0; i < jumlahBankSoal; i++) {
      const typeSoal = typeSoalOptions[Math.floor(Math.random() * typeSoalOptions.length)]
      let bobot: number
      if (typeSoal === 'essai') {
        bobot = Math.floor(Math.random() * 4) + 2
      } else {
        bobot = 1
      }
      await BankSoal.create({
        type: typeSoal as TypeSoal,
        pertanyaan: `Pertanyaan ${i} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis commodi ex modi temporibus dolorem mollitia aperiam iusto labore, sunt eveniet.`,
        assetsId: Math.random() < 0.5 ? 1 : null,
        bobot,
        mataPelajaranId: jumlahBankSoal % 2 === 0 ? 1 : 2,
        createdBy: 1,
      })
    }
  }
}
