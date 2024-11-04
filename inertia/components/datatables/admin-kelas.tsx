'use client'

import * as React from 'react'
import { Link, usePage } from '@inertiajs/react'
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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

export function DataTableAdminKelas({ data }: { data: KelasType[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const routes = usePage().props.routes as RoutesType

  const columns: ColumnDef<KelasType>[] = [
    {
      accessorKey: 'kode',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="ml-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Kode Kelas
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="ml-4 capitalize">{row.getValue('kode')}</div>,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nama Kelas
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'mataPelajaran',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nama Mata Pelajaran
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const mataPelajaran = row.getValue('mataPelajaran') as { id: number; name: string }
        const mataPelajaranName = mataPelajaran.name
        return <div className="capitalize">{mataPelajaranName}</div>
      },
    },
    {
      accessorKey: 'guru',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Guru
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const guru = row.getValue('guru') as { id: number; fullName: string }
        const guruName = guru.fullName
        return <div className="capitalize">{guruName}</div>
      },
    },
    {
      accessorKey: 'createdByUser',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Dibuat Oleh
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const createdBy = row.getValue('createdByUser') as { id: number; fullName: string }
        const fullName = createdBy.fullName
        const createdAt = new Date(row.original.createdAt)
        const formattedCreatedAt = `${createdAt.getUTCFullYear()}-${String(createdAt.getUTCMonth() + 1).padStart(2, '0')}-${String(createdAt.getUTCDate()).padStart(2, '0')} ${String(createdAt.getUTCHours()).padStart(2, '0')}:${String(createdAt.getUTCMinutes()).padStart(2, '0')}:${String(createdAt.getUTCSeconds()).padStart(2, '0')}`
        return (
          <div>
            <div className="capitalize text-sm">{fullName}</div>
            <div className="text-sm">{formattedCreatedAt}</div>
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
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="w-full text-sm py-1.5 text-left px-2 cursor-pointer hover:bg-gray-100 rounded hover:duration-75 duration-75"
                asChild
              >
                <Link href={`${routes.as['admin.kelas.detail']}?id=${data.id}`}>Ubah</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem className="cursor-pointer">Hapus</DropdownMenuItem> */}

              <Dialog>
                <DialogTrigger className="mt-1 w-full text-sm py-1.5 text-left px-2 cursor-pointer hover:bg-gray-100 rounded hover:duration-75 duration-75">
                  Hapus
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yakin ingin menghapus data Mata Pelajaran?</DialogTitle>
                    <DialogDescription>
                      <p>Menghapus mata pelajaran dengan data sebagai berikut</p>
                      {/* <div className="mt-2">
                        <p>
                          Nama Mata Pelajaran: <span className="font-semibold">{data.name}</span>
                        </p>
                        <p>
                          Tahun Ajaran: <span className="font-semibold">{data.tahunAjaran}</span>
                        </p>
                        <p>
                          Tingkat: <span className="font-semibold">{data.tingkat}</span>
                        </p>
                        <p>
                          Semester: <span className="font-semibold">{data.semester}</span>
                        </p>
                      </div> */}
                      <Button variant="destructive" className="mt-4">
                        Hapus Mata Pelajaran
                      </Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

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

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-2 py-4">
        <Input
          placeholder="Cari kelas berdasarkan nama..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="w-full lg:max-w-sm"
        />
        <DropdownMenu>
          <div className="w-full flex justify-end gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href={routes.as['admin.kelas.create']}>Tambah Kelas</Link>
            </Button>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="">
                Kolom <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  const columnNames: Record<string, string> = {
                    kode: 'Kode Kelas',
                    name: 'Nama Kelas',
                    mataPelajaran: 'Nama Mata Pelajaran',
                    createdByUser: 'Dibuat Oleh',
                  }
                  const text = columnNames[column.id] || column.id
                  return (
                    <DropdownMenuCheckboxItem
                      key={text}
                      className="capitalize cursor-pointer"
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Tidak ada mata pelajaran.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total {table.getFilteredRowModel().rows.length} data mata pelajaran.
        </div>
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
