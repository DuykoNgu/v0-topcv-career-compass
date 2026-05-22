"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, BadgeCheck, Users, DollarSign, Sparkles, Filter, Search, ArrowRight, RefreshCw } from "lucide-react"
import type { UserProfile, Job } from "@/app/page"

interface JobMatchScreenProps {
  userProfile: UserProfile
  jobs?: Job[]
  onJobSelect: (job: Job) => void
  onBack: () => void
}

export const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Marketing Executive",
    company: "TechViet Solutions",
    logo: "TV",
    salary: "15-20 triệu",
    workMode: "Hybrid",
    hasMentor: true,
    isVerified: true,
    matchScore: 94,
    location: "Hà Nội",
    description: "Phụ trách chiến lược marketing digital và quản lý các chiến dịch quảng cáo trên các nền tảng social media.",
    requirements: ["2+ năm kinh nghiệm Marketing", "Thành thạo Facebook Ads, Google Ads", "Kỹ năng phân tích data"],
    benefits: ["Bảo hiểm sức khỏe", "13 tháng lương", "Làm việc linh hoạt"],
    experience: "1 - 3 năm",
    jobType: "Full-time",
    field: "Marketing",
    salaryMin: 15,
    salaryMax: 20
  },
  {
    id: "2",
    title: "Business Development",
    company: "StartupXYZ",
    logo: "BD",
    salary: "18-25 triệu",
    workMode: "Remote",
    hasMentor: true,
    isVerified: true,
    matchScore: 89,
    location: "TP.HCM",
    description: "Tìm kiếm và phát triển khách hàng mới, xây dựng mối quan hệ đối tác chiến lược.",
    requirements: ["Kỹ năng giao tiếp tốt", "Kinh nghiệm B2B sales", "Tiếng Anh giao tiếp"],
    benefits: ["ESOP", "Remote 100%", "Budget học tập"],
    experience: "1 - 3 năm",
    jobType: "Full-time",
    field: "Kinh doanh",
    salaryMin: 18,
    salaryMax: 25
  },
  {
    id: "3",
    title: "Content Marketing Specialist",
    company: "MediaOne",
    logo: "CM",
    salary: "12-18 triệu",
    workMode: "On-site",
    hasMentor: false,
    isVerified: true,
    matchScore: 85,
    location: "Đà Nẵng",
    description: "Lên kế hoạch và sản xuất nội dung cho website, blog và các kênh social media của công ty.",
    requirements: ["Kỹ năng viết content", "SEO cơ bản", "Sáng tạo và chủ động"],
    benefits: ["Du lịch hàng năm", "Thưởng KPI", "Môi trường trẻ"],
    experience: "Dưới 1 năm",
    jobType: "Part-time",
    field: "Marketing",
    salaryMin: 12,
    salaryMax: 18
  },
  {
    id: "4",
    title: "Junior Product Manager",
    company: "FintechPro",
    logo: "PM",
    salary: "20-28 triệu",
    workMode: "Hybrid",
    hasMentor: true,
    isVerified: false,
    matchScore: 82,
    location: "Hà Nội",
    description: "Hỗ trợ quản lý sản phẩm, nghiên cứu thị trường và phối hợp với team phát triển.",
    requirements: ["Hiểu biết về fintech", "Kỹ năng phân tích", "Tiếng Anh tốt"],
    benefits: ["Lương tháng 13-14", "Bảo hiểm cao cấp", "Gym miễn phí"],
    experience: "1 - 3 năm",
    jobType: "Full-time",
    field: "Kinh doanh",
    salaryMin: 20,
    salaryMax: 28
  },
  {
    id: "5",
    title: "Digital Marketing Manager",
    company: "E-Commerce Plus",
    logo: "DM",
    salary: "25-35 triệu",
    workMode: "Hybrid",
    hasMentor: false,
    isVerified: true,
    matchScore: 78,
    location: "TP.HCM",
    description: "Quản lý chiến lược digital marketing tổng thể, dẫn dắt team marketing 5-7 người.",
    requirements: ["5+ năm kinh nghiệm", "Quản lý team", "E-commerce experience"],
    benefits: ["Bonus theo doanh số", "Laptop + phone", "Parking free"],
    experience: "Trên 3 năm",
    jobType: "Full-time",
    field: "Marketing",
    salaryMin: 25,
    salaryMax: 35
  },
  {
    id: "6",
    title: "Data Analyst",
    company: "DataTech VN",
    logo: "DA",
    salary: "18-25 triệu",
    workMode: "Remote",
    hasMentor: true,
    isVerified: true,
    matchScore: 75,
    location: "Remote",
    description: "Phân tích dữ liệu kinh doanh, tạo báo cáo và dashboard cho các bộ phận.",
    requirements: ["SQL, Python/R", "Data visualization", "Critical thinking"],
    benefits: ["Remote toàn thời gian", "Flexible hours", "Learning budget"],
    experience: "1 - 3 năm",
    jobType: "Part-time",
    field: "IT & Data",
    salaryMin: 18,
    salaryMax: 25
  },
  {
    id: "7",
    title: "Software Engineer",
    company: "VinaTech Group",
    logo: "SE",
    salary: "30-45 triệu",
    workMode: "Hybrid",
    hasMentor: true,
    isVerified: true,
    matchScore: 72,
    location: "Hà Nội",
    description: "Phát triển các ứng dụng web quy mô lớn sử dụng React/Next.js và Node.js.",
    requirements: ["3+ năm kinh nghiệm với Node.js/React", "Tư duy thuật toán tốt", "Kiến thức về cloud"],
    benefits: ["Thưởng dự án", "Bảo hiểm sức khỏe PVI", "Review lương 2 lần/năm"],
    experience: "Trên 3 năm",
    jobType: "Full-time",
    field: "IT & Data",
    salaryMin: 30,
    salaryMax: 45
  },
  {
    id: "8",
    title: "Sales Admin Support (Part-time)",
    company: "MegaCorp",
    logo: "SA",
    salary: "6-8 triệu",
    workMode: "On-site",
    hasMentor: false,
    isVerified: true,
    matchScore: 68,
    location: "Hà Nội",
    description: "Hỗ trợ chuẩn bị hồ sơ hợp đồng, theo dõi tiến độ đơn hàng và hỗ trợ bộ phận kinh doanh.",
    requirements: ["Sinh viên năm 3, 4", "Sử dụng tốt tin học văn phòng", "Chăm chỉ, cẩn thận"],
    benefits: ["Thời gian linh hoạt", "Học hỏi quy trình làm việc chuyên nghiệp", "Hỗ trợ dấu thực tập"],
    experience: "Dưới 1 năm",
    jobType: "Part-time",
    field: "Kinh doanh",
    salaryMin: 6,
    salaryMax: 8
  }
]

export default function JobMatchScreen({ userProfile, jobs = sampleJobs, onJobSelect }: JobMatchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedField, setSelectedField] = useState("all")
  const [selectedExp, setSelectedExp] = useState("all")
  const [selectedSalary, setSelectedSalary] = useState("all")
  const [selectedJobType, setSelectedJobType] = useState("all")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Clear all filters handler
  const handleClearFilters = () => {
    setSelectedField("all")
    setSelectedExp("all")
    setSelectedSalary("all")
    setSelectedJobType("all")
    setSearchQuery("")
  }

  // Filter computation
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesField = selectedField === "all" || job.field === selectedField
    const matchesExp = selectedExp === "all" || job.experience === selectedExp
    const matchesJobType = selectedJobType === "all" || job.jobType === selectedJobType

    let matchesSalary = true
    if (selectedSalary !== "all") {
      const minVal = job.salaryMin || 0
      if (selectedSalary === "under-15") {
        matchesSalary = minVal < 15
      } else if (selectedSalary === "15-25") {
        matchesSalary = minVal >= 15 && minVal <= 25
      } else if (selectedSalary === "over-25") {
        matchesSalary = minVal > 25
      }
    }

    return matchesSearch && matchesField && matchesExp && matchesJobType && matchesSalary
  })

  const hasActiveFilters = 
    selectedField !== "all" || 
    selectedExp !== "all" || 
    selectedSalary !== "all" || 
    selectedJobType !== "all" || 
    searchQuery !== ""

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-[calc(100vh-4rem)] bg-background/50"
    >
      {/* Sub Header with Search */}
      <div className="border-b border-border bg-card sticky top-16 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 max-w-7xl mx-auto">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Việc làm phù hợp với bạn</h1>
              <p className="text-muted-foreground text-sm">
                Tìm thấy {filteredJobs.length} công việc phù hợp với tiêu chí của bạn
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm việc làm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                />
              </div>
              <Button 
                variant={showMobileFilters ? "default" : "outline"} 
                size="icon" 
                className="h-11 w-11 rounded-xl lg:hidden transition-colors"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Filters (Sticky Sidebar) */}
          <div className={`${showMobileFilters ? "block" : "hidden"} lg:block lg:w-80 flex-shrink-0 space-y-6 transition-all duration-300`}>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm sticky top-36">
              
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="font-bold text-foreground text-base flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  Bộ lọc tìm kiếm
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Xóa lọc
                  </button>
                )}
              </div>

              {/* Lĩnh vực */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground">Lĩnh vực</h4>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Tất cả lĩnh vực", value: "all" },
                    { label: "Marketing", value: "Marketing" },
                    { label: "Kinh doanh", value: "Kinh doanh" },
                    { label: "IT & Data", value: "IT & Data" },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedField(option.value)}
                      className={`text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center justify-between ${
                        selectedField === option.value
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedField === option.value && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mức kinh nghiệm */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground">Mức kinh nghiệm</h4>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Tất cả kinh nghiệm", value: "all" },
                    { label: "Dưới 1 năm", value: "Dưới 1 năm" },
                    { label: "1 - 3 năm", value: "1 - 3 năm" },
                    { label: "Trên 3 năm", value: "Trên 3 năm" },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedExp(option.value)}
                      className={`text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center justify-between ${
                        selectedExp === option.value
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedExp === option.value && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mức lương */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground">Mức lương</h4>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Tất cả mức lương", value: "all" },
                    { label: "Dưới 15 triệu", value: "under-15" },
                    { label: "15 - 25 triệu", value: "15-25" },
                    { label: "Trên 25 triệu", value: "over-25" },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedSalary(option.value)}
                      className={`text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center justify-between ${
                        selectedSalary === option.value
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedSalary === option.value && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hình thức */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground">Hình thức làm việc</h4>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Tất cả hình thức", value: "all" },
                    { label: "Full-time", value: "Full-time" },
                    { label: "Part-time", value: "Part-time" },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedJobType(option.value)}
                      className={`text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center justify-between ${
                        selectedJobType === option.value
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedJobType === option.value && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Job Horizontal List */}
          <div className="flex-1 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                  >
                    <JobRow job={job} userProfile={userProfile} onClick={() => onJobSelect(job)} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-12 text-center bg-card border border-border rounded-2xl min-h-[300px]"
                >
                  <Briefcase className="w-16 h-16 text-muted-foreground/45 mb-4 animate-pulse" />
                  <h3 className="text-lg font-bold text-foreground mb-1">Không tìm thấy việc làm</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mb-6">
                    Không có công việc nào khớp với bộ lọc hiện tại của bạn. Hãy thử thay đổi hoặc xóa các tiêu chí lọc.
                  </p>
                  <Button onClick={handleClearFilters} variant="outline" className="rounded-xl">
                    Xóa tất cả bộ lọc
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

function getComparisonDetails(job: Job, survey: any) {
  if (!survey) return null

  const benefits: string[] = []
  const resolved: string[] = []
  let scorePoints = 50 // Điểm cơ bản

  // 1. So sánh lương
  const jobMin = job.salaryMin || 0
  const prevSalary = Number(survey.salary) || 0
  if (jobMin > prevSalary) {
    const diff = jobMin - prevSalary
    benefits.push(`Lương cao hơn (+${diff}M)`)
    scorePoints += Math.min(25, (diff / prevSalary) * 50)
  } else if (jobMin === prevSalary) {
    benefits.push("Lương tương đương")
    scorePoints += 5
  } else {
    scorePoints -= 15
  }

  // 2. So sánh hình thức làm việc
  if (survey.workMode === "On-site" || survey.workMode === "Onsite") {
    if (job.workMode === "Hybrid" || job.workMode === "Remote") {
      benefits.push(`Làm ${job.workMode} linh hoạt`)
      scorePoints += 15
    }
  }

  // 3. So sánh Mentor
  if (!survey.hasMentor && job.hasMentor) {
    benefits.push("Có Mentor dẫn dắt")
    scorePoints += 15
  }

  // 4. Giải quyết các điểm chưa hài lòng
  survey.dislikedFactors?.forEach((factor: string) => {
    if (factor.includes("Lương") && jobMin > prevSalary) {
      resolved.push("Tăng thu nhập")
      scorePoints += 10
    }
    if (factor.includes("Mentor") && job.hasMentor) {
      resolved.push("Có Mentor hướng dẫn")
      scorePoints += 10
    }
    if (factor.includes("gò bó") || factor.includes("Onsite 100%")) {
      if (job.workMode === "Hybrid" || job.workMode === "Remote") {
        resolved.push("Linh hoạt hơn")
        scorePoints += 10
      }
    }
  })

  // Chuẩn hóa điểm từ 0 đến 100
  const finalScore = Math.min(100, Math.max(0, Math.round(scorePoints)))

  return {
    score: finalScore,
    benefits: benefits.slice(0, 3),
    resolved: resolved.slice(0, 2)
  }
}

interface JobRowProps {
  job: Job
  userProfile?: UserProfile
  onClick: () => void
}

function JobRow({ job, userProfile, onClick }: JobRowProps) {
  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500 border-emerald-500"
    if (score >= 75) return "bg-primary border-primary"
    return "bg-amber-500 border-amber-500"
  }

  const survey = userProfile?.previousJobSurvey
  const comparison = survey ? getComparisonDetails(job, survey) : null

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col p-5 bg-card border border-border hover:border-primary/50 hover:shadow-md rounded-2xl cursor-pointer transition-all duration-200"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="flex items-start md:items-center flex-1 min-w-0 text-left">
          {/* Logo */}
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0 mr-4 group-hover:scale-105 transition-transform">
            {job.logo}
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {job.title}
              </h3>
              {job.isVerified && (
                <BadgeCheck className="w-4 h-4 text-sky-500 flex-shrink-0" />
              )}
              
              {/* Mobile score circle */}
              <div className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full text-white text-xs font-bold border ${getScoreBgColor(job.matchScore)}`}>
                {job.matchScore}%
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{job.company}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-muted-foreground rounded-lg">
                <DollarSign className="w-3.5 h-3.5" />
                {job.salary}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-muted-foreground rounded-lg">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-muted-foreground rounded-lg">
                <Briefcase className="w-3.5 h-3.5" />
                {job.workMode}
              </span>
              {job.experience && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/5 text-primary rounded-lg font-medium">
                  {job.experience}
                </span>
              )}
              {job.jobType && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium ${
                  job.jobType === "Full-time" 
                    ? "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400" 
                    : "bg-amber-500/5 text-amber-600 dark:text-amber-400"
                }`}>
                  {job.jobType}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column: Match Score & Action */}
        <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-border">
          {/* Desktop score circle */}
          <div className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full text-white text-sm font-bold border ${getScoreBgColor(job.matchScore)}`}>
            {job.matchScore}%
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary group-hover:text-primary group-hover:bg-primary/10 rounded-xl font-medium ml-auto md:ml-0 group-hover:translate-x-1 transition-all"
          >
            Xem chi tiết
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>

      {comparison && (
        <div className="mt-4 pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-primary/5 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              So với công việc cũ:
            </span>
            {comparison.benefits.map((b, i) => (
              <span key={i} className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                {b}
              </span>
            ))}
            {comparison.resolved.map((r, i) => (
              <span key={i} className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold">
                {r}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground shrink-0">
            <span>Chỉ số cải thiện:</span>
            <span className="text-sm text-emerald-500 font-extrabold">{comparison.score}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
