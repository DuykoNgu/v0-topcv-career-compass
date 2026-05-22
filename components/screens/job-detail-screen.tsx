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
  ExternalLink,
  Sparkles,
  TrendingUp,
  CheckCircle2
} from "lucide-react"
import type { UserProfile, Job } from "@/app/page"

interface JobDetailScreenProps {
  job: Job
  userProfile: UserProfile
  onApply: () => void
  onViewFit: () => void
  onBack: () => void
}

function getComparison(job: Job, survey: any) {
  if (!survey) return null

  const prevSalary = Number(survey.salary) || 0
  const jobMin = job.salaryMin || 0
  
  // Salary assessment
  let salaryText = ""
  let salaryStatus: "better" | "equal" | "worse" = "equal"
  if (jobMin > prevSalary) {
    const diff = jobMin - prevSalary
    salaryText = `+${diff}M (+${Math.round((diff / prevSalary) * 100)}%)`
    salaryStatus = "better"
  } else if (jobMin === prevSalary) {
    salaryText = "Bằng nhau"
    salaryStatus = "equal"
  } else {
    salaryText = `-${prevSalary - jobMin}M`
    salaryStatus = "worse"
  }

  // Work Mode assessment
  let workModeText = ""
  let workModeStatus: "better" | "equal" | "worse" = "equal"
  const isOldFlexible = survey.workMode === "Hybrid" || survey.workMode === "Remote"
  const isNewFlexible = job.workMode === "Hybrid" || job.workMode === "Remote"
  
  if (!isOldFlexible && isNewFlexible) {
    workModeText = `Linh hoạt hơn`
    workModeStatus = "better"
  } else if (isOldFlexible && !isNewFlexible) {
    workModeText = `Ít linh hoạt hơn`
    workModeStatus = "worse"
  } else {
    workModeText = "Tương đương"
    workModeStatus = "equal"
  }

  // Mentor assessment
  let mentorText = ""
  let mentorStatus: "better" | "equal" | "worse" = "equal"
  if (!survey.hasMentor && job.hasMentor) {
    mentorText = "Cải thiện (Có)"
    mentorStatus = "better"
  } else if (survey.hasMentor && !job.hasMentor) {
    mentorText = "Kém hơn (Không)"
    mentorStatus = "worse"
  } else {
    mentorText = "Tương đương"
    mentorStatus = "equal"
  }

  // Check resolved pain points
  const resolvedIssues: string[] = []
  survey.dislikedFactors?.forEach((factor: string) => {
    if (factor.includes("Lương") && jobMin > prevSalary) {
      resolvedIssues.push("Khắc phục LƯƠNG THẤP: Mức lương khởi điểm mới cao hơn.")
    }
    if (factor.includes("Mentor") && job.hasMentor) {
      resolvedIssues.push("Giải quyết THIẾU MENTOR: Có mentor hướng dẫn bài bản.")
    }
    if ((factor.includes("gò bó") || factor.includes("Onsite 100%")) && isNewFlexible) {
      resolvedIssues.push("Giải tỏa MÔI TRƯỜNG GÒ BÓ: Chế độ làm việc linh hoạt.")
    }
    if (factor.includes("thăng tiến") && job.hasMentor) {
      resolvedIssues.push("Cải thiện LỘ TRÌNH THĂNG TIẾN: Được mentor dẫn dắt định hướng.")
    }
  })

  // Expectations met
  const metExpectations: string[] = []
  survey.expectedImprovements?.forEach((exp: string) => {
    if (exp.includes("Lương") && jobMin > prevSalary) {
      metExpectations.push("Thu nhập hấp dẫn & cạnh tranh hơn.")
    }
    if (exp.includes("Mentor") && job.hasMentor) {
      metExpectations.push("Có mentor hỗ trợ tận tình.")
    }
    if (exp.includes("Hybrid/Remote") && isNewFlexible) {
      metExpectations.push(`Chế độ làm việc ${job.workMode} linh hoạt.`)
    }
  })

  // Overall improvement score calculation matching match-screen
  let scorePoints = 50
  if (jobMin > prevSalary) {
    scorePoints += Math.min(25, ((jobMin - prevSalary) / prevSalary) * 50)
  } else if (jobMin === prevSalary) {
    scorePoints += 5
  } else {
    scorePoints -= 15
  }
  if (!isOldFlexible && isNewFlexible) scorePoints += 15
  if (!survey.hasMentor && job.hasMentor) scorePoints += 15
  
  survey.dislikedFactors?.forEach((factor: string) => {
    if (factor.includes("Lương") && jobMin > prevSalary) scorePoints += 10
    if (factor.includes("Mentor") && job.hasMentor) scorePoints += 10
    if ((factor.includes("gò bó") || factor.includes("Onsite 100%")) && isNewFlexible) scorePoints += 10
  })
  
  const finalScore = Math.min(100, Math.max(0, Math.round(scorePoints)))

  return {
    score: finalScore,
    prevSalary,
    prevWorkMode: survey.workMode,
    prevHasMentor: survey.hasMentor,
    prevTitle: survey.title,
    salaryText,
    salaryStatus,
    workModeText,
    workModeStatus,
    mentorText,
    mentorStatus,
    resolvedIssues,
    metExpectations
  }
}

export default function JobDetailScreen({ job, userProfile, onApply, onViewFit, onBack }: JobDetailScreenProps) {
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

              {/* So sánh công việc cũ */}
              {(() => {
                const survey = userProfile?.previousJobSurvey
                const comparison = getComparison(job, survey)
                if (!comparison) return null

                return (
                  <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                        <h3 className="text-lg font-bold text-foreground">Đối chiếu với Công việc cũ</h3>
                      </div>
                      <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        <span className="text-xs text-muted-foreground font-medium">Chỉ số cải thiện:</span>
                        <span className="text-sm font-extrabold text-emerald-500">{comparison.score}%</span>
                      </div>
                    </div>

                    {/* Table-like Grid */}
                    <div className="grid grid-cols-3 gap-4 text-sm pb-4 border-b border-border">
                      <div className="font-semibold text-muted-foreground">Tiêu chí</div>
                      <div className="font-semibold text-muted-foreground truncate">Cũ ({comparison.prevTitle || "Công việc cũ"})</div>
                      <div className="font-semibold text-foreground truncate">Mới ({job.title})</div>

                      {/* Row 1: Lương */}
                      <div className="py-1 flex items-center gap-1.5 font-medium text-foreground">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        Mức lương
                      </div>
                      <div className="py-1 text-muted-foreground">{comparison.prevSalary}M /tháng</div>
                      <div className="py-1 font-semibold flex flex-wrap items-center gap-2">
                        <span>{job.salary}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                          comparison.salaryStatus === "better" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                          comparison.salaryStatus === "worse" ? "bg-destructive/10 text-destructive" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {comparison.salaryText}
                        </span>
                      </div>

                      {/* Row 2: Hình thức */}
                      <div className="py-1 flex items-center gap-1.5 font-medium text-foreground">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        Hình thức
                      </div>
                      <div className="py-1 text-muted-foreground">{comparison.prevWorkMode}</div>
                      <div className="py-1 font-semibold flex flex-wrap items-center gap-2">
                        <span>{job.workMode}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                          comparison.workModeStatus === "better" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                          comparison.workModeStatus === "worse" ? "bg-destructive/10 text-destructive" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {comparison.workModeText}
                        </span>
                      </div>

                      {/* Row 3: Hướng dẫn */}
                      <div className="py-1 flex items-center gap-1.5 font-medium text-foreground">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        Mentor
                      </div>
                      <div className="py-1 text-muted-foreground">{comparison.prevHasMentor ? "Có Mentor" : "Không có"}</div>
                      <div className="py-1 font-semibold flex flex-wrap items-center gap-2">
                        <span>{job.hasMentor ? "Có Mentor" : "Không có"}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                          comparison.mentorStatus === "better" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                          comparison.mentorStatus === "worse" ? "bg-destructive/10 text-destructive" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {comparison.mentorText}
                        </span>
                      </div>
                    </div>

                    {/* Resolved Pain Points & Expected Improvements */}
                    {(comparison.resolvedIssues.length > 0 || comparison.metExpectations.length > 0) && (
                      <div className="space-y-4 pt-2">
                        {comparison.resolvedIssues.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              Vấn đề cũ được giải quyết:
                            </h4>
                            <ul className="space-y-1.5 pl-6 list-disc text-xs text-muted-foreground leading-relaxed">
                              {comparison.resolvedIssues.map((issue, idx) => (
                                <li key={idx}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {comparison.metExpectations.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-primary flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-primary" />
                              Kỳ vọng được đáp ứng:
                            </h4>
                            <ul className="space-y-1.5 pl-6 list-disc text-xs text-muted-foreground leading-relaxed">
                              {comparison.metExpectations.map((exp, idx) => (
                                <li key={idx}>{exp}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })()}

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
