import { Link, usePage } from '@inertiajs/react'

export default function Home() {
  const { routes }: any = usePage().props

  return (
    <div className="container h-screen flex flex-col justify-center items-center gap-2">
      <h1 className="font-semibold text-xl">TESTORIA CBT</h1>
      <p>Team</p>
      <ul className="list-disc">
        <li>Aditya Bayu</li>
      </ul>
      <Link
        href={routes.as['auth.login.page']}
        className="bg-blue-600 py-2 px-4 rounded text-gray-100 mt-4 hover:bg-blue-700 duration-200 hover:duration-200"
      >
        Login
      </Link>
    </div>
  )
}
