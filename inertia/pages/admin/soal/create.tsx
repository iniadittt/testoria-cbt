import React, { useState, useEffect } from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import { AdminLayout } from '@/layouts/admin'
import { Header } from '@/components/header'
import { RoutesType } from '@/types/route'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/popover'
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
import { Textarea } from '@/shadcn/textarea'
import Jawaban from '#models/jawaban'
import axios from 'axios'

// =================================================================
// Interface
// =================================================================

interface OpenType {
  type: boolean
  mataPelajaran: boolean
}

interface ErrorType {
  pertanyaan: string[] | undefined
  bobot: string[] | undefined
  mataPelajaranId: string[] | undefined
  file: string[] | undefined
  jawaban: string | string[] | undefined
}

interface DataType {
  pertanyaan: string
  type: 'pg' | 'multiple' | 'essai' | null
  bobot: number | null
  mataPelajaranId: number | null
  file: any | null
  jawaban: JawabanType[]
}

interface JawabanType {
  jawaban: string
  isKunci: boolean
  file: any | null
}

// =================================================================
// Component
// =================================================================

export default function DashboardAdminCreateSoal({ mataPelajaran }: { mataPelajaran: any[] }) {
  const errors: any = usePage().props.errors
  const routes = usePage().props.routes as RoutesType

  const questionType = [
    { value: 'pg', label: 'Pilihan Ganda' },
    { value: 'multiple', label: 'Multiple' },
    { value: 'essai', label: 'Essai' },
  ]

  const [open, setOpen] = useState<OpenType>({
    type: false,
    mataPelajaran: false,
  })

  const [value, setValue] = useState<{
    type: string | null
    mataPelajaran: number | null
  }>({
    type: null,
    mataPelajaran: null,
  })
  const [ERROR, SETERROR] = useState<ErrorType | undefined>()

  const [selectedFile, setSelectedFile] = useState<{ name: string; image: any | null }>({
    name: '',
    image: null,
  })

  const [IMAGE, SETIMAGE] = useState<any>()

  const { data, setData, processing, reset, post } = useForm<DataType>({
    pertanyaan: '',
    type: null,
    bobot: null,
    mataPelajaranId: null,
    file: null,
    jawaban: [{ jawaban: '', isKunci: false, file: null }],
  })

  useEffect(() => SETERROR(errors), [errors])
  useEffect(() => setData('type', value.type as DataType['type']), [value.type])
  useEffect(() => setData('mataPelajaranId', value.mataPelajaran), [value.mataPelajaran])
  useEffect(() => setData('file', selectedFile.image), [selectedFile.image])
  useEffect(() => setData('jawaban', [{ jawaban: '', isKunci: false, file: null }]), [data.type])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ data })
    // post(routes.as['admin.soal.store'])

    axios.post(routes.as['upload'], IMAGE).then((res) => {
      console.log('Axios response: ', res)
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const jawabanId: number = parseInt(key.split('jawaban')[1], 10)
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      if (key === 'pertanyaan') {
        setData('file', reader)
        const formData = new FormData()
        formData.append('file', event.target.files[0], event.target.files[0].name)
        SETIMAGE(formData)
      }
      if (key.startsWith('jawaban') && jawabanId) {
        setData((prev: DataType) => ({
          ...prev,
          jawaban: prev.jawaban.map((jawaban, index) =>
            index === jawabanId ? { ...jawaban, file: reader } : jawaban
          ),
        }))
      }
    }
  }

  return (
    <AdminLayout title="Soal">
      <Head title="Buat Soal - Panel Admin" />
      <Header title={'Buat Soal'} back={true} href="admin.soal.page" refresh={true}>
        &nbsp;
      </Header>
      <div className="p-6 grid grid-cols-1">
        <h1 className="text-18px leading-24 font-medium">Buat Soal</h1>
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-12px text-black/70">
            Gunakan aplikasi ini untuk menambahkan soal baru yang akan tersedia untuk ujian online
            berbasis komputer (CBT).
          </p>
          <p className="text-12px text-black/70">
            Anda dapat menyesuaikan setiap soal dengan topik dan soal yang sesuai, sehingga peserta
            dapat belajar dan mempersiapkan diri dengan baik. Buat soal yang diinginkan dan
            sesuaikan kebutuhan ujian secara mudah.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="type">Tipe Soal</Label>
            <Popover
              open={open.type}
              onOpenChange={() => setOpen((prev: OpenType) => ({ ...prev, type: !prev.type }))}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open.type}
                  className="w-full justify-between font-normal"
                >
                  {value.type
                    ? questionType.find((type) => type.value === value.type)?.label
                    : 'Pilih tipe soal...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="max-w-fit p-0 rounded-none shadow">
                <Command>
                  <CommandInput placeholder="Cari tipe soal..." />
                  <CommandList>
                    <CommandEmpty>Tipe soal tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      {questionType.map((type) => (
                        <CommandItem
                          key={type.value}
                          value={type.value}
                          onSelect={(currentValue: string) => {
                            setValue((prev) => ({
                              ...prev,
                              type: currentValue === value.type ? null : currentValue,
                            }))
                            setOpen((prev: OpenType) => ({ ...prev, type: !prev.type }))
                          }}
                        >
                          {type.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              value.type === type.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="bobot">Bobot Penilaian</Label>
            <Input
              type="text"
              id="bobot"
              placeholder="Masukkan bobot penilaian"
              value={data.bobot || 0}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = parseInt(event.target.value.replace(/\D/g, ''), 10)
                const maxValues = { essai: 100, pg: 3, multiple: 5 }
                const bobot = Math.min(value, maxValues[data.type || 'pg'] || value)
                setData('bobot', bobot)
                SETERROR((prev: any) => ({ ...prev, bobot: undefined }))
              }}
            />
            {ERROR?.bobot && <p className="text-xs text-red-600">* {ERROR?.bobot[0]}</p>}
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="mataPelajaran">Mata pelajaran</Label>
            <Popover
              open={open.mataPelajaran}
              onOpenChange={() =>
                setOpen((prev: OpenType) => ({
                  ...prev,
                  mataPelajaran: !prev.mataPelajaran,
                }))
              }
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open.mataPelajaran}
                  className="w-full justify-between font-normal overflow-hidden"
                >
                  {value.mataPelajaran
                    ? mataPelajaran.find(
                        (pelajaran) =>
                          parseInt(pelajaran.value.split('||')[1], 10) === value.mataPelajaran
                      )?.label
                    : 'Pilih mata pelajaran...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="max-w-fit p-0 rounded-none shadow">
                <Command>
                  <CommandInput placeholder="Cari mata pelajaran..." />
                  <CommandList>
                    <CommandEmpty>Mata pelajaran tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      {mataPelajaran.map((pelajaran: { label: string; value: number }) => (
                        <CommandItem
                          key={pelajaran.value}
                          value={pelajaran.value.toString()}
                          onSelect={(currentValue: string) => {
                            const val = parseInt(currentValue.split('||')[1], 10)
                            setValue((prev) => ({
                              ...prev,
                              mataPelajaran: val === value.mataPelajaran ? null : val,
                            }))
                            setOpen((prev: OpenType) => ({
                              ...prev,
                              mataPelajaran: !prev.mataPelajaran,
                            }))
                          }}
                        >
                          {pelajaran.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              value.mataPelajaran === pelajaran.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid w-full items-center gap-2">
            <Label>File Pertanyaan</Label>
            <div>
              <label
                htmlFor="picture"
                className="flex items-center gap-2 border shadow-sm rounded cursor-pointer"
              >
                <span className="cursor-pointer rounded-l px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 duration-150 hover:duration-150">
                  Pilih File
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  {selectedFile.name || 'Belum ada file yang dipilih'}
                </span>
              </label>
            </div>
            <input
              id="picture"
              type="file"
              className="hidden"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleFileChange(event, 'pertanyaan')
              }
            />
            {ERROR?.file && <p className="text-xs text-red-600">* {ERROR?.file[0]}</p>}
          </div>

          <div className="grid w-full items-center gap-2 xl:col-span-2">
            <Label htmlFor="pertanyaan">Pertanyaan</Label>
            <Textarea
              id="pertanyaan"
              placeholder="Masukkan pertanyaan..."
              className="resize-none h-36"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setData('pertanyaan', event.target.value)
              }
            />
            {ERROR?.pertanyaan && <p className="text-xs text-red-600">* {ERROR?.pertanyaan[0]}</p>}
          </div>

          {data.type && data.type !== 'essai' && (
            <div className="grid xl:col-span-2">
              <div className="w-full items-center gap-2 xl:col-span-3 flex mb-6">
                <Button
                  className="max-w-fit bg-green-600 hover:bg-green-700 duration-150 hover:duration-150"
                  onClick={() =>
                    setData('jawaban', [
                      ...data.jawaban,
                      { jawaban: '', isKunci: false, file: null },
                    ])
                  }
                >
                  [+] Tambah Jawaban
                </Button>
                <Button
                  className="max-w-fit bg-red-600 hover:bg-red-700 duration-150 hover:duration-150"
                  onClick={() =>
                    setData('jawaban', data.jawaban.slice(0, data.jawaban.length > 1 ? -1 : 1))
                  }
                >
                  [-] Kurang Jawaban
                </Button>
              </div>

              {data.jawaban.map((jwban: JawabanType, index: number) => (
                <div
                  key={index}
                  className="xl:col-span-3 grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6"
                >
                  <div className="grid w-full items-center gap-2 xl:col-span-2">
                    <Label htmlFor={`jawaban${index}`}>Jawaban {index + 1}</Label>
                    <Textarea
                      id={`jawaban${index}`}
                      placeholder={`Masukkan jawaban ${index + 1}...`}
                      className="resize-none h-36"
                      onChange={(event: any) => {
                        setData(
                          'jawaban',
                          data.jawaban.map((jwbn: JawabanType, idx: number) => ({
                            ...jwbn,
                            jawaban: idx === index ? event.target.value : jwban.jawaban,
                          }))
                        )
                      }}
                    />
                    {ERROR?.jawaban && (
                      <p className="text-xs text-red-600">* {ERROR?.jawaban[0]}</p>
                    )}
                  </div>

                  <div className="grid content-start gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <Label>File Jawaban {index + 1}</Label>
                      <div>
                        <label
                          htmlFor={`fileJawaban${index}`}
                          className="flex items-center gap-2 border shadow-sm rounded cursor-pointer"
                        >
                          <span className="cursor-pointer rounded-l px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 duration-150 hover:duration-150">
                            Pilih File
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            {selectedFile.name || 'Belum ada file yang dipilih'}
                          </span>
                        </label>
                      </div>
                      <input
                        id={`fileJawaban${index}`}
                        type="file"
                        className="hidden"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleFileChange(event, `jawaban${index}`)
                        }
                      />
                      {ERROR?.file && <p className="text-xs text-red-600">* {ERROR?.file[0]}</p>}
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <Label>Kunci Jawaban</Label>
                      <Select
                        value={jwban.isKunci ? 'yes' : 'no'}
                        onValueChange={(value) => {
                          let JAWABAN: JawabanType[] = []
                          switch (data.type) {
                            case 'pg':
                              JAWABAN = data.jawaban.map((jwbn: JawabanType, idx: number) => ({
                                ...jwbn,
                                isKunci: index === idx && value === 'yes' ? true : false,
                              }))
                              break
                            case 'multiple':
                              JAWABAN = data.jawaban.map((jwbn: JawabanType, idx: number) => {
                                if (idx === index) {
                                  return { ...jwbn, isKunci: value === 'yes' ? true : false }
                                } else {
                                  return jwbn
                                }
                              })
                              break
                            default:
                          }
                          setData('jawaban', JAWABAN)
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kunci jawaban" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Ya</SelectItem>
                          <SelectItem value="no">Tidak</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.type && data.type === 'essai' && (
            <div className="grid w-full items-center gap-2 xl:col-span-2">
              <Label htmlFor="jawabanEssai">Jawaban</Label>
              <Textarea
                id="jawabanEssai"
                placeholder="Masukkan jawaban essai..."
                className="resize-none h-36"
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setData('jawaban', [{ jawaban: event.target.value, isKunci: true, file: null }])
                }
              />
              {ERROR?.jawaban && <p className="text-xs text-red-600">* {ERROR?.jawaban[0]}</p>}
            </div>
          )}

          <Button
            type="submit"
            className={`max-w-max bg-blue-600 hover:bg-blue-700 ${processing && 'opacity-25'}`}
            disabled={
              processing &&
              !data.type &&
              !data.bobot &&
              !data.mataPelajaranId &&
              !data.pertanyaan &&
              !data.jawaban
            }
          >
            Tambah
          </Button>
        </form>
      </div>
    </AdminLayout>
  )
}
