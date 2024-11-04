import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/layouts/admin'
import { DataTableAdminMataPelajaran } from '@/components/datatables/admin-matapelajaran'
import { MataPelajaranType } from '@/types/mata_pelajaran'
import { NotificationType } from '@/types/flash'

export default function DashboardAdminMataPelajaran({
  mataPelajaran,
}: {
  mataPelajaran: MataPelajaranType[]
}) {
  const notification = usePage().props.notification as NotificationType
  return (
    <AdminLayout title="Mata Pelajaran">
      <Head title="Panel Admin Mata Pelajaran" />
      {notification && (
        <p
          className={`text-sm p-3 rounded mb-4 ${notification.type === 'success' ? 'bg-green-300 text-green-700' : 'bg-red-200 text-red-600'}`}
        >
          {notification.message}
        </p>
      )}
      <h1 className="font-medium text-lg">Mata Pelajaran</h1>
      <p className="font-normal text-sm">Management mata pelajaran yang ingin diuji.</p>
      <DataTableAdminMataPelajaran data={mataPelajaran} />
    </AdminLayout>
  )
}
