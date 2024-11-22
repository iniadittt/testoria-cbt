import MataPelajaran from '#models/mata_pelajaran'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import Kelas from '#models/kelas'
import User from '#models/user'
import { TahunAjaran } from '#constant/tahun_ajaran'
import { FlashAndRedirect } from '#services/general_service'
import { StoreMataPelajaranValidator } from '#validators/matapelajaran_store'
import { UpdateMataPelajaranValidator } from '#validators/matapelajaran_update'
import { StoreKelasValidator } from '#validators/kelas_store'
import { UpdateKelasValidator } from '#validators/kelas_update'
import { DestroyListMataPelajaranValidator } from '#validators/matapelajaran_list_destroy'
// import BankSoal from '#models/bank_soal'
import Jawaban from '#models/jawaban'
import { SoalAfterFilteredType } from '#types/soal'

export default class AdminController {
  async index(ctx: HttpContext) {
    return ctx.inertia.render('admin/page')
  }

  async matapelajaran(ctx: HttpContext) {
    const mataPelajaran = await MataPelajaran.query().preload('createdByUser', (query) =>
      query.select('fullName')
    )
    return ctx.inertia.render('admin/mata_pelajaran/page', { mataPelajaran })
  }

  async matapelajaran_create(ctx: HttpContext) {
    return ctx.inertia.render('admin/mata_pelajaran/create', { TahunAjaran })
  }

  async matapelajaran_detail(ctx: HttpContext) {
    const id = Number.parseInt(ctx.request.qs().id)
    if (!id)
      return FlashAndRedirect(
        ctx,
        'error',
        'Data mata pelajaran yang ingin diperbarui tidak ada',
        'admin.matapelajaran.page'
      )
    const mataPelajaran = await MataPelajaran.query()
      .preload('createdByUser', (query) => query.select('fullName'))
      .where('id', id)
      .first()
    if (!mataPelajaran) {
      return FlashAndRedirect(
        ctx,
        'error',
        'Data mata pelajaran tidak ditemukan',
        'admin.matapelajaran.page'
      )
    }
    return ctx.inertia.render('admin/mata_pelajaran/detail', { TahunAjaran, mataPelajaran })
  }

  async matapelajaran_store(ctx: HttpContext) {
    const myId: number = ctx!.auth!.user!.id
    const payload = await ctx.request.validateUsing(StoreMataPelajaranValidator)
    try {
      const mataPelajaranExist = await MataPelajaran.query()
        .where('name', payload.name)
        .andWhere('tahunAjaran', payload.tahunAjaran)
        .andWhere('tingkat', payload.tingkat)
        .andWhere('semester', payload.semester)
        .first()
      if (mataPelajaranExist) {
        return FlashAndRedirect(
          ctx,
          'error',
          'Gagal membuat data mata pelajaran karena data tersebut sudah ada.',
          'admin.matapelajaran.page'
        )
      }
      await MataPelajaran.create({
        name: payload.name,
        tahunAjaran: payload.tahunAjaran,
        tingkat: payload.tingkat,
        semester: payload.semester,
        createdBy: myId,
      })
      return FlashAndRedirect(
        ctx,
        'success',
        'Data mata pelajaran berhasil dibuat.',
        'admin.matapelajaran.page'
      )
    } catch (error) {
      return FlashAndRedirect(
        ctx,
        'error',
        error.message || 'Terjadi kesalahan saat membuat data mata pelajaran',
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
        'Data mata pelajaran yang ingin diperbarui tidak ada',
        'admin.matapelajaran.page'
      )
    const myId: number = ctx!.auth!.user!.id
    const payload = await ctx.request.validateUsing(UpdateMataPelajaranValidator)
    try {
      const mataPelajaran = await MataPelajaran.findOrFail(id)
      const mataPelajaranExist = await MataPelajaran.query()
        .where('name', payload.name)
        .andWhere('tahunAjaran', payload.tahunAjaran)
        .andWhere('tingkat', payload.tingkat)
        .andWhere('semester', payload.semester)
        .first()
      if (mataPelajaranExist) {
        return FlashAndRedirect(
          ctx,
          'error',
          'Gagal memperbarui data mata pelajaran karena data tersebut sudah ada.',
          'admin.matapelajaran.page'
        )
      }
      mataPelajaran.merge({
        name: payload.name,
        tahunAjaran: payload.tahunAjaran,
        tingkat: payload.tingkat,
        semester: payload.semester,
        updatedAt: DateTime.now(),
        updatedBy: myId,
      })
      await mataPelajaran.save()
      return FlashAndRedirect(
        ctx,
        'success',
        'Mata pelajaran berhasil diperbarui.',
        'admin.matapelajaran.page'
      )
    } catch (error) {
      return FlashAndRedirect(
        ctx,
        'error',
        error.message || 'Terjadi kesalahan saat memperbarui data mata pelajaran',
        'admin.matapelajaran.page'
      )
    }
  }

  async matapelajaran_destroy(ctx: HttpContext) {
    try {
      const id = Number.parseInt(ctx.request.qs().id)
      if (!id)
        return FlashAndRedirect(
          ctx,
          'error',
          'Data mata pelajaran yang ingin dihapus tidak ada',
          'admin.matapelajaran.page'
        )
      const mataPelajaran = await MataPelajaran.findBy('id', id)
      if (!mataPelajaran) {
        return FlashAndRedirect(
          ctx,
          'error',
          'Data mata pelajaran tidak ditemukan',
          'admin.matapelajaran.page'
        )
      }
      await mataPelajaran.delete()
      return FlashAndRedirect(
        ctx,
        'success',
        'Mata pelajaran berhasil dihapus.',
        'admin.matapelajaran.page'
      )
    } catch (error) {
      return FlashAndRedirect(
        ctx,
        'error',
        error.message || 'Terjadi kesalahan saat menghapus data mata pelajaran',
        'admin.matapelajaran.page'
      )
    }
  }

  async matapelajaran_list_destroy(ctx: HttpContext) {
    const trx = await db.transaction()
    try {
      const payload = await ctx.request.validateUsing(DestroyListMataPelajaranValidator)
      const list = payload.list
      list.forEach(async (id) => {
        const selectMataPelajaran = await MataPelajaran.find(id)
        if (!selectMataPelajaran) {
          trx.rollback()
          return FlashAndRedirect(
            ctx,
            'error',
            'Mata pelajaran gagal dihapus.',
            'admin.matapelajaran.page'
          )
        }
        selectMataPelajaran.delete()
      })
      await trx.commit()
      return FlashAndRedirect(
        ctx,
        'success',
        'Mata pelajaran berhasil dihapus.',
        'admin.matapelajaran.page'
      )
    } catch (error) {
      return FlashAndRedirect(
        ctx,
        'error',
        error.message || 'Terjadi kesalahan saat menghapus data mata pelajaran',
        'admin.matapelajaran.page'
      )
    }
  }

  async kelas(ctx: HttpContext) {
    const kelas = await Kelas.query()
      .preload('createdByUser', (query) => query.select('fullName'))
      .preload('guru', (query) => query.select('fullName'))
      .preload('mataPelajaran', (query) => query.select('name'))

    const kelasMap = kelas.map((kls) => ({
      ...kls.toJSON(),
      mataPelajaranName: kls.mataPelajaran?.name || null,
      guruFullName: kls.guru?.fullName || null,
    }))
    return ctx.inertia.render('admin/kelas/page', { kelas: kelasMap })
  }

  async kelas_create(ctx: HttpContext) {
    const guru = await User.query().where('role', 'guru').select('id', 'fullName')
    const mataPelajaran = await MataPelajaran.all()
    return ctx.inertia.render('admin/kelas/create', { guru, mataPelajaran })
  }

  async kelas_detail(ctx: HttpContext) {
    const id = Number.parseInt(ctx.request.qs().id)
    if (!id)
      return FlashAndRedirect(
        ctx,
        'error',
        'Data kelas yang ingin diperbarui tidak ada',
        'admin.kelas.page'
      )
    const kelas = await Kelas.query()
      .preload('guru', (query) => query.select('fullName'))
      .preload('mataPelajaran', (query) => query.select('name'))
      .where('id', id)
      .first()
    if (!kelas) {
      return FlashAndRedirect(ctx, 'error', 'Data kelas tidak ditemukan', 'admin.kelas.page')
    }
    const guru = await User.query().where('role', 'guru').select('id', 'fullName')
    return ctx.inertia.render('admin/kelas/detail', { kelas, guru })
  }

  async kelas_store(ctx: HttpContext) {
    const myId: number = ctx!.auth!.user!.id
    const payload = await ctx.request.validateUsing(StoreKelasValidator)
    try {
      const kelasExist = await Kelas.query()
        .where('name', payload.name)
        .andWhere('mataPelajaranId', payload.mataPelajaranId)
        .first()
      if (kelasExist) {
        return FlashAndRedirect(
          ctx,
          'error',
          'Gagal membuat data kelas karena data tersebut sudah ada.',
          'admin.kelas.create'
        )
      }
      await Kelas.create({
        kode: payload.kodeKelas.toUpperCase(),
        name: payload.name.toUpperCase(),
        guruId: payload.guruId,
        mataPelajaranId: payload.mataPelajaranId,
        createdBy: myId,
      })
      return FlashAndRedirect(ctx, 'success', 'Data kelas berhasil dibuat.', 'admin.kelas.page')
    } catch (error) {
      return FlashAndRedirect(
        ctx,
        'error',
        error.message || 'Terjadi kesalahan saat membuat mata pelajaran',
        'admin.kelas.page'
      )
    }
  }

  async kelas_update(ctx: HttpContext) {
    const id = Number.parseInt(ctx.request.qs().id)
    if (!id)
      return FlashAndRedirect(
        ctx,
        'error',
        'Data kelas yang ingin diperbarui tidak ada',
        'admin.kelas.page'
      )
    const myId: number = ctx!.auth!.user!.id
    const payload = await ctx.request.validateUsing(UpdateKelasValidator)
    try {
      const kelas = await Kelas.findOrFail(id)
      const kelasExist = await Kelas.query()
        .preload('guru')
        .preload('mataPelajaran')
        .where('guruId', payload.guruId)
        .andWhere('mataPelajaranId', kelas.mataPelajaranId)
        .andWhere('name', payload.name)
        .first()
      if (kelasExist) {
        return FlashAndRedirect(
          ctx,
          'error',
          'Gagal memperbarui data kelas karena data tersebut sudah ada.',
          'admin.kelas.page'
        )
      }
      kelas.merge({
        name: payload.name.toUpperCase(),
        guruId: payload.guruId,
        updatedAt: DateTime.now(),
        updatedBy: myId,
      })
      await kelas.save()
      return FlashAndRedirect(ctx, 'success', 'Data kelas berhasil diperbarui.', 'admin.kelas.page')
    } catch (error) {
      return FlashAndRedirect(
        ctx,
        'error',
        error.message || 'Terjadi kesalahan saat memperbarui data kelas',
        'admin.kelas.page'
      )
    }
  }

  async kelas_destroy(ctx: HttpContext) {
    try {
      const id = Number.parseInt(ctx.request.qs().id)
      if (!id)
        return FlashAndRedirect(
          ctx,
          'error',
          'Data kelas yang ingin dihapus tidak ada',
          'admin.kelas.page'
        )
      const kelas = await Kelas.findBy('id', id)
      if (!kelas) {
        return FlashAndRedirect(ctx, 'error', 'Data kelas tidak ditemukan', 'admin.kelas.page')
      }
      await kelas.delete()
      return FlashAndRedirect(ctx, 'success', 'Kelas berhasil dihapus.', 'admin.kelas.page')
    } catch (error) {
      return FlashAndRedirect(
        ctx,
        'error',
        error.message || 'Terjadi kesalahan saat menghapus data kelas',
        'admin.kelas.page'
      )
    }
  }

  async soal(ctx: HttpContext) {
    const soal = await Jawaban.query()
      .preload('soal', (query) =>
        query.preload('asset').preload('mataPelajaran').preload('createdByUser')
      )
      .preload('asset')
    const SOAL: SoalAfterFilteredType[] = soal.reduce((result: any, current: any) => {
      let DATA: SoalAfterFilteredType = result.find(
        (item: SoalAfterFilteredType) => item.pertanyaan === current.soal.pertanyaan
      )
      if (!DATA) {
        DATA = {
          id: current.soal.id,
          type: current.soal.type,
          pertanyaan: current.soal.pertanyaan,
          bobot: current.soal.bobot,
          asset: current.soal.asset,
          createdByUser: {
            id: current.soal.createdByUser.id,
            fullName: current.soal.createdByUser.fullName,
          },
          createdAt: current.soal.createdAt,
          mataPelajaran: {
            id: current.soal.mataPelajaran.id,
            name: current.soal.mataPelajaran.name,
            tahunAjaran: current.soal.mataPelajaran.tahunAjaran,
            tingkat: current.soal.mataPelajaran.tingkat,
            semester: current.soal.mataPelajaran.semester,
          },
          jawaban: [],
        }
        result.push(DATA)
      }
      DATA.jawaban.push({
        id: current.id,
        jawaban: current.jawaban,
        // isKunci: current.isKunci,
        asset: current.asset,
      })
      return result
    }, [])
    const soalMap = SOAL.map((dataSoal) => ({
      ...dataSoal,
      jawabanLength: dataSoal.jawaban.length,
      mataPelajaranName: dataSoal.mataPelajaran.name,
      mataPelajaranTahunAjaran: dataSoal.mataPelajaran.tahunAjaran,
      mataPelajaranTingkat: dataSoal.mataPelajaran.tingkat,
      mataPelajaranSemester: dataSoal.mataPelajaran.semester,
    }))
    return ctx.inertia.render('admin/soal/page', { soal: soalMap })
  }
  // async soal_detail(ctx: HttpContext) {
  //   return
  // }

  async soal_create(ctx: HttpContext) {
    const mataPelajaran = await MataPelajaran.all()
    const mataPelajaranMap = mataPelajaran.map((pelajaran) => ({
      label: `${pelajaran.name} - ${pelajaran.tahunAjaran} - Tingkat ${pelajaran.tingkat}`,
      value: `${pelajaran.name} - ${pelajaran.tahunAjaran} - Tingkat ${pelajaran.tingkat} || ${pelajaran.id}`,
    }))
    return ctx.inertia.render('admin/soal/create', { mataPelajaran: mataPelajaranMap })
  }
}
