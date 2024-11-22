import React from 'react'
import { Head } from '@inertiajs/react'
import { AdminLayout } from '@/layouts/admin'

export default function DashboardAdmin() {
  return (
    <AdminLayout title="Dashboard">
      <Head title="Panel Admin" />
      <div className="p-6">
        <h1>TESTORIA CBT ADMIN PANEL</h1>
      </div>
    </AdminLayout>
  )
}
