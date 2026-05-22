"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, CheckCircle2, Loader2, FileText, Upload } from "lucide-react"
import type { Job } from "@/app/page"

interface ApplyScreenProps {
  job: Job
  onSuccess: () => void
  onBack: () => void
}

export default function ApplyScreen({ job, onSuccess, onBack }: ApplyScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
    // Auto navigate after success
    setTimeout(() => {
      onSuccess()
    }, 2000)
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-background px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-accent-foreground" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-foreground mb-2 text-center"
        >
          Ứng tuyển thành công!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-center mb-4"
        >
          Hồ sơ của bạn đã được gửi đến {job.company}
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground text-center"
        >
          Nhà tuyển dụng sẽ liên hệ trong 3-5 ngày làm việc
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen flex flex-col bg-background"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-3 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">Ứng tuyển</h1>
          <p className="text-xs text-muted-foreground">{job.title} - {job.company}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        {/* Job Summary */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
              {job.logo}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
            </div>
          </div>
        </div>

        {/* Application Info */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Thông tin ứng tuyển</h2>
          
          {/* Profile Card */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Hồ sơ Career Compass</p>
                <p className="text-xs text-muted-foreground">Đã tạo từ Smart Profile Builder</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">Digital Marketing</span>
              <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">Data Analysis</span>
              <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">+4 kỹ năng</span>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Cover Letter</p>
                  <p className="text-xs text-muted-foreground">Tùy chọn</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg">
                Thêm
              </Button>
            </div>
          </div>

          {/* Match Score */}
          <div className="bg-primary/5 rounded-xl border border-primary/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Độ phù hợp</p>
                <p className="text-sm text-muted-foreground">Dựa trên profile của bạn</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">{job.matchScore}%</span>
                <p className="text-xs text-accent">Rất phù hợp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-4 border-t border-border">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-xl"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Đang gửi...
            </>
          ) : (
            "Gửi ứng tuyển"
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Bằng việc ứng tuyển, bạn đồng ý chia sẻ hồ sơ với nhà tuyển dụng
        </p>
      </div>
    </motion.div>
  )
}
