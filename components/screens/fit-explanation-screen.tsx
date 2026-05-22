"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Check, X, TrendingUp, Target, Zap, ArrowRight } from "lucide-react"
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
              <h1 className="font-semibold text-foreground">Phân tích độ phù hợp</h1>
              <p className="text-sm text-muted-foreground">{job.title} - {job.company}</p>
            </div>
            <Button onClick={onApply} className="hidden lg:flex">
              Ứng tuyển ngay
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Overall Score */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8 mb-8"
          >
            <div className="w-32 h-32 rounded-full bg-accent mx-auto mb-5 flex items-center justify-center">
              <span className="text-4xl font-bold text-accent-foreground">{job.matchScore}%</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Rất phù hợp!</h2>
            <p className="text-lg text-muted-foreground">Profile của bạn match tốt với vị trí này</p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Kỹ năng phù hợp</h3>
              </div>
              <div className="space-y-4">
                {fitData.matchedSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-foreground">{skill.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-28 h-2.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            skill.level === "high" ? "bg-accent w-full" : "bg-primary w-3/4"
                          }`}
                        />
                      </div>
                      <span className={`text-sm font-medium w-20 text-right ${
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
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Cần bổ sung</h3>
              </div>
              <div className="space-y-3">
                {fitData.missingSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <span className="text-foreground">{skill.name}</span>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                      skill.importance === "recommended" 
                        ? "bg-orange-500/20 text-orange-600" 
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
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Điểm mạnh của bạn</h3>
              </div>
              <ul className="space-y-3">
                {fitData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
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
              className="bg-primary/5 rounded-2xl border border-primary/20 p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Gợi ý cải thiện</h3>
              </div>
              <ul className="space-y-4">
                {fitData.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 lg:hidden">
            <Button
              onClick={onApply}
              size="lg"
              className="w-full h-14 text-lg font-semibold rounded-xl"
            >
              Ứng tuyển ngay
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
