"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Sparkles, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import type { UserProfile } from "@/app/page"

interface CareerCompassResultProps {
  userProfile: UserProfile
  onCreateProfile: () => void
  onViewJobs: () => void
  onBack: () => void
}

const matchedRoles = [
  {
    title: "Marketing Executive",
    matchScore: 92,
    reason: "Kỹ năng communication và social media phù hợp với vị trí này",
    salary: "15-25 triệu",
    demand: "Cao",
  },
  {
    title: "Business Analyst",
    matchScore: 87,
    reason: "Problem solving và data analysis là điểm mạnh của bạn",
    salary: "18-30 triệu",
    demand: "Rất cao",
  },
  {
    title: "Product Manager",
    matchScore: 82,
    reason: "Leadership và project management skills phù hợp",
    salary: "25-40 triệu",
    demand: "Cao",
  },
]

export default function CareerCompassResult({ onCreateProfile, onViewJobs, onBack }: CareerCompassResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border">
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
            <div>
              <h1 className="font-semibold text-foreground">Kết quả Career Compass</h1>
              <p className="text-sm text-muted-foreground">Dựa trên kỹ năng và mục tiêu của bạn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <div className="w-20 h-20 rounded-2xl bg-accent mx-auto mb-5 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-accent-foreground" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              AI đã phân tích xong!
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Dưới đây là top 3 vị trí nghề nghiệp phù hợp nhất với profile của bạn
            </p>
          </motion.div>

          {/* Matched Roles Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {matchedRoles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <RoleCard
                  rank={index + 1}
                  title={role.title}
                  matchScore={role.matchScore}
                  reason={role.reason}
                  salary={role.salary}
                  demand={role.demand}
                />
              </motion.div>
            ))}
          </div>

          {/* AI Insight */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-6 bg-primary/5 rounded-2xl border border-primary/20 mb-10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Gợi ý từ AI</h3>
                <p className="text-muted-foreground">
                  Với profile hiện tại, bạn có thể tăng match score lên 95% bằng cách bổ sung chứng chỉ Google Analytics hoặc Data Analysis. 
                  Các vị trí Marketing Executive đang có nhu cầu tuyển dụng cao trong Q2/2026.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={onCreateProfile}
              size="lg"
              className="h-14 px-10 text-lg font-semibold rounded-xl"
            >
              Tạo hồ sơ chuyên nghiệp
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={onViewJobs}
              variant="outline"
              size="lg"
              className="h-14 px-10 text-lg font-semibold rounded-xl"
            >
              Xem việc làm ngay
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

interface RoleCardProps {
  rank: number
  title: string
  matchScore: number
  reason: string
  salary: string
  demand: string
}

function RoleCard({ rank, title, matchScore, reason, salary, demand }: RoleCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-accent"
    if (score >= 80) return "text-primary"
    return "text-muted-foreground"
  }

  return (
    <div className={`p-6 bg-card rounded-2xl border-2 h-full flex flex-col ${
      rank === 1 ? "border-accent" : "border-border"
    }`}>
      {rank === 1 && (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-4 w-fit">
          <CheckCircle className="w-3 h-3" />
          Best Match
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
            rank === 1 
              ? "bg-accent text-accent-foreground" 
              : "bg-muted text-muted-foreground"
          }`}>
            {rank}
          </div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
        </div>
      </div>

      <div className="flex items-baseline gap-1 mb-4">
        <span className={`text-4xl font-bold ${getScoreColor(matchScore)}`}>
          {matchScore}
        </span>
        <span className="text-lg text-muted-foreground">% phù hợp</span>
      </div>

      <div className="mb-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              matchScore >= 90 ? "bg-accent" : "bg-primary"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${matchScore}%` }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 flex-1">{reason}</p>

      <div className="flex items-center justify-between pt-4 border-t border-border text-sm">
        <div>
          <span className="text-muted-foreground">Mức lương: </span>
          <span className="font-semibold text-foreground">{salary}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Nhu cầu: </span>
          <span className="font-semibold text-accent">{demand}</span>
        </div>
      </div>
    </div>
  )
}
