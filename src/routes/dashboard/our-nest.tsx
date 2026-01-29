import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { Image } from '@unpic/react'
import { useState, useEffect } from 'react'
import { Upload, Plus, CheckCircle2, LogOut, User, ChevronDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { isAuthenticated, isAuthenticatedClient, clearToken } from '@/lib/auth'

export const Route = createFileRoute('/dashboard/our-nest')({
  beforeLoad: () => {
    if (!isAuthenticated('client')) {
      throw redirect({ to: '/login/client' })
    }
  },
  component: OurNest,
})

interface DataEntry {
  id: string
  date: string
  description: string
  amount: number
  hasDocument: boolean
}

function OurNest() {
  const navigate = useNavigate()
  const [incomeMonth, setIncomeMonth] = useState('January')
  const [incomeYear, setIncomeYear] = useState('2026')
  const [expenseMonth, setExpenseMonth] = useState('January')
  const [expenseYear, setExpenseYear] = useState('2026')

  // Client-side auth check after hydration
  useEffect(() => {
    if (!isAuthenticatedClient('client')) {
      navigate({ to: '/login/client' })
    }
  }, [navigate])

  // Sample data - replace with actual API data
  const [incomeEntries, setIncomeEntries] = useState<DataEntry[]>([
    {
      id: '1',
      date: 'Jan/01/2026',
      description: 'Sales Receipts for the day',
      amount: 20320.84,
      hasDocument: false,
    },
    {
      id: '2',
      date: 'Jan/02/2026',
      description: 'Sales Receipts for the day',
      amount: 10343.45,
      hasDocument: true,
    },
  ])

  const [expenseEntries, setExpenseEntries] = useState<DataEntry[]>([
    {
      id: '1',
      date: 'Jan/01/2026',
      description: 'Coffee Beans',
      amount: 20320.84,
      hasDocument: false,
    },
    {
      id: '2',
      date: 'Jan/02/2026',
      description: 'Salary',
      amount: 10343.45,
      hasDocument: true,
    },
  ])

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const years = ['2024', '2025', '2026', '2027']

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
              className="hover:text-cyan-100 transition-colors border-b-2 border-white pb-1"
            >
              Our Nest
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-cyan-100 transition-colors outline-none">
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
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Income Nest Section */}
        <section className="bg-linear-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-lg border-2 border-emerald-100">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#2D4356] mb-2">
                Income Nest
              </h2>
              <p className="text-slate-600">
                Everything that comes in your business.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-slate-700">
                Data Entry
              </div>
              <Select value={incomeMonth} onValueChange={setIncomeMonth}>
                <SelectTrigger className="w-32 bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={incomeYear} onValueChange={setIncomeYear}>
                <SelectTrigger className="w-24 bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Income Table */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md border-2 border-emerald-200">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Document
                  </th>
                </tr>
              </thead>
              <tbody>
                {incomeEntries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-slate-100 hover:bg-emerald-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-slate-700">{entry.date}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {entry.description}
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      ₱
                      {entry.amount.toLocaleString('en-PH', {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {entry.hasDocument ? (
                        <div className="flex items-center gap-2 text-[#0081B4]">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm font-medium">Uploaded</span>
                        </div>
                      ) : (
                        <button className="text-slate-400 hover:text-[#0081B4] transition-colors">
                          <Upload className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {/* Empty rows for new entries */}
                {[...Array(3)].map((_, i) => (
                  <tr
                    key={`empty-${i}`}
                    className="border-b border-slate-100 hover:bg-emerald-50 transition-colors"
                  >
                    <td className="px-6 py-6 text-slate-300">-</td>
                    <td className="px-6 py-6 text-slate-300">-</td>
                    <td className="px-6 py-6 text-slate-300">-</td>
                    <td className="px-6 py-6 text-slate-300">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Button */}
          <div className="flex justify-end mt-4">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Expense Nest Section */}
        <section className="bg-linear-to-br from-red-50 to-rose-50 rounded-3xl p-8 shadow-lg border-2 border-red-100">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#2D4356] mb-2">
                Expense Nest
              </h2>
              <p className="text-slate-600">
                Everything that comes out of your business.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-slate-700">
                Data Entry
              </div>
              <Select value={expenseMonth} onValueChange={setExpenseMonth}>
                <SelectTrigger className="w-32 bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={expenseYear} onValueChange={setExpenseYear}>
                <SelectTrigger className="w-24 bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Expense Table */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md border-2 border-red-200">
            <table className="w-full">
              <thead>
                <tr className="bg-red-900 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Document
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenseEntries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-slate-100 hover:bg-red-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-slate-700">{entry.date}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {entry.description}
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      ₱
                      {entry.amount.toLocaleString('en-PH', {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {entry.hasDocument ? (
                        <div className="flex items-center gap-2 text-[#0081B4]">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm font-medium">Uploaded</span>
                        </div>
                      ) : (
                        <button className="text-slate-400 hover:text-[#0081B4] transition-colors">
                          <Upload className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {/* Empty rows for new entries */}
                {[...Array(3)].map((_, i) => (
                  <tr
                    key={`empty-${i}`}
                    className="border-b border-slate-100 hover:bg-red-50 transition-colors"
                  >
                    <td className="px-6 py-6 text-slate-300">-</td>
                    <td className="px-6 py-6 text-slate-300">-</td>
                    <td className="px-6 py-6 text-slate-300">-</td>
                    <td className="px-6 py-6 text-slate-300">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Button */}
          <div className="flex justify-end mt-4">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 hover:bg-red-950 text-white shadow-lg transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
