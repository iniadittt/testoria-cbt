import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/layouts/admin'
import { NotificationType } from '@/types/flash'
import { KelasType } from '@/types/kelas'
import { DataTableAdminKelas } from '@/components/datatables/admin-kelas'

export default function DashboardAdminMataPelajaran({ kelas }: { kelas: KelasType[] }) {
  const notification = usePage().props.notification as NotificationType
  return (
    <AdminLayout title="Kelas">
      <Head title="Panel Admin Kelas" />
      {notification && (
        <p
          className={`text-sm p-3 rounded mb-4 ${notification.type === 'success' ? 'bg-green-300 text-green-700' : 'bg-red-200 text-red-600'}`}
        >
          {notification.message}
        </p>
      )}
      <h1 className="font-medium text-lg">Kelas</h1>
      <p className="font-normal text-sm">Management kelas yang ada.</p>
      <DataTableAdminKelas data={kelas} />
    </AdminLayout>
  )
}
