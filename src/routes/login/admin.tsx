import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Image } from '@unpic/react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { adminLogin } from '@/api/endpoints'
import { Loader2, AlertCircle } from 'lucide-react'
import { AxiosError } from 'axios'

export const Route = createFileRoute('/login/admin')({ component: AdminLogin })

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const adminLoginMutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      const { token } = data

      if (token) {
        sessionStorage.setItem('adminToken', token)
      }

      //  to add navigate to admin dashboard soon
    },
    onError: (error) => {
      console.error('Error sending admin login credentials', error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    adminLoginMutation.mutate({ email, password })
  }

  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans text-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white">
        <Link to="/" className="flex items-center gap-2">
          <Image
            src="/2.svg"
            alt="Musnest Finance logo"
            width={100}
            height={100}
          />
          <div className="flex flex-col leading-none">
            <span className="text-[50px] font-black text-cyan-600 tracking-tighter">
              MUSNEST
            </span>
            <span className="text-[30px] font-bold text-slate-700 tracking-[0.2em]">
              Finance
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/login/client">
            <Button
              variant="outline"
              className="border-2 border-[#0081B4] text-[#0081B4] hover:bg-cyan-50 rounded-full"
            >
              Client Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Login Section */}
      <section className="flex items-center justify-center py-16 px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[40px] p-10 lg:p-12 shadow-2xl">
            {/* Header with Admin Badge */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-[#0081B4] bg-opacity-10 p-4 rounded-full">
                  <ShieldCheck className="w-12 h-12 text-[#0081B4]" />
                </div>
              </div>
              <h1 className="text-4xl font-extrabold text-[#2D4356] mb-2">
                Admin Login
              </h1>
              <p className="text-slate-600">Access administrative dashboard</p>
            </div>
            {adminLoginMutation.isError && (
              <Alert
                variant="destructive"
                className="mb-6 border-red-200 bg-red-50 text-red-800"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {(
                    adminLoginMutation.error as AxiosError<{
                      message?: string
                    }>
                  )?.response?.data?.message ||
                    'Invalid email or password. Please try again.'}
                </AlertDescription>
              </Alert>
            )}
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#2D4356]"
                >
                  Admin Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled={adminLoginMutation.isPending}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="h-12 rounded-lg border-slate-200"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#2D4356]"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  disabled={adminLoginMutation.isPending}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="h-12 rounded-lg border-slate-200"
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-[#0081B4] hover:text-[#006a94] font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#0081B4] hover:bg-[#006a94] text-white py-6 rounded-full text-lg font-semibold"
                disabled={adminLoginMutation.isPending}
              >
                {adminLoginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600 text-center">
                  <ShieldCheck className="inline w-4 h-4 mr-1" />
                  This is a secure admin portal. All activities are logged.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
