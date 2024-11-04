import { BookOpen, BookA, Grip, NotebookText, Settings2, Users } from 'lucide-react'

export const AdminDataSidebar = {
  // Platform
  navMain: [
    {
      title: 'Panel',
      url: 'admin.page',
      icon: Grip,
      isActive: false,
      items: [
        {
          title: 'Dashboard',
          url: 'admin.page',
        },
        {
          title: 'Aktivitas',
          url: '#',
        },
        {
          title: 'Notifikasi',
          url: '#',
        },
      ],
    },
    {
      title: 'Akademik',
      url: '#',
      icon: BookA,
      items: [
        {
          title: 'Mata Pelajaran',
          url: 'admin.matapelajaran.page',
        },
        {
          title: 'Kelas',
          url: 'admin.kelas.page',
        },
      ],
    },
    {
      title: 'Bank Soal',
      url: '#',
      icon: NotebookText,
      items: [
        {
          title: 'List Soal',
          url: '#',
        },
      ],
    },
    {
      title: 'Ujian',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Ujian',
          url: '#',
        },
        {
          title: 'Nilai',
          url: '#',
        },
      ],
    },
    {
      title: 'Pengaturan',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Umum',
          url: '#',
        },
      ],
    },
  ],

  // Projects
  projects: [
    {
      name: 'Pengguna',
      url: '#',
      icon: Users,
    },
  ],
}
