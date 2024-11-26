import React, { useState, useEffect } from 'react'
import { Head, Link, usePage, useForm } from '@inertiajs/react'
import { AdminLayout } from '@/layouts/admin'
import { Header } from '@/components/header'
import { DataTableAdminKelas } from '@/components/datatables/admin-kelas'
import { NotificationType } from '@/types/flash'
import { KelasType } from '@/types/kelas'
import { RoutesType } from '@/types/route'
import { toast } from 'sonner'
import { Plus, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/dialog'
import { Button } from '@/shadcn/button'
import { Spinner } from '@/shadcn/spinner'

// =================================================================
// Interface
// =================================================================

interface DataType {
  list: number[]
}

// =================================================================
// Component
// =================================================================

export default function DashboardAdminKelas({ kelas }: { kelas: KelasType[] }) {
  const routes = usePage().props.routes as RoutesType
  const notification = usePage().props.notification as NotificationType

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    if (notification?.type && notification?.message) {
      toast(notification?.message, {
        style: {
          fontSize: '14px',
          borderRadius: 0,
          border: 0,
          boxShadow: 'none',
          backgroundColor: notification?.type === 'success' ? '#bbf7d0' : '#fecaca',
          color: notification?.type === 'success' ? '#15803d' : '#b91c1c',
        },
      })
    }
  }, [notification])

  const { data, setData, processing, reset, delete: destroy } = useForm<DataType>({ list: [] })

  const destroyData = async (event: React.MouseEvent) => {
    event.preventDefault()
    destroy(routes.as['admin.kelas.list.destroy'], {
      onFinish: () => {
        setDialogOpen(false)
        reset()
      },
    })
  }

  return (
    <AdminLayout title="Kelas">
      <div>
        <Head title="Kelas - Panel Admin" />
        <Header title={'Kelas'} back={false} refresh={true}>
          <Link
            href={routes.as['admin.kelas.create']}
            style={{ fontWeight: '600' }}
            className="uppercase flex items-center gap-1 px-3 hover:bg-gray-100 rounded text-blue-600 leading-36 hover:text-blue-600"
          >
            <Plus className="w-4" />
            <span className="text-13px font-semibold">Tambah Mata Pelajaran</span>
          </Link>
          <Dialog open={dialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                style={{ fontWeight: '600' }}
                className={`uppercase flex items-center gap-1 px-3 leading-36 rounded ${
                  data.list.length === 0
                    ? 'text-gray-700 hover:text-gray-700'
                    : 'hover:bg-gray-100 text-blue-600 hover:text-blue-600'
                }`}
                disabled={data.list.length === 0}
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault()
                  setDialogOpen(true)
                }}
              >
                <Trash2 className="w-4" />
                <span className="text-13px font-semibold">Hapus</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Anda yakin ingin menghapus data Kelas?</DialogTitle>
                <DialogDescription className="text-sm pt-4">
                  Pastikan Anda berhati-hati saat menghapus data kelas, karena perubahan ini tidak
                  dapat dibatalkan atau dipulihkan dengan mudah. Kami sangat menyarankan Anda untuk
                  memeriksa dengan cermat sebelum melanjutkan penghapusan, agar tidak terjadi dampak
                  yang tidak diinginkan.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant={'ghost'}
                  className="text-xs bg-white shadow-none font-semibold border-none"
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    setDialogOpen(false)
                  }}
                >
                  CANCEL
                </Button>
                {data.list.length > 0 && (
                  <Button
                    variant={'ghost'}
                    className="text-xs bg-white shadow-none font-semibold border-none text-red-600 hover:text-red-600"
                    onClick={destroyData}
                    disabled={processing}
                  >
                    {processing ? <Spinner /> : 'HAPUS'}
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Header>
        <div className="p-6">
          <h1 className="text-18px leading-24 font-medium">Daftar Kelas Yang Tersedia</h1>
          <div className="mt-2 flex flex-col gap-2">
            <p className="text-12px text-black/70">
              Aplikasi ini menyediakan daftar kelas yang dapat dipilih untuk mengikuti ujian online
              berbasis komputer (CBT).
            </p>
            <p className="text-12px text-black/70">
              Setiap kelas dilengkapi dengan soal-soal terkini dan terstruktur untuk membantu
              meningkatkan pemahaman serta persiapan Anda. Pilih kelas dan mata pelajaran yang
              sesuai, lalu mulai ujian berdasarkan kebutuhan belajar Anda.
            </p>
          </div>
          <DataTableAdminKelas data={kelas} state={{ setIds: setData }} />
        </div>
      </div>
    </AdminLayout>
  )
}
