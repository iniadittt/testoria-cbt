'use client'

import React, { useState, useEffect } from 'react'
import { Link, useForm, usePage } from '@inertiajs/react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ListFilter,
  MoreHorizontal,
} from 'lucide-react'
import { Button } from '@/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/shadcn/dropdown-menu'
import { Input } from '@/shadcn/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shadcn/table'
import { RoutesType } from '@/types/route'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/dialog'
import { KelasType } from '@/types/kelas'
import { Checkbox } from '@/shadcn/checkbox'
import { Months } from '@/constant/months'
import { Label } from '@/shadcn/label'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/shadcn/context-menu'

type FilterType = 'kode' | 'name' | 'mataPelajaranName' | 'guruFullName'

export function DataTableAdminKelas({ data, state }: { data: KelasType[]; state?: any }) {
  const routes = usePage().props.routes as RoutesType

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    state.setIds(
      'list',
      Object.keys(rowSelection)
        .map((row) => parseInt(row, 10))
        .map((idx) => data[idx].id)
    )
  }, [rowSelection])

  const columns: ColumnDef<KelasType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="ml-2"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="ml-2"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'kode',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-transparent"
          >
            Kode Kelas
            {column.getIsSorted() === 'asc' && <ArrowUp className="h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="h-4 w-4" />}
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="ml-4 capitalize whitespace-nowrap">{row.getValue('kode')}</div>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-transparent"
          >
            Nama Kelas
            {column.getIsSorted() === 'asc' && <ArrowUp className="h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="h-4 w-4" />}
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="ml-4 capitalize whitespace-nowrap">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'mataPelajaranName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-transparent"
          >
            Nama Mata Pelajaran
            {column.getIsSorted() === 'asc' && <ArrowUp className="h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="h-4 w-4" />}
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="ml-4 capitalize whitespace-nowrap">{row.getValue('mataPelajaranName')}</div>
      ),
    },
    {
      accessorKey: 'guruFullName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-transparent"
          >
            Guru
            {column.getIsSorted() === 'asc' && <ArrowUp className="h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="h-4 w-4" />}
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="ml-4 capitalize whitespace-nowrap">{row.getValue('guruFullName')}</div>
      ),
    },
    {
      accessorKey: 'createdByUser',
      header: () => {
        return (
          <Button variant="ghost" className="hover:bg-transparent">
            Dibuat oleh
          </Button>
        )
      },
      cell: ({ row }) => {
        const createdBy = row.getValue('createdByUser') as { id: number; fullName: string }
        const fullName = createdBy.fullName
        const createdAt = new Date(row.original.createdAt)
        const formattedDateCreatedAt = `${String(createdAt.getUTCDate()).padStart(2)} ${Months[createdAt.getUTCMonth()]}, ${createdAt.getUTCFullYear()}`
        return (
          <div className="ml-4">
            <div className="capitalize text-13px whitespace-nowrap">{fullName}</div>
            <div className="text-13px whitespace-nowrap">{formattedDateCreatedAt}</div>
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-4 p-0 hover:bg-transparent">
                <span className="sr-only">Aksi</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-0 py-1.5 rounded-none">
              <DropdownMenuItem
                className="w-full text-left py-1.5 px-3 m-0 cursor-pointer rounded-none hover:bg-gray-100 hover:duration-75 duration-75"
                asChild
              >
                <Link className="text-sm" href={`${routes.as['admin.kelas.detail']}?id=${data.id}`}>
                  Ubah
                </Link>
              </DropdownMenuItem>
              <Dialog>
                <DialogTrigger className="w-full text-sm py-1.5 text-left px-3 m-0 cursor-pointer rounded-none hover:bg-gray-100 hover:duration-75 duration-75">
                  Hapus
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-xl">Yakin ingin menghapus data Kelas?</DialogTitle>
                    <div className="text-sm font-normal">
                      <div className="flex flex-col gap-4">
                        <p>Menghapus kelas dengan data sebagai berikut:</p>
                        <div>
                          <p>
                            Kode kelas: <span className="font-semibold">{data.kode}</span>
                          </p>
                          <p>
                            Nama kelas: <span className="font-semibold">{data.name}</span>
                          </p>
                          <p>
                            Nama mata pelajaran:{' '}
                            <span className="font-semibold">{data.mataPelajaran.name}</span>
                          </p>
                          <p>
                            Guru: <span className="font-semibold">{data.guru.fullName}</span>
                          </p>
                        </div>
                        <p>
                          Pastikan data yang ingin dihapus sudah benar.{' '}
                          <span className="font-semibold text-red-600">
                            Data yang dihapus tidak dapat dikembalikan dan dapat menyebabkan
                            hilangnya informasi penting.
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button
                          variant="outline"
                          size="default"
                          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                            handlerDelete(event, data.id)
                          }
                          className="border-none shadow-none text-red-600 duration-75 hover:bg-gray-100 hover:text-red-600 hover:duration-75"
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const [filter, setFilter] = useState<FilterType | ''>('')
  const [textFilter, setTextFilter] = useState<string>('')

  useEffect(() => {
    setTextFilter('')
    listFilterArgs.forEach((fltr: FilterType) => table.getColumn(fltr)?.setFilterValue(undefined))
  }, [filter])

  useEffect(() => table.getColumn(filter)?.setFilterValue(textFilter || undefined), [textFilter])

  const { delete: destroy } = useForm()

  const handlerDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault()
    destroy(`${routes.as['admin.kelas.destroy']}?id=${id}`)
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const listFilterArgs: FilterType[] = ['kode', 'name', 'mataPelajaranName', 'guruFullName']

  const filterPlaceholders: any = {
    kode: 'Cari mata pelajaran berdasarkan kode kelas...',
    name: 'Cari mata pelajaran berdasarkan nama kelas...',
    mataPelajaranName: 'Cari mata pelajaran berdasarkan nama mata pelajaran...',
    guruFullName: 'Cari mata pelajaran berdasarkan nama guru...',
  }

  return (
    <div className="grid grid-cols-1">
      <div className="flex mt-6 w-full">
        <div className="w-full flex">
          <DropdownMenu>
            <div className="flex justify-start gap-2">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="max-w-fit rounded-none shadow-none border-0 border-t border-gray-200 flex justify-between"
                >
                  <ListFilter size={18} />
                  <span className="ml-2 my-auto">
                    {(() => {
                      const getFilterText = (filter: FilterType | string): string =>
                        ({
                          kode: 'Kode kelas',
                          name: 'Nama kelas',
                          mataPelajaranName: 'Nama mata pelajaran',
                          guruFullName: 'Nama guru',
                        })[filter] || 'Filter'
                      return getFilterText(filter)
                    })()}
                  </span>{' '}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={1}
                className="w-[200px] p-0 py-2 rounded-none -my-[1px] relative z-10"
              >
                <DropdownMenuRadioGroup
                  value={filter}
                  onValueChange={(value: any) => setFilter(value)}
                >
                  {listFilterArgs.map((option: string) => {
                    const columnNames: Record<string, string> = {
                      kode: 'Kode kelas',
                      name: 'Nama kelas',
                      mataPelajaranName: 'Nama mata pelajaran',
                      guruFullName: 'Nama guru',
                    }
                    const text: string = columnNames[option] || option
                    return (
                      <DropdownMenuRadioItem
                        key={option}
                        value={option}
                        className="cursor-pointer rounded-none pr-5"
                      >
                        {text}
                      </DropdownMenuRadioItem>
                    )
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>
          {filter ? (
            <Input
              placeholder={filterPlaceholders[filter]}
              value={(table.getColumn(filter)?.getFilterValue() as string) || ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTextFilter(event.target.value)
              }
              className="w-full rounded-none shadow-none border-0 border-t placeholder:text-gray-400 placeholder:text-13px relative z-10"
            />
          ) : (
            <div className="w-full rounded-none shadow-none border-0 border-t" />
          )}
        </div>
        <DropdownMenu>
          <div className="flex justify-end gap-2">
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-none shadow-none border-0 border-t border-gray-200"
              >
                Kolom <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-0 py-2 rounded-none -my-1">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  const columnNames: Record<string, string> = {
                    kode: 'Kode kelas',
                    name: 'Nama kelas',
                    mataPelajaranName: 'Nama mata pelajaran',
                    guruFullName: 'Nama guru',
                    createdByUser: 'Dibuat oleh',
                  }
                  const text = columnNames[column.id] || column.id
                  return (
                    <DropdownMenuCheckboxItem
                      key={text}
                      className="cursor-pointer rounded-none pr-5"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {text}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      </div>
      <div className="border-y overflow-x-auto">
        <Table className="p-0">
          <TableHeader className="bg-gray-100/90">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="relative">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={header.id === 'actions' ? 'text-center' : ''}
                  >
                    {!header.isPlaceholder &&
                      flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => {
                    const title = cell.id.split('_')[1]
                    return (
                      <TableCell
                        key={cell.id}
                        className={`px-2 py-1 align-top ${title === 'actions' ? 'text-center' : 'text-left'}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Tidak ada data kelas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex items-center justify-end space-x-2 py-4">
        <p className="flex-1 text-muted-foreground text-13px">
          Total {table.getFilteredRowModel().rows.length} data kelas.
        </p>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  )
}
