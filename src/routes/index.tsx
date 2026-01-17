import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Image } from '@unpic/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const services = [
    {
      title: 'Bank-ready Files',
      description:
        'Clear, organized financial documents that make loan applications and bank transactions faster, smoother, and more credible.',
      icon: (
        <svg
          className="w-20 h-20 text-[#2D4356]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M3 10l9-7 9 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="7"
            y="16"
            fontSize="3"
            fontWeight="bold"
            fill="currentColor"
            className="tracking-tighter"
          >
            BANK
          </text>
        </svg>
      ),
    },
    {
      title: 'Bookkeeping Services',
      description:
        'Accurate tracking of income and expenses so you stay compliant.',
      icon: (
        <svg
          className="w-20 h-20 text-[#2D4356]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="19" r="4" fill="white" stroke="currentColor" />
          <path
            d="M16 19l1.5 1.5L20 17"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'CPA signed documents',
      description:
        'Verified and trusted financial reports that banks, investors, and government agencies require for approvals and compliance.',
      icon: (
        <svg
          className="w-20 h-20 text-[#2D4356]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2v6h6M8 18c2-1 4-1 6 0M17 6.5L14 3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'Monitoring Dashboard',
      description:
        "Record and track your income and expenses anytime and anywhere with an easy-to-understand dashboard to understand your business's real financial health and make smarter decisions.",
      icon: (
        <svg
          className="w-20 h-20 text-[#2D4356]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect
            x="5"
            y="2"
            width="14"
            height="20"
            rx="2"
            ry="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18h.01M9 7h6M9 11h6M9 15h6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="3" stroke="currentColor" fill="none" />
        </svg>
      ),
    },
  ]
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Navigation --- */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <Image src="../../public/2.svg" alt="Logo" width={100} height={100} />
          <div className="flex flex-col leading-none">
            <span className="text-[34px] font-black text-cyan-600 tracking-tighter">
              MUSNEST
            </span>
            <span className="text-[23px] font-bold text-slate-700 tracking-[0.2em]">
              Finance
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
          <a href="#services" className="hover:text-cyan-600 transition-colors">
            Services
          </a>
          <a href="#about-us" className="hover:text-cyan-600 transition-colors">
            About Us
          </a>
          <a
            href="#help-center"
            className="hover:text-cyan-600 transition-colors"
          >
            Help Center
          </a>
        </div>
      </nav>
      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden bg-[#0081B4]">
        {/* Background Gradient Mix */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b85b3] via-[#00a6a9] to-[#0081B4]"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center min-h-[500px]">
          {/* Left Side: Imagery */}
          <div className="w-4/12 lg:w-1/2 relative flex justify-center items-end self-end">
            {/* Note: In a real app, you would use an <img> tag here. 
                I'm using a placeholder div to represent the visual structure.
            */}
            {/* <div className="relative z-10 w-full max-w-md"> */}
            <Image
              src="../../public/test.png"
              alt="Hero Image"
              width={800}
              height={800}
              className="w-full h-full"
            />
            {/* </div> */}
            {/* Visual labels like "BIR Tax Forms" can be added as absolute spans */}
          </div>

          {/* Right Side: CTA Card */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 z-20">
            <div className="bg-white rounded-[40px] p-10 lg:p-16 shadow-2xl max-w-xl ml-auto">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-[#2D4356] leading-tight mb-8">
                Know your numbers.
                <br />
                Know your business.
              </h1>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[#0081B4] hover:bg-[#006a94] text-white px-10 py-7 rounded-full text-xl font-semibold"
                >
                  Register
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#0081B4] text-[#0081B4] hover:bg-cyan-50 px-10 py-7 rounded-full text-xl font-semibold"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f0f7ff] py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24">
          {/* Left Column: Typography */}
          <div className="space-y-2">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#2D4356] leading-[1.1] tracking-tight">
              Record.
              <br />
              Track.
              <br />
              Anywhere.
            </h2>
          </div>

          {/* Right Column: Image Container */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-2xl overflow-hidden rounded-[60px] md:rounded-[80px] shadow-xl">
              {/* Replace the 'src' with your actual warehouse image path.
              The 'aspect-square' or a custom aspect ratio ensures it looks 
              consistent with the uploaded design.
            */}
              <Image
                src="../../public/recordTrack.png"
                alt="Hero Image"
                width={800}
                height={800}
                className="w-full h-auto rounded-3xl shadow-2xl"
              />

              {/* Optional Overlay: If you want to recreate the UI elements on top of the image */}
              <div className="absolute inset-0 bg-transparent pointer-events-none">
                {/* Add absolute positioned charts/data icons here if needed */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f0f7ff] py-24 px-8" id="services">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-[#2D4356] text-center mb-20">
            Our Service
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Container */}
                <div className="mb-6 transform transition-transform group-hover:scale-110 duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#0081B4] leading-tight mb-4 min-h-[3.5rem] flex items-center justify-center">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed max-w-[250px]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="bg-[#f0f7ff] py-20 px-8 md:px-16 lg:px-24"
        id="about-us"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* --- Left Column: About Us --- */}
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-[#2D4356]">About Us</h2>
            <div className="space-y-6 text-[#2D4356] text-lg leading-relaxed">
              <p>
                Musnest Consultancy Inc. is a Strategic Development Consultancy
                that equips businesses with the financial clarity, training and
                systems they need to grow with confidence. Our core services
                include bookkeeping, accounting consultancy, tax compliance and
                CPA-signed financial reports, giving companies accurate and
                bank-ready documents for expansion and long-term planning.
              </p>
              <p>
                At Musnest, we help you strengthen your numbers, your people and
                your impact.
              </p>
            </div>
          </div>

          {/* --- Right Column: Help Center Form --- */}
          <div
            className="bg-[#e6f2ff] p-10 rounded-[40px] shadow-lg border border-white/50"
            id="help-center"
          >
            <h3 className="text-2xl font-bold text-[#2D4356] mb-8">
              Help Center
            </h3>

            <form className="space-y-4">
              <div className="grid grid-cols-12 gap-4">
                {/* Title Select */}
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger className="bg-white border-none h-12 rounded-lg text-slate-400">
                      <SelectValue placeholder="Mr." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">Mr.</SelectItem>
                      <SelectItem value="ms">Ms.</SelectItem>
                      <SelectItem value="mrs">Mrs.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* First Name */}
                <div className="col-span-9">
                  <Input
                    placeholder="First Name"
                    className="bg-white border-none h-12 rounded-lg placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Last Name */}
              <Input
                placeholder="Last Name"
                className="bg-white border-none h-12 rounded-lg placeholder:text-slate-400"
              />

              {/* Company Name */}
              <Input
                placeholder="Company Name"
                className="bg-white border-none h-12 rounded-lg placeholder:text-slate-400 text-center"
              />

              <div className="grid grid-cols-12 gap-4">
                {/* Country Code */}
                <div className="col-span-3">
                  <div className="bg-white h-12 rounded-lg flex items-center justify-center text-slate-400 font-medium">
                    +63
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="col-span-9">
                  <Input
                    placeholder="Mobile Number"
                    className="bg-white border-none h-12 rounded-lg placeholder:text-slate-400 text-center"
                  />
                </div>
              </div>

              {/* Email */}
              <Input
                type="email"
                placeholder="Email"
                className="bg-white border-none h-12 rounded-lg placeholder:text-slate-400 text-center"
              />

              {/* Message */}
              <Textarea
                placeholder="How can we help you?"
                className="bg-white border-none min-h-[150px] rounded-xl placeholder:text-slate-400 pt-8 text-center resize-none"
              />
            </form>
          </div>
        </div>
      </section>
      );
    </div>
  )
}
