import React, { useState, useEffect } from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/layouts/admin'
import { Header } from '@/components/header'
import { NotificationType } from '@/types/flash'
import { cn } from '@/lib/utils'
import { GenerateKodeRandom } from '@/lib/generate_kode_random'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Label } from '@/shadcn/label'
import { Input } from '@/shadcn/input'
import { Button } from '@/shadcn/button'
import { RoutesType } from '@/types/route'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/popover'

// =================================================================
// Interface
// =================================================================

interface ErrorType {
  kodeKelas: string[] | undefined
  name: string[] | undefined
  guruId: string[] | undefined
  mataPelajaranId: string[] | undefined
}

interface GuruType {
  id: number
  fullName: string
}

interface MataPelajaranType {
  id: number
  name: string
  tahunAjaran: string
  tingkat: number
  semester: number
  isActive: boolean
  isDelete: boolean
  createdBy: number
  updatedBy: number | null
  deletedBy: number | null
  createdAt: Date | string
  updatedAt: Date | string | null
  deletedAt: Date | string | null
}

interface MataPelajaranSelectedType {
  tahunAjaran: string | null
  tingkat: number | null
  semester: number | null
}

interface OpenType {
  guru: boolean
  mataPelajaran: boolean
}

interface DataType {
  kodeKelas: string
  name: string
  guruId: number | null
  mataPelajaranId: number | null
}

// =================================================================
// Component
// =================================================================

export default function DashboardAdminCreateMataPelajaran({
  guru,
  mataPelajaran,
}: {
  guru: GuruType[]
  mataPelajaran: MataPelajaranType[]
}) {
  const errors: any = usePage().props.errors
  const routes = usePage().props.routes as RoutesType

  const [open, setOpen] = useState<OpenType>({
    guru: false,
    mataPelajaran: false,
  })

  const [ERROR, SETERROR] = useState<ErrorType>()
  const [mataPelajaranSelected, setMataPelajaranSelected] = useState<MataPelajaranSelectedType>({
    tahunAjaran: null,
    tingkat: null,
    semester: null,
  })

  useEffect(() => SETERROR(errors), [errors])

  const { data, setData, processing, reset, post } = useForm<DataType>({
    kodeKelas: GenerateKodeRandom(8),
    name: '',
    guruId: null,
    mataPelajaranId: null,
  })

  useEffect(() => {
    const PELAJARAN = mataPelajaran.find((item) => item.id === data.mataPelajaranId)
    setMataPelajaranSelected((prev) => ({
      ...prev,
      tahunAjaran: PELAJARAN?.tahunAjaran || null,
      tingkat: PELAJARAN?.tingkat || null,
      semester: PELAJARAN?.semester || null,
    }))
  }, [data.mataPelajaranId])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    post(routes.as['admin.kelas.store'], {
      onSuccess: () => reset('name', 'mataPelajaranId', 'kodeKelas', 'guruId'),
    })
  }

  return (
    <AdminLayout title="Kelas">
      <Head title="Buat Kelas - Panel Admin" />
      <Header title={'Buat Kelas'} back={true} href="admin.kelas.page" refresh={true}>
        &nbsp;
      </Header>
      <div className="p-6 grid grid-cols-1">
        <h1 className="text-18px leading-24 font-medium">Buat Kelas</h1>
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-12px text-black/70">
            Gunakan aplikasi ini untuk menambahkan kelas baru yang akan tersedia untuk ujian online
            berbasis komputer (CBT).
          </p>
          <p className="text-12px text-black/70">
            Anda dapat menyesuaikan setiap kelas dengan topik dan soal yang sesuai, sehingga peserta
            dapat belajar dan mempersiapkan diri dengan baik. Buat kelas yang diinginkan dan
            sesuaikan kebutuhan ujian secara mudah.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mt-8 w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 grid grid-cols-1 gap-6"
        >
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="kode">Kode kelas</Label>
            <Input
              type="text"
              id="kode"
              placeholder="Kode kelas"
              value={data.kodeKelas}
              disabled
              className="bg-gray-300 font-semibold"
            />
            {ERROR?.kodeKelas && <p className="text-xs text-red-600">* {ERROR?.kodeKelas[0]}</p>}
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Nama kelas</Label>
            <Input
              type="text"
              id="name"
              placeholder="Masukkan nama kelas"
              value={data.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value.replace(/\s+/g, '')
                setData('name', value)
                SETERROR((prev: any) => ({ ...prev, name: undefined }))
              }}
            />
            {ERROR?.name && <p className="text-xs text-red-600">* {ERROR?.name[0]}</p>}
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="guru">Guru</Label>
            <Popover
              open={open.guru}
              onOpenChange={() => setOpen((prev: OpenType) => ({ ...prev, guru: !prev.guru }))}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open.guru}
                  className="w-full justify-between font-normal"
                >
                  {data.guruId
                    ? guru.find((item: GuruType) => item.id === data.guruId)?.fullName
                    : 'Pilih guru...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Pilih guru..." />
                  <CommandList>
                    <CommandEmpty>Data guru tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      {guru.map((item: any) => (
                        <CommandItem
                          key={item.id}
                          className="pr-4"
                          value={`${item.id.toString()}-${item.fullName.toString()}`}
                          onSelect={(currentValue) => {
                            const [id] = (currentValue.split('-') as [string, string]).map(
                              (v, i) => (i === 0 && !v ? '0' : v)
                            ) || ['0', '']
                            const idNumber: number = parseInt(id)
                            const value = data.guruId === idNumber ? null : idNumber
                            setData('guruId', value)
                            setOpen((prev) => ({ ...prev, guru: !prev.guru }))
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-0 h-4 w-4',
                              data.guruId === item.id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {item.fullName}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {ERROR?.guruId && <p className="text-xs text-red-600">* {ERROR?.guruId[0]}</p>}
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="mataPelajaran">Mata Pelajaran</Label>
            <Popover
              open={open.mataPelajaran}
              onOpenChange={() =>
                setOpen((prev: OpenType) => ({ ...prev, mataPelajaran: !prev.mataPelajaran }))
              }
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open.mataPelajaran}
                  className="w-full justify-between font-normal"
                >
                  {data.mataPelajaranId
                    ? mataPelajaran.find(
                        (item: MataPelajaranType) => item.id === data.mataPelajaranId
                      )?.name
                    : 'Pilih mata pelajaran...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Pilih mata pelajaran..." />
                  <CommandList>
                    <CommandEmpty>Data mata pelajaran tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      {mataPelajaran.map((item: MataPelajaranType) => (
                        <CommandItem
                          key={item.id}
                          className="pr-4"
                          value={`${item.id.toString()}-${item.name.toString()}`}
                          onSelect={(currentValue) => {
                            const [id] = (currentValue.split('-') as [string, string]).map(
                              (v, i) => (i === 0 && !v ? '0' : v)
                            ) || ['0', '']
                            const idNumber: number = parseInt(id)
                            const value = data.mataPelajaranId === idNumber ? null : idNumber
                            setData('mataPelajaranId', value)
                            setOpen((prev) => ({ ...prev, mataPelajaran: !prev.mataPelajaran }))
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-0 h-4 w-4',
                              data.mataPelajaranId === item.id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {ERROR?.mataPelajaranId && (
              <p className="text-xs text-red-600">* {ERROR.mataPelajaranId[0]}</p>
            )}
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="tahunAjaran">Tahun Ajarran</Label>
            <Input
              type="text"
              id="tahunAjaran"
              value={mataPelajaranSelected?.tahunAjaran || 'Pilih mata pelajaran terlebih dahulu'}
              disabled
              className="bg-gray-300 font-semibold"
            />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="tingkat">Tingkat</Label>
            <Input
              type="text"
              id="tingkat"
              value={mataPelajaranSelected?.tingkat || 'Pilih mata pelajaran terlebih dahulu'}
              disabled
              className="bg-gray-300 font-semibold"
            />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="semester">Semester</Label>
            <Input
              type="text"
              id="semester"
              value={mataPelajaranSelected?.semester || 'Pilih mata pelajaran terlebih dahulu'}
              disabled
              className="bg-gray-300 font-semibold"
            />
          </div>

          <Button
            type="submit"
            className={`max-w-max bg-blue-600 hover:bg-blue-700 ${processing && 'opacity-25'}`}
            disabled={processing}
          >
            Tambah
          </Button>
        </form>
      </div>
    </AdminLayout>
  )
}
