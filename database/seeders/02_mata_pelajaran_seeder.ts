import { BaseSeeder } from '@adonisjs/lucid/seeders'
import MataPelajaran from '#models/mata_pelajaran'

export default class extends BaseSeeder {
  async run() {
    const jumlahPelajaran: number = 5

    for (let i = 0; i < jumlahPelajaran; i++) {
      const ganjil = i % 2 === 1
      const tahunAjaran = ganjil ? '2023/2024 Ganjil ' : '2023/2024 Genap'
      const semester = ganjil ? 1 : 2
      await MataPelajaran.create({
        name: `Mata Pelajaran ${i}`,
        tingkat: 3,
        // tingkat: Math.floor(Math.random() * 7) + 1,
        semester,
        tahunAjaran,
        isActive: true,
        isDelete: false,
        createdBy: 1,
      })
    }
  }
}
