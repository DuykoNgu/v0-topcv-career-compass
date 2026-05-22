"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Sparkles, TrendingUp, ArrowRight } from "lucide-react"
import type { UserProfile } from "@/app/page"

interface CareerCompassResultProps {
  userProfile: UserProfile
  onCreateProfile: () => void
  onBack: () => void
}

const matchedRoles = [
  {
    title: "Marketing Executive",
    matchScore: 92,
    reason: "Kỹ năng communication và social media phù hợp với vị trí này",
  },
  {
    title: "Business Analyst",
    matchScore: 87,
    reason: "Problem solving và data analysis là điểm mạnh của bạn",
  },
  {
    title: "Product Manager",
    matchScore: 82,
    reason: "Leadership và project management skills phù hợp",
  },
]

export default function CareerCompassResult({ onCreateProfile, onBack }: CareerCompassResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen flex flex-col bg-background"
    >
      {/* Header */}
      <div className="px-4 py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        {/* Hero */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Kết quả Career Compass
          </h1>
          <p className="text-muted-foreground">
            Dựa trên kỹ năng và mục tiêu của bạn
          </p>
        </motion.div>

        {/* Matched Roles */}
        <div className="space-y-4">
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
              />
            </motion.div>
          ))}
        </div>

        {/* Insight */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Gợi ý từ AI</h3>
              <p className="text-sm text-muted-foreground">
                Với profile hiện tại, bạn có thể tăng match score lên 95% bằng cách bổ sung chứng chỉ Google Analytics hoặc Data Analysis.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="px-6 pb-8"
      >
        <Button
          onClick={onCreateProfile}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-xl"
        >
          Tạo hồ sơ chuyên nghiệp
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

interface RoleCardProps {
  rank: number
  title: string
  matchScore: number
  reason: string
}

function RoleCard({ rank, title, matchScore, reason }: RoleCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-accent"
    if (score >= 80) return "text-primary"
    return "text-muted-foreground"
  }

  return (
    <div className="p-4 bg-card rounded-xl border border-border">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            rank === 1 
              ? "bg-accent text-accent-foreground" 
              : "bg-muted text-muted-foreground"
          }`}>
            {rank}
          </div>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <span className={`text-2xl font-bold ${getScoreColor(matchScore)}`}>
            {matchScore}
          </span>
          <span className="text-sm text-muted-foreground">%</span>
        </div>
      </div>
      <div className="mb-3">
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
      <p className="text-sm text-muted-foreground">{reason}</p>
    </div>
  )
}
