"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, CheckCircle2, Loader2, FileText, Upload, Sparkles } from "lucide-react"
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
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => {
      onSuccess()
    }, 2000)
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-28 h-28 rounded-full bg-accent flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-14 h-14 text-accent-foreground" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-foreground mb-3 text-center"
        >
          Ứng tuyển thành công!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground text-center mb-2"
        >
          Hồ sơ của bạn đã được gửi đến {job.company}
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-center"
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
      className="min-h-[calc(100vh-4rem)]"
    >
      {/* Sub Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 max-w-3xl mx-auto">
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
              <p className="text-sm text-muted-foreground">{job.title} - {job.company}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Job Summary */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                {job.logo}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                <p className="text-muted-foreground">{job.company} - {job.location}</p>
              </div>
            </div>
          </div>

          {/* Application Info */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold text-foreground">Thông tin ứng tuyển</h2>
            
            {/* Profile Card */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Hồ sơ Career Compass</p>
                  <p className="text-sm text-muted-foreground">Đã tạo từ Smart Profile Builder</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm font-medium">Digital Marketing</span>
                <span className="px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm font-medium">Data Analysis</span>
                <span className="px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm font-medium">+4 kỹ năng</span>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Cover Letter</p>
                    <p className="text-sm text-muted-foreground">Tùy chọn - tăng cơ hội được chọn</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl">
                  Thêm file
                </Button>
              </div>
            </div>

            {/* Match Score */}
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Độ phù hợp</p>
                    <p className="text-sm text-muted-foreground">Dựa trên profile của bạn</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-primary">{job.matchScore}%</span>
                  <p className="text-sm text-accent font-medium">Rất phù hợp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="lg"
              className="w-full sm:w-auto h-14 px-16 text-lg font-semibold rounded-xl"
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
            <p className="text-sm text-muted-foreground text-center mt-4">
              Bằng việc ứng tuyển, bạn đồng ý chia sẻ hồ sơ với nhà tuyển dụng
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
