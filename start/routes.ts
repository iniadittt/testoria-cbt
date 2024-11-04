/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import type { HttpContext } from '@adonisjs/core/http'
import { middleware } from './kernel.js'

const GuestController = () => import('#controllers/guests_controller')
const AuthController = () => import('#controllers/auth_controller')
const SiswaController = () => import('#controllers/siswas_controller')
const GuruController = () => import('#controllers/gurus_controller')
const OperatorController = () => import('#controllers/operators_controller')
const AdminController = () => import('#controllers/admin_controller')

router.group(() => {
  router.get('/', [GuestController, 'index']).as('home')
})

router
  .group(() => {
    router.get('/login', [AuthController, 'login']).as('auth.login.page')
    router.post('/login', [AuthController, 'login_store']).as('auth.login.store')
  })
  .prefix('/auth')
  .middleware(middleware.guest())

router
  .group(() => {
    router.delete('/logout', [AuthController, 'logout']).as('auth.logout')
  })
  .middleware(middleware.auth())

router
  .group(() => {
    router.get('/', [AdminController, 'index']).as('admin.page')

    router
      .group(() => {
        router.get('/', [AdminController, 'matapelajaran']).as('admin.matapelajaran.page')
        router
          .get('/detail', [AdminController, 'matapelajaran_detail'])
          .as('admin.matapelajaran.detail')
        router
          .get('/create', [AdminController, 'matapelajaran_create'])
          .as('admin.matapelajaran.create')
        router
          .post('/store', [AdminController, 'matapelajaran_store'])
          .as('admin.matapelajaran.store')
        router
          .patch('/update', [AdminController, 'matapelajaran_update'])
          .as('admin.matapelajaran.update')
      })
      .prefix('/mata-pelajaran')

    router
      .group(() => {
        router.get('/', [AdminController, 'kelas']).as('admin.kelas.page')
        router.get('/detail', [AdminController, 'kelas_detail']).as('admin.kelas.detail')
        router.get('/create', [AdminController, 'kelas_create']).as('admin.kelas.create')
        router.post('/store', [AdminController, 'kelas_store']).as('admin.kelas.store')
        router.patch('/update', [AdminController, 'kelas_update']).as('admin.kelas.update')
      })
      .prefix('/kelas')
  })

  .prefix('/panel/admin')
  .middleware(middleware.auth())
  .middleware(middleware.role(['admin']))

router.any('*', (ctx: HttpContext) => ctx.view.render('pages/errors/not_found')).as('errors')
