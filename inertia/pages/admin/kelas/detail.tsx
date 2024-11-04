import React from 'react'
import { Head, useForm, usePage, Link } from '@inertiajs/react'
import { AdminLayout } from '@/layouts/admin'
import { Label } from '@/shadcn/label'
import { Input } from '@/shadcn/input'
import { Button } from '@/shadcn/button'
import { RoutesType } from '@/types/route'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/select'
import { ChevronLeft } from 'lucide-react'
import { MataPelajaranType } from '@/types/mata_pelajaran'
import { ErrorType } from '@/types/errors'

export default function DashboardAdminCreateKelas({
  TahunAjaran,
  mataPelajaran,
}: {
  TahunAjaran: string[]
  mataPelajaran: MataPelajaranType
}) {
  const errors: any = usePage().props.errors
  const routes = usePage().props.routes as RoutesType

  const [ERROR, SETERROR] = React.useState<ErrorType | undefined>()

  const { data, setData, processing, reset, patch } = useForm({
    name: mataPelajaran.name,
    tahunAjaran: mataPelajaran.tahunAjaran,
    tingkat: mataPelajaran.tingkat,
    semester: mataPelajaran.semester,
  })

  React.useEffect(() => {
    SETERROR(errors)
  }, [errors])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    patch(`${routes.as['admin.matapelajaran.update']}?id=${mataPelajaran.id}`, {
      onSuccess: () => reset('name', 'tahunAjaran', 'tingkat', 'semester'),
    })
  }

  return (
    <AdminLayout title="Mata Pelajaran">
      <Head title="Panel Admin Buat Mata Pelajaran" />
      <Link
        href={routes.as['admin.matapelajaran.page']}
        className="underline text-sm flex items-center p-0 m-0 max-w-max mb-4 gap-1"
      >
        <ChevronLeft className="h-4 max-w-max" />
        <span>Kembali</span>
      </Link>
      <h1 className="font-medium text-lg">Buat Kelas</h1>
      <p className="text-sm">Buat mata pelajaran baru yang ingin diuji.</p>

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
              setData('tahunAjaran', value)
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
          {ERROR?.tahunAjaran && <p className="text-xs text-red-600">* {ERROR?.tahunAjaran[0]}</p>}
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="tingkat">Tingkat</Label>
          <Select
            name="tingkat"
            value={data.tingkat.toString()}
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
          <Select
            name="semester"
            value={data.semester.toString()}
            onValueChange={(value: string) => {
              setData('semester', parseInt(value))
              SETERROR((prev: any) => ({ ...prev, semester: undefined }))
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[...Array(2)].map((_, index: number) => {
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
          {ERROR?.semester && <p className="text-xs text-red-600">* {ERROR?.semester[0]}</p>}
        </div>
        <Button
          type="submit"
          className={`max-w-max bg-blue-600 hover:bg-blue-700 ${processing && 'opacity-25'}`}
          disabled={processing}
        >
          Perbarui
        </Button>
      </form>
    </AdminLayout>
  )
}
