import React, { useState, useEffect } from 'react'
import { Head, usePage, useForm } from '@inertiajs/react'
import { Eye, EyeOff } from 'lucide-react'
import { RoutesType } from '@/types/route'
import { NotificationType } from '@/types/flash'
import { LoginType } from '@/types/login'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shadcn/card'
import { Input } from '@/shadcn/input'
import { Button } from '@/shadcn/button'
import { Label } from '@/shadcn/label'
import { Toaster } from '@/shadcn/sonner'
import { toast } from 'sonner'

export default function Login() {
  const errors = usePage().props.errors
  const routes: RoutesType = usePage().props.routes as RoutesType
  const notification: NotificationType = usePage().props.notification as NotificationType
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const Icon = showPassword ? EyeOff : Eye

  const { data, setData, processing, reset, post } = useForm<LoginType>({
    username: '',
    password: '',
  })

  useEffect(() => {
    if (notification?.type && notification?.message) {
      toast(notification?.message, {
        style: {
          fontSize: '14px',
          borderRadius: 0,
          border: 0,
          boxShadow: 'none',
          backgroundColor: notification?.type === 'success' ? '#bbf7d0' : '#fecaca',
          color: notification?.type === 'success' ? '#15803d' : '#b91c1c',
        },
      })
    }
  }, [notification])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    post(routes.as['auth.login.store'], {
      onSuccess: () => reset('username', 'password'),
    })
  }

  return (
    <>
      <Head title="Masuk" />
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Masuk</CardTitle>
            <CardDescription>
              Masukkan email Anda di bawah ini untuk masuk ke akun Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Masukkan username"
                    className="text-13px"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setData('username', event.target.value)
                    }
                    value={data.username}
                    required
                  />
                  {errors?.username && (
                    <p className="text-red-500 text-sm">*{errors?.username[0]}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      autoComplete="current_password"
                      placeholder="Masukkan password"
                      className="text-13px pr-7"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setData('password', event.target.value)
                      }
                      value={data.password}
                      required
                    />
                    <Icon
                      className="text-gray-700 w-4 h-4 absolute right-2 top-2.5 cursor-pointer bg-white z-10"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  {errors?.password && (
                    <p className="text-red-500 text-sm">*{errors?.password[0]}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant={'ghost'}
                  className={`w-full bg-blue-600 text-gray-100 hover:text-gray-100 hover:bg-blue-700 duration-200 hover:duration-200 ${processing && 'opacity-25'}`}
                  disabled={processing}
                >
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </>
  )
}
