import React from 'react'
import { Head } from '@inertiajs/react'
import { AdminLayout } from '@/layouts/admin'
import { DataTableAdminMataPelajaran } from '@/components/datatables/admin-matapelajaran'

export default function DashboardAdmin() {
  return (
    <AdminLayout title="Dashboard">
      <Head title="Panel Admin" />
    </AdminLayout>
  )
}
