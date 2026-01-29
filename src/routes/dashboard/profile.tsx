import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { Image } from '@unpic/react'
import { useState, useEffect } from 'react'
import { Upload, FileText, LogOut, User, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { isAuthenticated, isAuthenticatedClient, clearToken } from '@/lib/auth'

export const Route = createFileRoute('/dashboard/profile')({
  beforeLoad: () => {
    if (!isAuthenticated('client')) {
      throw redirect({ to: '/login/client' })
    }
  },
  component: Profile,
})

function Profile() {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('')

  // Client-side auth check after hydration
  useEffect(() => {
    if (!isAuthenticatedClient('client')) {
      navigate({ to: '/login/client' })
    }
  }, [navigate])
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [designation, setDesignation] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [contactEmail, setContactEmail] = useState('')

  const [documents, setDocuments] = useState({
    businessRegistration: false,
    mayorsPermit: false,
    birCertificate: false,
  })

  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans">
      {/* Header */}
      <header className="bg-linear-to-r from-[#0081B4] to-[#00a6a9] px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/2.svg"
              alt="Musnest Finance logo"
              width={50}
              height={50}
            />
            <div className="flex flex-col leading-none">
              <span className="text-[32px] font-black text-white tracking-tighter">
                MUSNEST
              </span>
              <span className="text-[20px] font-bold text-white tracking-[0.2em]">
                Finance
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-8 text-white font-medium">
            <Link
              to="/dashboard/client"
              className="hover:text-cyan-100 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/our-nest"
              className="hover:text-cyan-100 transition-colors"
            >
              Our Nest
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-cyan-100 transition-colors border-b-2 border-white pb-1 outline-none">
                <User className="w-4 h-4" />
                Profile
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile" className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                  onClick={() => {
                    clearToken('client')
                    navigate({ to: '/login/client' })
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Logo Upload */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
              <div className="mb-6">
                <div className="w-48 h-48 mx-auto border-4 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-50">
                  <Upload className="w-12 h-12 text-slate-400" />
                </div>
              </div>

              <button className="flex items-center gap-2 mx-auto px-6 py-3 bg-[#0081B4] hover:bg-[#006a94] text-white rounded-full font-medium transition-colors">
                <Upload className="w-4 h-4" />
                Upload Logo
              </button>

              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                Must be in PNG format with transparent background, at least 1080
                x 1080 px resolution.
              </p>
            </div>
          </div>

          {/* Right Column - Company Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#2D4356] mb-6">
                Company Profile
              </h2>

              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <Input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Name"
                    className="h-12 rounded-lg border-slate-200 placeholder:text-slate-400 text-center"
                  />
                </div>

                {/* Company Email */}
                <div>
                  <Input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    placeholder="Company Email"
                    className="h-12 rounded-lg border-slate-200 placeholder:text-slate-400 text-center"
                  />
                </div>

                {/* Company Address */}
                <div>
                  <Textarea
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    placeholder="Company Address"
                    className="min-h-24 rounded-lg border-slate-200 placeholder:text-slate-400 text-center resize-none"
                  />
                </div>

                {/* Contact Person Section */}
                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-[#2D4356] mb-4">
                    Contact Person
                  </h3>

                  <div className="space-y-4">
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="h-12 rounded-lg border-slate-200 placeholder:text-slate-400 text-center"
                      />
                      <Input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="h-12 rounded-lg border-slate-200 placeholder:text-slate-400 text-center"
                      />
                    </div>

                    {/* Designation */}
                    <div>
                      <Input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="Designation"
                        className="h-12 rounded-lg border-slate-200 placeholder:text-slate-400 text-center"
                      />
                    </div>

                    {/* Mobile Number & Email */}
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-2">
                        <div className="h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 font-medium bg-slate-50">
                          +63
                        </div>
                      </div>
                      <div className="col-span-5">
                        <Input
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="Mobile Number"
                          className="h-12 rounded-lg border-slate-200 placeholder:text-slate-400 text-center"
                        />
                      </div>
                      <div className="col-span-5">
                        <Input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Email"
                          className="h-12 rounded-lg border-slate-200 placeholder:text-slate-400 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Documents Section */}
        <div className="mt-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#2D4356] mb-1">
                Company Documents
              </h2>
              <p className="text-sm text-slate-600">Must be in PDF format.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Business Registration */}
              <div className="border-2 border-slate-200 rounded-2xl p-6 text-center hover:border-[#0081B4] transition-colors">
                <h3 className="text-lg font-semibold text-[#2D4356] mb-4">
                  Business Registration
                </h3>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0081B4] text-[#0081B4] hover:bg-cyan-50 rounded-full font-medium transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload File
                  </button>

                  {documents.businessRegistration ? (
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 text-slate-600 hover:text-[#0081B4] transition-colors text-sm">
                      <FileText className="w-4 h-4" />
                      View Document
                    </button>
                  ) : (
                    <div className="text-xs text-slate-400">
                      No document uploaded
                    </div>
                  )}
                </div>
              </div>

              {/* Mayor's Permit */}
              <div className="border-2 border-slate-200 rounded-2xl p-6 text-center hover:border-[#0081B4] transition-colors">
                <h3 className="text-lg font-semibold text-[#2D4356] mb-4">
                  Mayor's Permit
                </h3>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0081B4] text-[#0081B4] hover:bg-cyan-50 rounded-full font-medium transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload File
                  </button>

                  {documents.mayorsPermit ? (
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 text-slate-600 hover:text-[#0081B4] transition-colors text-sm">
                      <FileText className="w-4 h-4" />
                      View Document
                    </button>
                  ) : (
                    <div className="text-xs text-slate-400">
                      No document uploaded
                    </div>
                  )}
                </div>
              </div>

              {/* BIR Certificate of Registration */}
              <div className="border-2 border-slate-200 rounded-2xl p-6 text-center hover:border-[#0081B4] transition-colors">
                <h3 className="text-lg font-semibold text-[#2D4356] mb-4">
                  BIR Certificate of Registration
                </h3>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0081B4] text-[#0081B4] hover:bg-cyan-50 rounded-full font-medium transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload File
                  </button>

                  {documents.birCertificate ? (
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 text-slate-600 hover:text-[#0081B4] transition-colors text-sm">
                      <FileText className="w-4 h-4" />
                      View Document
                    </button>
                  ) : (
                    <div className="text-xs text-slate-400">
                      No document uploaded
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">
                Need help? Email us at:{' '}
                <a
                  href="mailto:help@musnest.com"
                  className="text-[#0081B4] hover:text-[#006a94] font-medium"
                >
                  help@musnest.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
