"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GraduationCap, Briefcase, ChevronLeft } from "lucide-react"
import type { CareerStage } from "@/app/page"

interface CareerStageScreenProps {
  onSelect: (stage: CareerStage) => void
  onBack: () => void
}

export default function CareerStageScreen({ onSelect, onBack }: CareerStageScreenProps) {
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
      <div className="flex-1 flex flex-col px-6 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Bạn đang ở giai đoạn nào?
          </h1>
          <p className="text-muted-foreground mb-8">
            Chọn để chúng tôi cá nhân hóa trải nghiệm cho bạn
          </p>
        </motion.div>

        {/* Selection Cards */}
        <div className="space-y-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <StageCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Sinh viên / Mới tốt nghiệp"
              description="Đang tìm thực tập hoặc công việc đầu tiên"
              onClick={() => onSelect("student")}
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <StageCard
              icon={<Briefcase className="w-8 h-8" />}
              title="Nhân sự văn phòng"
              description="Đang tìm cơ hội nghề nghiệp tốt hơn"
              onClick={() => onSelect("office")}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

interface StageCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}

function StageCard({ icon, title, description, onClick }: StageCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-6 bg-card rounded-2xl border-2 border-border hover:border-primary transition-all duration-200 text-left group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </button>
  )
}
