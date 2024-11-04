import React from 'react'
import { Head, usePage, useForm } from '@inertiajs/react'
import { RoutesType } from '@/types/route'
import { NotificationType } from '@/types/flash'
import { LoginType } from '@/types/login'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shadcn/card'
import { Input } from '@/shadcn/input'
import { Button } from '@/shadcn/button'
import { Label } from '@/shadcn/label'

export default function Login() {
  const errors = usePage().props.errors
  const routes: RoutesType = usePage().props.routes as RoutesType
  const notification: NotificationType = usePage().props.notification as NotificationType

  const { data, setData, processing, reset, post } = useForm<LoginType>({
    username: '',
    password: '',
  })

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    post(routes.as['auth.login.store'], {
      onSuccess: () => reset('username', 'password'),
    })
  }

  return (
    <>
      <Head title="Login" />
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Masuk</CardTitle>
            <CardDescription>
              Masukkan email Anda di bawah ini untuk masuk ke akun Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {notification && (
              <p
                className={`text-sm p-3 rounded-sm mb-6 ${notification.type === 'success' ? 'text-green-500 bg-green-200' : 'text-red-500 bg-red-200'}`}
              >
                {notification.message}
              </p>
            )}
            <form onSubmit={submit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Masukkan username"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setData('username', event.target.value)
                    }
                    value={data.username}
                    required
                  />
                  {errors?.username && <p className="text-red-500 text-sm">*{errors?.username[0]}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current_password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setData('password', event.target.value)
                    }
                    value={data.password}
                    required
                  />
                  {errors?.password && <p className="text-red-500 text-sm">*{errors?.password[0]}</p>}
                </div>
                <Button
                  type="submit"
                  className={`w-full ${processing && 'opacity-25'}`}
                  disabled={processing}
                >
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
