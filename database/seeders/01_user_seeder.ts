import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const jumlahOperator: number = 1
    const jumlahGuru: number = 3
    const jumlahSiswa: number = 5

    await User.create({
      username: 'sudo',
      password: 'password',
      fullName: 'Super Admin',
      email: 'superadmin@gmail.com',
      phone: '083897916745',
      role: 'admin',
      gender: 'male',
      isActive: true,
      isDelete: false,
    })

    for (let i = 0; i < jumlahOperator; i++) {
      await User.create({
        username: `operator${i + 1}`,
        password: 'password',
        fullName: `Operator ${i + 1}`,
        email: `operator${i + 1}@gmail.com`,
        phone: `0811111111${i + 1}`,
        role: 'operator',
        gender: 'male',
        isActive: true,
        isDelete: false,
        createdBy: 1,
      })
    }

    for (let i = 0; i < jumlahGuru; i++) {
      await User.create({
        username: `guru${i + 1}`,
        password: 'password',
        fullName: `Guru ${i + 1}`,
        email: `guru${i + 1}@gmail.com`,
        phone: `0822222222${i + 1}`,
        role: 'guru',
        gender: 'male',
        isActive: true,
        isDelete: false,
        createdBy: 1,
      })
    }

    for (let i = 0; i < jumlahSiswa; i++) {
      await User.create({
        username: `siswa${i + 1}`,
        password: 'password',
        fullName: `Siswa ${i + 1}`,
        email: `siswa${i + 1}@gmail.com`,
        phone: `0833333333${i + 1}`,
        role: 'siswa',
        gender: 'male',
        isActive: true,
        isDelete: false,
        createdBy: 1,
      })
    }
  }
}
