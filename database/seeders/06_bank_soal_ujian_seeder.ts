import { BaseSeeder } from '@adonisjs/lucid/seeders'
import BankSoal from '#models/bank_soal'
import BankSoalUjian from '#models/bank_soal_ujian'

export default class extends BaseSeeder {
  async run() {
    const jumlahUjian = 2
    const jumlahSoalPg = 10
    const jumlahSoalEssai = 5
    const createBankSoalUjian = async (soalIds: any[], ujianId: number) => {
      for (const soal of soalIds) {
        await BankSoalUjian.create({
          bankSoalId: soal.id,
          ujianId,
          isActive: true,
          isDelete: false,
          createdBy: 1,
        })
      }
    }
    const getSoalsByType = async (type: string, limit: number) => {
      return await BankSoal.query().where('type', type).orderByRaw('RAND()').limit(limit)
    }
    for (let i = 1; i <= jumlahUjian; i++) {
      const soalsPg = getSoalsByType('pg', jumlahSoalPg)
      const soalsMultiple = getSoalsByType('multiple', jumlahSoalEssai)
      const soalsEssai = getSoalsByType('essai', jumlahSoalEssai)
      const [soalsPgResult, soalsMultipleResult, soalsEssaiResult] = await Promise.all([
        soalsPg,
        soalsMultiple,
        soalsEssai,
      ])
      await Promise.all([
        createBankSoalUjian(soalsPgResult, i),
        createBankSoalUjian(soalsMultipleResult, i),
        createBankSoalUjian(soalsEssaiResult, i),
      ])
    }
  }
}
