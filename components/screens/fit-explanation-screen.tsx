"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Check, X, TrendingUp, Target, Zap } from "lucide-react"
import type { UserProfile, Job } from "@/app/page"

interface FitExplanationScreenProps {
  job: Job
  userProfile: UserProfile
  onApply: () => void
  onBack: () => void
}

const fitData = {
  matchedSkills: [
    { name: "Digital Marketing", level: "high" },
    { name: "Data Analysis", level: "high" },
    { name: "Communication", level: "medium" },
    { name: "Project Management", level: "medium" },
  ],
  missingSkills: [
    { name: "Google Ads Certification", importance: "recommended" },
    { name: "SQL basics", importance: "optional" },
  ],
  strengths: [
    "Kinh nghiệm làm việc với social media campaigns",
    "Kỹ năng phân tích và báo cáo data",
    "Thái độ học hỏi và phát triển",
  ],
  recommendations: [
    "Hoàn thành chứng chỉ Google Ads để tăng 5% match score",
    "Bổ sung thêm portfolio về case studies",
    "Chuẩn bị câu hỏi về KPIs và metrics khi phỏng vấn",
  ],
}

export default function FitExplanationScreen({ job, onApply, onBack }: FitExplanationScreenProps) {
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
          <h1 className="font-semibold text-foreground">Phân tích độ phù hợp</h1>
          <p className="text-xs text-muted-foreground">{job.title} - {job.company}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {/* Overall Score */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-6"
        >
          <div className="w-24 h-24 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold text-accent-foreground">{job.matchScore}%</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">Rất phù hợp!</h2>
          <p className="text-muted-foreground">Profile của bạn match tốt với vị trí này</p>
        </motion.div>

        {/* Matched Skills */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Check className="w-4 h-4 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground">Kỹ năng phù hợp</h3>
          </div>
          <div className="space-y-3">
            {fitData.matchedSkills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{skill.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        skill.level === "high" ? "bg-accent w-full" : "bg-primary w-3/4"
                      }`}
                    />
                  </div>
                  <span className={`text-xs font-medium ${
                    skill.level === "high" ? "text-accent" : "text-primary"
                  }`}>
                    {skill.level === "high" ? "Cao" : "Trung bình"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Missing Skills */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <X className="w-4 h-4 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground">Cần bổ sung</h3>
          </div>
          <div className="space-y-2">
            {fitData.missingSkills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                <span className="text-sm text-foreground">{skill.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  skill.importance === "recommended" 
                    ? "bg-warning/20 text-warning-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {skill.importance === "recommended" ? "Khuyến khích" : "Tùy chọn"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Strengths */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Điểm mạnh của bạn</h3>
          </div>
          <ul className="space-y-2">
            {fitData.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-primary/5 rounded-xl border border-primary/20 p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Gợi ý cải thiện</h3>
          </div>
          <ul className="space-y-3">
            {fitData.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  {index + 1}
                </span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </motion.div>
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
