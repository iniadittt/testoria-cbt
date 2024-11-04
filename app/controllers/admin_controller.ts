import MataPelajaran from '#models/mata_pelajaran'
import type { HttpContext } from '@adonisjs/core/http'
import TahunAjaran from '#constant/tahun_ajaran'
import { FlashAndRedirect } from '#services/general_service'
import { StoreMataPelajaranValidator } from '#validators/matapelajaran_store'
import { UpdateMataPelajaranValidator } from '#validators/matapelajaran_update'
import Kelas from '#models/kelas'
import User from '#models/user'
import { StoreKelasValidator } from '#validators/kelas_store'

export default class AdminController {
  async index(ctx: HttpContext) {
    return ctx.inertia.render('admin/page')
  }

  async matapelajaran(ctx: HttpContext) {
    const mataPelajaran = await MataPelajaran.query()
      .preload('createdByUser', (query) => query.select('fullName'))
      .where('isActive', true)
      .andWhere('isDelete', false)
    return ctx.inertia.render('admin/mata_pelajaran/page', { mataPelajaran })
  }

  async matapelajaran_detail(ctx: HttpContext) {
    const id = Number.parseInt(ctx.request.qs().id)
    if (!id)
      return FlashAndRedirect(
        ctx,
        'error',
        'Mata pelajaran yang ingin diubah tidak ada',
        'admin.matapelajaran.page'
      )
    const mataPelajaran = await MataPelajaran.query()
      .preload('createdByUser', (query) => query.select('fullName'))
      .where('id', id)
      .andWhere('isActive', true)
      .andWhere('isDelete', false)
      .first()
    if (!mataPelajaran) {
      return FlashAndRedirect(
        ctx,
        'error',
        'Mata pelajaran tidak ditemukan',
        'admin.matapelajaran.page'
      )
    }
    return ctx.inertia.render('admin/mata_pelajaran/detail', { TahunAjaran, mataPelajaran })
  }

  async matapelajaran_create(ctx: HttpContext) {
    return ctx.inertia.render('admin/mata_pelajaran/create', { TahunAjaran })
  }

  async matapelajaran_store(ctx: HttpContext) {
    const myId: number = ctx!.auth!.user!.id
    const myRole: string = ctx!.auth!.user!.role
    const payload = await ctx.request.validateUsing(StoreMataPelajaranValidator)
    try {
      await MataPelajaran.create({
        name: payload.name,
        tahunAjaran: payload.tahunAjaran,
        tingkat: payload.tingkat,
        semester: payload.semester,
        isActive: myRole === 'admin' ? true : false,
        isDelete: false,
        createdBy: myId,
      })
      return FlashAndRedirect(
        ctx,
        'success',
        'Mata pelajaran berhasil dibuat.',
        'admin.matapelajaran.page'
      )
    } catch (error) {
      return FlashAndRedirect(
        ctx,
        'error',
        error.message || 'Terjadi kesalahan saat membuat mata pelajaran',
        'admin.matapelajaran.page'
      )
    }
  }

  async matapelajaran_update(ctx: HttpContext) {
    const id = Number.parseInt(ctx.request.qs().id)
    if (!id)
      return FlashAndRedirect(
        ctx,
        'error',
        'Mata pelajaran yang ingin diubah tidak ada',
        'admin.matapelajaran.page'
      )
    const myId: number = ctx!.auth!.user!.id
    const payload = await ctx.request.validateUsing(UpdateMataPelajaranValidator)
    try {
      const mataPelajaran = await MataPelajaran.findOrFail(id)
      mataPelajaran.merge({
        name: payload.name,
        tahunAjaran: payload.tahunAjaran,
        tingkat: payload.tingkat,
        semester: payload.semester,
        updatedBy: myId,
      })
      await mataPelajaran.save()
      return FlashAndRedirect(
        ctx,
        'success',
        'Mata pelajaran berhasil diupdate.',
        'admin.matapelajaran.page'
      )
    } catch (error) {
      return FlashAndRedirect(
        ctx,
        'error',
        error.message || 'Terjadi kesalahan saat mengupdate mata pelajaran',
        'admin.matapelajaran.page'
      )
    }
  }

  async kelas(ctx: HttpContext) {
    const kelas = await Kelas.query()
      .preload('createdByUser', (query) => query.select('fullName'))
      .preload('guru', (query) => query.select('fullName'))
      .preload('mataPelajaran', (query) => query.select('name'))
    return ctx.inertia.render('admin/kelas/page', { kelas })
  }

  async kelas_detail(ctx: HttpContext) {
    return ctx.inertia.render('admin/kelas/detail')
  }

  async kelas_create(ctx: HttpContext) {
    const guru = await User.query()
      .where('role', 'guru')
      .andWhere('isActive', true)
      .andWhere('isDelete', false)
      .select('id', 'fullName')
    const mataPelajaran = await MataPelajaran.query()
      .andWhere('isActive', true)
      .andWhere('isDelete', false)
    return ctx.inertia.render('admin/kelas/create', { guru, mataPelajaran })
  }

  async kelas_store(ctx: HttpContext) {
    const myId: number = ctx!.auth!.user!.id
    const myRole: string = ctx!.auth!.user!.role
    const payload = await ctx.request.validateUsing(StoreKelasValidator)
    try {
      const kelasExist = await Kelas.query()
        .where('name', payload.name)
        .andWhere('mataPelajaranId', payload.mataPelajaranId)
        .andWhere('isActive', true)
        .andWhere('isDelete', false)
        .first()
      if (kelasExist) {
        return FlashAndRedirect(
          ctx,
          'error',
          'Tidak bisa membuat kelas baru, karena kelas dengan mata pelajaran tersebut sudah ada.',
          'admin.kelas.create'
        )
      }
      await Kelas.create({
        kode: payload.kodeKelas,
        name: payload.name,
        guruId: payload.guruId,
        mataPelajaranId: payload.mataPelajaranId,
        isActive: myRole === 'admin' ? true : false,
        isDelete: false,
        createdBy: myId,
      })
      return FlashAndRedirect(ctx, 'success', 'Kelas berhasil dibuat.', 'admin.kelas.page')
    } catch (error) {
      return FlashAndRedirect(
        ctx,
        'error',
        error.message || 'Terjadi kesalahan saat membuat mata pelajaran',
        'admin.kelas.page'
      )
    }
  }

  async kelas_update(ctx: HttpContext) {}

  async kelas_delete(ctx: HttpContext) {}
}
