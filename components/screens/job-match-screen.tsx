"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MapPin, Briefcase, BadgeCheck, Users, DollarSign, Sparkles } from "lucide-react"
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
]

export default function JobMatchScreen({ onJobSelect, onBack }: JobMatchScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen flex flex-col bg-background"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-3 border-b border-border sticky top-0 bg-background z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">Việc làm phù hợp</h1>
          <p className="text-xs text-muted-foreground">{sampleJobs.length} công việc dành cho bạn</p>
        </div>
      </div>

      {/* Job List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {sampleJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <JobCard job={job} onClick={() => onJobSelect(job)} />
          </motion.div>
        ))}
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
      className="w-full p-4 bg-card rounded-xl border border-border text-left hover:border-primary transition-colors"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
          {job.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{job.title}</h3>
            {job.isVerified && (
              <BadgeCheck className="w-4 h-4 text-accent flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${getScoreColor(job.matchScore)}`}>
          {job.matchScore}%
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Tag icon={<DollarSign className="w-3 h-3" />} label={job.salary} />
        <Tag icon={<MapPin className="w-3 h-3" />} label={job.location} />
        <Tag icon={<Briefcase className="w-3 h-3" />} label={job.workMode} />
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3">
        {job.hasMentor && (
          <div className="flex items-center gap-1 text-xs text-accent">
            <Users className="w-3 h-3" />
            <span>Có mentor</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-xs text-primary">
          <Sparkles className="w-3 h-3" />
          <span>Phù hợp với bạn</span>
        </div>
      </div>
    </button>
  )
}

function Tag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
      {icon}
      {label}
    </span>
  )
}
