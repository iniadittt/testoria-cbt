import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Ujian from '#models/ujian'
import { DateTime } from 'luxon'

const generateToken = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let token = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    token += chars[randomIndex]
  }
  return token
}

export default class extends BaseSeeder {
  async run() {
    const jumlahUjian: number = 2
    for (let i = 0; i < jumlahUjian; i++) {
      await Ujian.create({
        name: `UJIAN ${i + 1}`,
        type: 'uas',
        // type: (i + 1) % 10 === 0 ? 'uas' : (i + 1) % 3 === 0 ? 'uts' : 'uh',
        kkm: Math.floor(Math.random() * (85 - 70 + 1)) + 70,
        // token: i % 3 !== 0 ? generateToken(7) : null,
        token: generateToken(7),
        totalPg: 10,
        // totalPg: Math.floor(Math.random() * 50) + 1,
        totalEssai: 5,
        // totalEssai: Math.floor(Math.random() * 20) + 1,
        tempat: 'Aula',
        waktuPengerjaan: '02:00:00',
        showNilai: false,
        mulai: DateTime.now(),
        selesai: DateTime.now().plus({ hours: 12 }),
        kelasId: 1,
        // kelasId: Math.floor(Math.random() * 100) + 1,
        pengawas: jumlahUjian % 2 === 0 ? 3 : 4,
        // pengawas: Math.floor(Math.random() * (20 - 6 + 1)) + 6,
        picAdmin: jumlahUjian % 2 === 0 ? 1 : 2,
        // picAdmin: Math.floor(Math.random() * 5) + 1,
        overtime: jumlahUjian % 2 === 0 ? true : false,
        createdBy: 1,
      })
    }
  }
}
