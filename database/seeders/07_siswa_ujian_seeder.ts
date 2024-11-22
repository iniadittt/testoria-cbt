import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SiswaUjian from '#models/siswa_ujian'
import Ujian from '#models/ujian'

export default class extends BaseSeeder {
  async run() {
    const ujians = await Ujian.all()
    const ujianAvailable = ujians.filter(
      (ujian) => ujian.token !== null && ujian.token !== undefined
    )
    if (ujians.length === 0) {
      console.error('Tidak ada ujian yang ditemukan.')
      return
    }
    await SiswaUjian.create({
      siswaId: 1,
      tokenUjian: ujianAvailable[0].token || undefined,
      isSelesai: false,
      createdBy: 1,
    })
  }
}
