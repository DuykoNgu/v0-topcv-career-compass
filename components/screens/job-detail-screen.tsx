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
  X,
  Lightbulb,
  Building2
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
          <h1 className="font-semibold text-foreground truncate">{job.title}</h1>
          <p className="text-xs text-muted-foreground">{job.company}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Company Header */}
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {job.logo}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-foreground">{job.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{job.company}</span>
                {job.isVerified && (
                  <BadgeCheck className="w-4 h-4 text-accent" />
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <InfoTag icon={<DollarSign className="w-4 h-4" />} label={job.salary} />
            <InfoTag icon={<MapPin className="w-4 h-4" />} label={job.location} />
            <InfoTag icon={<Briefcase className="w-4 h-4" />} label={job.workMode} />
            <InfoTag icon={<Clock className="w-4 h-4" />} label="Full-time" />
          </div>

          {/* Match Score Card */}
          <button
            onClick={onViewFit}
            className="w-full p-4 bg-card rounded-xl border border-border flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${getScoreColor(job.matchScore)}`}>
                {job.matchScore}%
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Độ phù hợp</p>
                <p className="text-xs text-muted-foreground">Xem phân tích chi tiết</p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
          </button>
        </div>

        {/* Description */}
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Mô tả công việc
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground mb-3">Yêu cầu</h3>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground mb-3">Quyền lợi</h3>
          <ul className="space-y-2">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why This Fits */}
        <div className="px-6 py-4">
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Tại sao phù hợp với bạn?</h3>
                <p className="text-sm text-muted-foreground">
                  Kỹ năng Marketing và Data Analysis của bạn hoàn toàn đáp ứng yêu cầu. 
                  Công ty có mentor hỗ trợ phát triển career path.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        {job.hasMentor && (
          <div className="px-6 py-4">
            <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-sm text-foreground font-medium">Có mentor hướng dẫn cho nhân viên mới</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-4 border-t border-border">
        <Button
          onClick={onApply}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-xl"
        >
          Ứng tuyển ngay
        </Button>
      </div>
    </motion.div>
  )
}

function InfoTag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-muted-foreground">
      {icon}
      {label}
    </span>
  )
}
