import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Asset from '#models/asset'

export default class extends BaseSeeder {
  async run() {
    await Asset.create({
      url: '/public/assets/image/contoh.jpg',
    })
  }
}
