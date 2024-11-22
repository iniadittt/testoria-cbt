import React, { useState, useEffect } from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/layouts/admin'
import { Header } from '@/components/header'
import { RoutesType } from '@/types/route'
import { Label } from '@/shadcn/label'
import { Input } from '@/shadcn/input'
import { Button } from '@/shadcn/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/select'

// =================================================================
// Interface
// =================================================================

interface ErrorType {
  name: string[] | undefined
  tahunAjaran: string[] | undefined
  tingkat: string[] | undefined
  semester: string[] | undefined
}

interface DataType {
  name: string
  tahunAjaran: string
  tingkat: number
  semester: number
}

// =================================================================
// Component
// =================================================================

export default function DashboardAdminCreateMataPelajaran({
  TahunAjaran,
}: {
  TahunAjaran: string[]
}) {
  const errors: any = usePage().props.errors
  const routes = usePage().props.routes as RoutesType

  const [ERROR, SETERROR] = useState<ErrorType | undefined>()

  useEffect(() => SETERROR(errors), [errors])

  const { data, setData, processing, reset, post } = useForm<DataType>({
    name: '',
    tahunAjaran: '',
    tingkat: 0,
    semester: 0,
  })

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    post(routes.as['admin.matapelajaran.store'], {
      onSuccess: () => reset('name', 'tahunAjaran', 'tingkat', 'semester'),
    })
  }

  return (
    <AdminLayout title="Mata Pelajaran">
      <Head title="Buat Mata Pelajaran - Panel Admin" />
      <Header
        title={'Buat Mata Pelajaran'}
        back={true}
        href="admin.matapelajaran.page"
        refresh={true}
      >
        &nbsp;
      </Header>
      <div className="p-6">
        <h1 className="text-18px leading-24 font-medium">Buat Mata Pelajaran</h1>
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-12px text-black/70">
            Gunakan aplikasi ini untuk menambahkan mata pelajaran baru yang akan tersedia untuk
            ujian online berbasis komputer (CBT).
          </p>
          <p className="text-12px text-black/70">
            Anda dapat menyesuaikan setiap mata pelajaran dengan topik dan soal yang sesuai,
            sehingga peserta dapat belajar dan mempersiapkan diri dengan baik. Buat mata pelajaran
            yang diinginkan dan sesuaikan kebutuhan ujian secara mudah.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mt-8 w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 grid grid-cols-1 gap-6"
        >
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Nama Mata Pelajaran</Label>
            <Input
              type="text"
              id="name"
              placeholder="Masukkan nama mata pelajaran"
              value={data.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setData('name', event.target.value)
                SETERROR((prev: any) => ({ ...prev, name: undefined }))
              }}
            />
            {ERROR?.name && <p className="text-xs text-red-600">* {ERROR?.name[0]}</p>}
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="tahunAjaran">Tahun Ajaran</Label>
            <Select
              name="tahunAjaran"
              value={data.tahunAjaran}
              onValueChange={(value: string) => {
                const semester = value.includes('Ganjil') ? 1 : value.includes('Genap') ? 2 : 0
                setData((prev) => ({ ...prev, tahunAjaran: value, semester }))
                SETERROR((prev: any) => ({ ...prev, tahunAjaran: undefined }))
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih tahun ajaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TahunAjaran.map((tahun) => {
                    return (
                      <SelectItem key={tahun} value={tahun} className="cursor-pointer">
                        {tahun}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            {ERROR?.tahunAjaran && (
              <p className="text-xs text-red-600">* {ERROR?.tahunAjaran[0]}</p>
            )}
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="tingkat">Tingkat</Label>
            <Select
              name="tingkat"
              onValueChange={(value: string) => {
                setData('tingkat', parseInt(value))
                SETERROR((prev: any) => ({ ...prev, tingkat: undefined }))
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih tingkat" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[...Array(10)].map((_, index: number) => {
                    const displayIndex = index + 1
                    return (
                      <SelectItem
                        key={displayIndex}
                        value={displayIndex.toString()}
                        className="cursor-pointer"
                      >
                        {displayIndex}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            {ERROR?.tingkat && <p className="text-xs text-red-600">* {ERROR?.tingkat[0]}</p>}
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="semester">Semester</Label>
            <Input
              type="text"
              id="semester"
              placeholder="Pilih tahun ajaran terlebih dahulu"
              value={data.semester > 0 ? data.semester : 'Pilih tahun ajaran terlebih dahulu'}
              className="font-medium bg-gray-200"
              disabled
            />
            {ERROR?.semester && <p className="text-xs text-red-600">* {ERROR?.semester[0]}</p>}
          </div>

          <Button
            type="submit"
            variant={'default'}
            size={'sm'}
            className={`max-w-max text-13px text-white bg-blue-600 hover:bg-blue-700 ${processing && 'opacity-25'}`}
            disabled={processing}
          >
            Tambah
          </Button>
        </form>
      </div>
    </AdminLayout>
  )
}
