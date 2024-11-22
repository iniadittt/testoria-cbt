import { Head, Link, usePage } from '@inertiajs/react'
import { Button } from '@/shadcn/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shadcn/table'

interface TeamType {
  name: string
  role: string
}

export default function Home({ team }: { team: TeamType[] }) {
  const { routes }: any = usePage().props
  return (
    <>
      <Head title="Halaman Utama" />
      <div className="container h-screen flex flex-col justify-center items-center gap-2">
        <h1 className="font-semibold text-xl">TESTORIA CBT</h1>
        <Table className="max-w-sm mx-auto my-8">
          <TableHeader>
            <TableRow className="text-13px bg-gray-100 font-bold">
              <TableHead>Nama</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((user: TeamType) => (
              <TableRow>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant={'ghost'} asChild>
          <Link
            href={routes.as['auth.login.page']}
            className="bg-blue-600 py-2 px-4 rounded mt-4 text-gray-100 hover:text-gray-100 hover:bg-blue-700 duration-200 hover:duration-200"
          >
            Login
          </Link>
        </Button>
      </div>
    </>
  )
}
