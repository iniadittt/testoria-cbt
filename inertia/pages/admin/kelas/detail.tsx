import React from 'react'
import { Head, useForm, usePage, Link } from '@inertiajs/react'
import { AdminLayout } from '@/layouts/admin'
import { Header } from '@/components/header'
import { RoutesType } from '@/types/route'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Label } from '@/shadcn/label'
import { Input } from '@/shadcn/input'
import { Button } from '@/shadcn/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shadcn/command'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/popover'

// =================================================================
// Interface
// =================================================================

interface ErrorType {
  name: string[] | undefined
  guruId: string[] | undefined
}

interface OpenType {
  guru: boolean
}

interface GuruType {
  id: number
  fullName: string
}

interface MataPelajaranType {
  id: number
  name: string
}

interface KelasType {
  id: number
  kode: string
  name: string
  guruId: number
  mataPelajaranId: number
  createdBy: number
  updatedBy: number | null
  createdAt: string
  updatedAt: string
  guru: GuruType
  mataPelajaran: MataPelajaranType
}

interface DataType {
  name: string
  guruId: number | null
}

// =================================================================
// Component
// =================================================================

export default function DashboardAdminCreateKelas({
  kelas,
  guru,
}: {
  kelas: KelasType
  guru: GuruType[]
}) {
  const errors: any = usePage().props.errors
  const routes = usePage().props.routes as RoutesType

  const [ERROR, SETERROR] = React.useState<ErrorType | undefined>()
  const [open, setOpen] = React.useState<OpenType>({
    guru: false,
  })
  const { data, setData, processing, reset, patch } = useForm<DataType>({
    name: kelas.name,
    guruId: kelas.guruId,
  })

  React.useEffect(() => {
    SETERROR(errors)
  }, [errors])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    patch(`${routes.as['admin.kelas.update']}?id=${kelas.id}`, {
      onSuccess: () => reset('name', 'guruId'),
    })
  }

  return (
    <AdminLayout title="Kelas">
      <Head title="Detail Kelas - Panel Admin" />
      <Header
        title={'Detail Kelas'}
        back={true}
        href="admin.kelas.page"
        refresh={true}
        refreshUrl={`${routes.as['admin.kelas.detail']}?id=${kelas.id}`}
      >
        &nbsp;
      </Header>
      <div className="p-6">
        <h1 className="text-18px leading-24 font-medium">Detail Kelas</h1>
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-12px text-black/70">
            Halaman ini menampilkan detail lengkap mengenai kelas yang tersedia untuk ujian online
            berbasis komputer (CBT).
          </p>
          <p className="text-12px text-black/70">
            Anda dapat melihat informasi seperti nama kelas, tahun ajaran, semester, dan tingkat
            untuk setiap kelas. Pastikan kelas sudah sesuai dengan kebutuhan dan tujuan
            pembelajaran.
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
              placeholder="Masukkan nama kelas"
              value={kelas.kode}
              className="font-semibold bg-gray-300"
              disabled
            />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Nama Kelas</Label>
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
                  className="w-full justify-between"
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
            <Label htmlFor="matapelajaran">Mata Pelajaran</Label>
            <Input
              type="text"
              id="matapelajaran"
              placeholder="Masukkan nama mata pelajaran"
              value={kelas.mataPelajaran.name}
              className="font-semibold bg-gray-300"
              disabled
            />
          </div>

          <Button
            type="submit"
            className={`max-w-max bg-blue-600 hover:bg-blue-700 ${processing && 'opacity-25'}`}
            disabled={processing}
          >
            Perbarui
          </Button>
        </form>
      </div>
    </AdminLayout>
  )
}
