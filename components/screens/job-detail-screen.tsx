"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  MapPin, 
  Briefcase, 
  BadgeCheck, 
  Users, 
  DollarSign, 
  Clock,
  Check,
  Lightbulb,
  Building2,
  ExternalLink
} from "lucide-react"
import type { UserProfile, Job } from "@/app/page"

interface JobDetailScreenProps {
  job: Job
  userProfile: UserProfile
  onApply: () => void
  onViewFit: () => void
  onBack: () => void
}

export default function JobDetailScreen({ job, onApply, onViewFit, onBack }: JobDetailScreenProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-accent text-accent-foreground"
    if (score >= 80) return "bg-primary text-primary-foreground"
    return "bg-muted text-muted-foreground"
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-[calc(100vh-4rem)]"
    >
      {/* Sub Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 max-w-5xl mx-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="font-semibold text-foreground">{job.title}</h1>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <Button onClick={onApply} className="hidden lg:flex">
              Ứng tuyển ngay
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Header */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                    {job.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold text-foreground">{job.title}</h2>
                      {job.isVerified && (
                        <BadgeCheck className="w-6 h-6 text-accent" />
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground mb-3">{job.company}</p>
                    <div className="flex flex-wrap gap-3">
                      <InfoTag icon={<DollarSign className="w-4 h-4" />} label={job.salary} />
                      <InfoTag icon={<MapPin className="w-4 h-4" />} label={job.location} />
                      <InfoTag icon={<Briefcase className="w-4 h-4" />} label={job.workMode} />
                      <InfoTag icon={<Clock className="w-4 h-4" />} label="Full-time" />
                    </div>
                  </div>
                </div>

                {job.hasMentor && (
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-foreground font-medium">Có mentor hướng dẫn cho nhân viên mới</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Mô tả công việc
                </h3>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </div>

              {/* Requirements */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Yêu cầu</h3>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quyền lợi</h3>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Match Score Card */}
              <button
                onClick={onViewFit}
                className="w-full p-6 bg-card rounded-2xl border border-border hover:border-primary transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground font-medium">Độ phù hợp</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className={`text-5xl font-bold ${job.matchScore >= 90 ? "text-accent" : "text-primary"}`}>
                    {job.matchScore}
                  </span>
                  <span className="text-xl text-muted-foreground">%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
                  <div 
                    className={`h-full rounded-full ${job.matchScore >= 90 ? "bg-accent" : "bg-primary"}`}
                    style={{ width: `${job.matchScore}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Nhấn để xem phân tích chi tiết
                </p>
              </button>

              {/* Why This Fits */}
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Tại sao phù hợp?</h3>
                    <p className="text-sm text-muted-foreground">
                      Kỹ năng Marketing và Data Analysis của bạn hoàn toàn đáp ứng yêu cầu. Công ty có mentor hỗ trợ phát triển career path.
                    </p>
                  </div>
                </div>
              </div>

              {/* Apply Button (Desktop Sidebar) */}
              <Button
                onClick={onApply}
                size="lg"
                className="w-full h-14 text-lg font-semibold rounded-xl"
              >
                Ứng tuyển ngay
              </Button>

              {/* Company Info */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Về công ty</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quy mô</span>
                    <span className="text-foreground">50-100 nhân viên</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngành nghề</span>
                    <span className="text-foreground">Technology</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Website</span>
                    <span className="text-primary">techviet.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function InfoTag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-sm text-muted-foreground">
      {icon}
      {label}
    </span>
  )
}
