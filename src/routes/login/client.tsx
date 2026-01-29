import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Image } from '@unpic/react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { clientLogin } from '@/api/endpoints'
import { Loader2, AlertCircle } from 'lucide-react'
import { AxiosError } from 'axios'

export const Route = createFileRoute('/login/client')({
  component: ClientLogin,
})

function ClientLogin() {
  const navigate = useNavigate()
  const [contactEmail, setContactEmail] = useState('')
  const [password, setPassword] = useState('')

  const clientLoginMutation = useMutation({
    mutationFn: clientLogin,
    onSuccess: (data) => {
      const { token } = data

      if (token) {
        sessionStorage.setItem('clientToken', token)
        navigate({ to: '/dashboard/client' })
      }
    },
    onError: (error) => {
      console.error('Error sending login credentials', error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clientLoginMutation.mutate({
      contactEmail,
      password,
    })
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
          <Link to="/login/admin">
            <Button
              variant="outline"
              className="border-2 border-[#0081B4] text-[#0081B4] hover:bg-cyan-50 rounded-full"
            >
              Admin Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Login Section */}
      <section className="flex items-center justify-center py-16 px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[40px] p-10 lg:p-12 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-[#2D4356] mb-2">
                Client Login
              </h1>
              <p className="text-slate-600">Access your financial dashboard</p>
            </div>

            {/* Error Alert */}
            {clientLoginMutation.isError && (
              <Alert
                variant="destructive"
                className="mb-6 border-red-200 bg-red-50 text-red-800"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {(clientLoginMutation.error as AxiosError<{ message?: string }>)
                    ?.response?.data?.message ||
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
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 rounded-lg border-slate-200"
                  disabled={clientLoginMutation.isPending}
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 rounded-lg border-slate-200"
                  disabled={clientLoginMutation.isPending}
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
                className="w-full bg-[#0081B4] hover:bg-[#006a94] text-white py-6 rounded-full text-lg font-semibold disabled:opacity-70"
                disabled={clientLoginMutation.isPending}
              >
                {clientLoginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              {/* Register Link */}
              <Link to="/">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-[#0081B4] text-[#0081B4] hover:bg-cyan-50 py-6 rounded-full text-lg font-semibold"
                >
                  Create Account
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
