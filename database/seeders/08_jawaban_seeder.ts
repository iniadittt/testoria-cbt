import { BaseSeeder } from '@adonisjs/lucid/seeders'
import BankSoal from '#models/bank_soal'
import Jawaban from '#models/jawaban'

export default class extends BaseSeeder {
  async run() {
    const totalJawaban = 5
    const bankSoal = await BankSoal.all()
    for (const soal of bankSoal) {
      const jawabanData = []
      const total = soal.type === 'essai' ? 1 : totalJawaban
      for (let j = 0; j < total; j++) {
        const isAssetsOnly = (soal.type === 'multiple' || soal.type === 'pg') && j % 2 === 0
        jawabanData.push({
          soalId: soal.id,
          assetsId: isAssetsOnly ? 1 : total % 2 === 0 && soal.type !== 'essai' ? 1 : null,
          jawaban: isAssetsOnly
            ? null
            : `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, mollitia omnis rerum totam temporibus voluptatem dolorem saepe eveniet placeat! Jawaban ${j + 1}`,
          isKunci:
            soal.type === 'essai'
              ? true
              : soal.type === 'multiple' || soal.type === 'pg'
                ? j % 2 === 0
                : j === 0,
          createdBy: 1,
        })
      }
      await Jawaban.createMany(jawabanData)
    }
  }
}
