import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Kelas from '#models/kelas'

export default class extends BaseSeeder {
  async run() {
    const jumlahKelas: number = 4

    for (let i = 0; i < jumlahKelas; i++) {
      await Kelas.create({
        kode: `KELAS${i}`,
        name: `NAMA KELAS ${i}`,
        guruId: jumlahKelas % 2 === 0 ? 3 : 4,
        mataPelajaranId: 1,
        isActive: true,
        isDelete: false,
        createdBy: 1,
      })
    }
  }
}
