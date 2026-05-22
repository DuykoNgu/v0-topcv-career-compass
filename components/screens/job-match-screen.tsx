"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, BadgeCheck, Users, DollarSign, Sparkles, Filter, Search } from "lucide-react"
import type { UserProfile, Job } from "@/app/page"

interface JobMatchScreenProps {
  userProfile: UserProfile
  onJobSelect: (job: Job) => void
  onBack: () => void
}

const sampleJobs: Job[] = [
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
  },
  {
    id: "2",
    title: "Business Development",
    company: "StartupXYZ",
    logo: "SX",
    salary: "18-25 triệu",
    workMode: "Remote",
    hasMentor: true,
    isVerified: true,
    matchScore: 89,
    location: "TP.HCM",
    description: "Tìm kiếm và phát triển khách hàng mới, xây dựng mối quan hệ đối tác chiến lược.",
    requirements: ["Kỹ năng giao tiếp tốt", "Kinh nghiệm B2B sales", "Tiếng Anh giao tiếp"],
    benefits: ["ESOP", "Remote 100%", "Budget học tập"],
  },
  {
    id: "3",
    title: "Content Marketing Specialist",
    company: "MediaOne",
    logo: "M1",
    salary: "12-18 triệu",
    workMode: "On-site",
    hasMentor: false,
    isVerified: true,
    matchScore: 85,
    location: "Đà Nẵng",
    description: "Lên kế hoạch và sản xuất nội dung cho website, blog và các kênh social media của công ty.",
    requirements: ["Kỹ năng viết content", "SEO cơ bản", "Sáng tạo và chủ động"],
    benefits: ["Du lịch hàng năm", "Thưởng KPI", "Môi trường trẻ"],
  },
  {
    id: "4",
    title: "Junior Product Manager",
    company: "FintechPro",
    logo: "FP",
    salary: "20-28 triệu",
    workMode: "Hybrid",
    hasMentor: true,
    isVerified: false,
    matchScore: 82,
    location: "Hà Nội",
    description: "Hỗ trợ quản lý sản phẩm, nghiên cứu thị trường và phối hợp với team phát triển.",
    requirements: ["Hiểu biết về fintech", "Kỹ năng phân tích", "Tiếng Anh tốt"],
    benefits: ["Lương tháng 13-14", "Bảo hiểm cao cấp", "Gym miễn phí"],
  },
  {
    id: "5",
    title: "Digital Marketing Manager",
    company: "E-Commerce Plus",
    logo: "EP",
    salary: "25-35 triệu",
    workMode: "Hybrid",
    hasMentor: false,
    isVerified: true,
    matchScore: 78,
    location: "TP.HCM",
    description: "Quản lý chiến lược digital marketing tổng thể, dẫn dắt team marketing 5-7 người.",
    requirements: ["5+ năm kinh nghiệm", "Quản lý team", "E-commerce experience"],
    benefits: ["Bonus theo doanh số", "Laptop + phone", "Parking free"],
  },
  {
    id: "6",
    title: "Data Analyst",
    company: "DataTech VN",
    logo: "DT",
    salary: "18-25 triệu",
    workMode: "Remote",
    hasMentor: true,
    isVerified: true,
    matchScore: 75,
    location: "Remote",
    description: "Phân tích dữ liệu kinh doanh, tạo báo cáo và dashboard cho các bộ phận.",
    requirements: ["SQL, Python/R", "Data visualization", "Critical thinking"],
    benefits: ["Remote toàn thời gian", "Flexible hours", "Learning budget"],
  },
]

export default function JobMatchScreen({ onJobSelect }: JobMatchScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-[calc(100vh-4rem)]"
    >
      {/* Sub Header with Search */}
      <div className="border-b border-border bg-card sticky top-16 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Việc làm phù hợp với bạn</h1>
              <p className="text-muted-foreground">{sampleJobs.length} công việc được AI gợi ý</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm việc làm..."
                  className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sampleJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <JobCard job={job} onClick={() => onJobSelect(job)} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

interface JobCardProps {
  job: Job
  onClick: () => void
}

function JobCard({ job, onClick }: JobCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-accent text-accent-foreground"
    if (score >= 80) return "bg-primary text-primary-foreground"
    return "bg-muted text-muted-foreground"
  }

  return (
    <button
      onClick={onClick}
      className="w-full p-6 bg-card rounded-2xl border border-border text-left hover:border-primary hover:shadow-lg transition-all duration-200 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
          {job.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-foreground truncate">{job.title}</h3>
            {job.isVerified && (
              <BadgeCheck className="w-5 h-5 text-accent flex-shrink-0" />
            )}
          </div>
          <p className="text-muted-foreground">{job.company}</p>
        </div>
      </div>

      {/* Match Score */}
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold mb-4 w-fit ${getScoreColor(job.matchScore)}`}>
        <Sparkles className="w-4 h-4" />
        {job.matchScore}% phù hợp
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4 flex-1">
        <Tag icon={<DollarSign className="w-3.5 h-3.5" />} label={job.salary} />
        <Tag icon={<MapPin className="w-3.5 h-3.5" />} label={job.location} />
        <Tag icon={<Briefcase className="w-3.5 h-3.5" />} label={job.workMode} />
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        {job.hasMentor && (
          <div className="flex items-center gap-1.5 text-sm text-accent">
            <Users className="w-4 h-4" />
            <span>Có mentor</span>
          </div>
        )}
      </div>
    </button>
  )
}

function Tag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-muted-foreground">
      {icon}
      {label}
    </span>
  )
}
