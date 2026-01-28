import { createFileRoute, Link } from '@tanstack/react-router'
import { Image } from '@unpic/react'
import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

export const Route = createFileRoute('/dashboard/client')({
  component: ClientDashboard,
})

function ClientDashboard() {
  const [viewMode, setViewMode] = useState<'income' | 'expense'>('income')
  const [timeView, setTimeView] = useState<
    'total' | 'annual' | 'quarter' | 'month'
  >('month')

  // Sample data - replace with actual API data
  const salesYTD = 1286690.32
  const salesYTDChange = 23
  const expensesMTD = 30200.0
  const expensesMTDChange = -18
  const salesMTD = 80321.45
  const salesMTDChange = 100

  const incomePercentage = 72.7
  const expensePercentage = 27.3

  const isOnTrack = viewMode === 'income'

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
              className="hover:text-cyan-100 transition-colors border-b-2 border-white pb-1"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/our-nest"
              className="hover:text-cyan-100 transition-colors"
            >
              Our Nest
            </Link>
            <Link
              to="/dashboard/profile"
              className="hover:text-cyan-100 transition-colors"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Card & Metrics */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start justify-between mb-8">
                {/* Business Logo */}
                <div className="shrink-0">
                  <div className="text-center">
                    <div className="text-6xl font-black text-[#ff6b35] leading-none">
                      Cafe
                    </div>
                    <div className="text-6xl font-black text-[#ff6b35] leading-none">
                      NOOK
                    </div>
                    <div className="text-sm font-bold text-[#2D4356] mt-1">
                      EST. 1996
                    </div>
                  </div>
                </div>

                {/* Current Sales YTD */}
                <div className="flex-1 ml-12">
                  <div className="text-sm text-slate-600 mb-1">
                    Current Sales YTD
                  </div>
                  <div className="text-4xl font-bold text-[#2D4356] mb-2">
                    ₱
                    {salesYTD.toLocaleString('en-PH', {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-lg">
                      ▲{salesYTDChange}%
                    </span>
                    <span className="text-xs text-slate-500">vs last year</span>
                  </div>
                </div>
              </div>

              {/* Expenses and Sales MTD */}
              <div className="grid grid-cols-2 gap-6">
                {/* Current Expenses MTD */}
                <div>
                  <div className="text-sm text-slate-600 mb-1">
                    Current Expenses MTD
                  </div>
                  <div className="text-3xl font-bold text-[#2D4356] mb-2">
                    ₱
                    {expensesMTD.toLocaleString('en-PH', {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-bold text-lg">
                      ▼{Math.abs(expensesMTDChange)}%
                    </span>
                    <span className="text-xs text-slate-500">
                      vs last month
                    </span>
                  </div>
                </div>

                {/* Current Sales MTD */}
                <div>
                  <div className="text-sm text-slate-600 mb-1">
                    Current Sales MTD
                  </div>
                  <div className="text-3xl font-bold text-[#2D4356] mb-2">
                    ₱
                    {salesMTD.toLocaleString('en-PH', {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-lg">
                      ▲{salesMTDChange}%
                    </span>
                    <span className="text-xs text-slate-500">
                      vs last month
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Income/Expense Chart */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2D4356]">
                  Current {viewMode === 'income' ? 'Income' : 'Expense'}
                </h2>
                <button
                  onClick={() =>
                    setViewMode(viewMode === 'income' ? 'expense' : 'income')
                  }
                  className="text-sm text-[#0081B4] hover:text-[#006a94] font-medium"
                >
                  Switch View
                </button>
              </div>

              {/* View Mode Selector */}
              <div className="mb-8">
                <div className="text-sm font-medium text-slate-600 mb-3">
                  View Mode
                </div>
                <div className="flex gap-4">
                  {(['total', 'annual', 'quarter', 'month'] as const).map(
                    (mode) => (
                      <button
                        key={mode}
                        onClick={() => setTimeView(mode)}
                        className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                          timeView === mode
                            ? 'text-[#0081B4] bg-cyan-50'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {mode}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="flex items-center gap-12">
                {/* Status Message */}
                <div className="flex-1 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-opacity-10 bg-[#2D4356]">
                    {isOnTrack ? (
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    ) : (
                      <XCircle className="w-10 h-10 text-red-600" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#2D4356] mb-2">
                    {isOnTrack ? 'Great Job!' : 'Oh no!'}
                  </h3>
                  <p className="text-slate-600">
                    Your Business is {isOnTrack ? 'on' : 'off'} the right track.
                  </p>

                  {/* Uploaded Documents */}
                  <div className="mt-8">
                    <div className="text-sm font-semibold text-[#2D4356] mb-3">
                      Uploaded Documents
                    </div>
                    <div className="relative">
                      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-[#0081B4] h-full rounded-full"
                          style={{ width: '49%' }}
                        ></div>
                      </div>
                      <div className="text-right mt-2 text-2xl font-bold text-[#2D4356]">
                        49%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="relative w-80 h-80">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Background circle */}
                    <circle cx="100" cy="100" r="90" fill="white" />

                    {/* Income/Expense segments */}
                    {viewMode === 'income' ? (
                      <>
                        {/* Green segment (Income) */}
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="transparent"
                          stroke="#4ade80"
                          strokeWidth="40"
                          strokeDasharray={`${incomePercentage * 4.4} ${400 - incomePercentage * 4.4}`}
                          transform="rotate(-90 100 100)"
                        />
                        {/* Red segment (Expense) */}
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="transparent"
                          stroke="#ef4444"
                          strokeWidth="40"
                          strokeDasharray={`${expensePercentage * 4.4} ${400 - expensePercentage * 4.4}`}
                          strokeDashoffset={`-${incomePercentage * 4.4}`}
                          transform="rotate(-90 100 100)"
                        />
                      </>
                    ) : (
                      <>
                        {/* Red segment (Expense) */}
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="transparent"
                          stroke="#ef4444"
                          strokeWidth="40"
                          strokeDasharray={`${expensePercentage * 4.4} ${400 - expensePercentage * 4.4}`}
                          transform="rotate(-90 100 100)"
                        />
                        {/* Green segment (Income) */}
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="transparent"
                          stroke="#4ade80"
                          strokeWidth="40"
                          strokeDasharray={`${incomePercentage * 4.4} ${400 - incomePercentage * 4.4}`}
                          strokeDashoffset={`-${expensePercentage * 4.4}`}
                          transform="rotate(-90 100 100)"
                        />
                      </>
                    )}

                    {/* Center circle with logo */}
                    <circle cx="100" cy="100" r="45" fill="white" />
                  </svg>

                  {/* Center Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-black text-[#ff6b35] leading-none">
                        Cafe
                      </div>
                      <div className="text-3xl font-black text-[#ff6b35] leading-none">
                        NOOK
                      </div>
                      <div className="text-xs font-bold text-[#2D4356]">
                        EST. 1996
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-4 right-4">
                    <div className="text-sm font-medium text-slate-600">
                      Income
                    </div>
                    <div className="text-lg font-bold text-[#2D4356]">
                      {incomePercentage}%
                    </div>
                  </div>
                  <div className="absolute bottom-16 left-4">
                    <div className="text-sm font-medium text-slate-600">
                      Expense
                    </div>
                    <div className="text-lg font-bold text-[#2D4356]">
                      {expensePercentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Chart */}
            {viewMode === 'expense' && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#2D4356] mb-6">
                  Expense Trends
                </h3>
                <div className="relative h-64">
                  <svg viewBox="0 0 600 200" className="w-full h-full">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="50"
                        y1={20 + i * 40}
                        x2="580"
                        y2={20 + i * 40}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Y-axis labels */}
                    {[35, 30, 25, 20, 15, 10].map((value, i) => (
                      <text
                        key={i}
                        x="35"
                        y={25 + i * 33}
                        fontSize="12"
                        fill="#64748b"
                        textAnchor="end"
                      >
                        {value}
                      </text>
                    ))}

                    {/* Red line (Expense) */}
                    <polyline
                      points="80,150 150,90 220,50 290,40 360,70 430,130 500,180"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />

                    {/* Green line (Income) */}
                    <polyline
                      points="80,170 150,130 220,100 290,90 360,100 430,110 500,120"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Bulletin */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-lg border-l-4 border-[#0081B4]">
              <h2 className="text-2xl font-bold text-[#2D4356] mb-6">
                Bulletin
              </h2>

              <div className="space-y-6">
                {/* Bulletin Item 1 */}
                <div className="flex gap-3">
                  <div className="shrink-0 w-3 h-3 rounded-full bg-[#0081B4] mt-1.5"></div>
                  <div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Upload all files from January to December 2025 by April
                      10, 2025, for ITR Filing.
                    </p>
                  </div>
                </div>

                {/* Bulletin Item 2 */}
                <div className="flex gap-3">
                  <div className="shrink-0 w-3 h-3 rounded-full bg-[#0081B4] mt-1.5"></div>
                  <div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      All Business documents must be uploaded by February 28,
                      2026.
                    </p>
                  </div>
                </div>

                {/* View All Link */}
                <div className="pt-4">
                  <a
                    href="#"
                    className="text-sm text-[#0081B4] hover:text-[#006a94] font-medium underline"
                  >
                    View All Announcements
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
