"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GraduationCap, Briefcase, ChevronLeft, ArrowRight } from "lucide-react"
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
      className="min-h-[calc(100vh-4rem)] flex flex-col"
    >
      {/* Progress Bar */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 max-w-3xl mx-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[10%]" />
              </div>
            </div>
            <span className="text-sm text-muted-foreground font-medium flex-shrink-0">Bước 1/5</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Bạn đang ở giai đoạn nào?
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Chọn để chúng tôi cá nhân hóa trải nghiệm và gợi ý phù hợp nhất cho bạn
            </p>
          </motion.div>

          {/* Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <StageCard
                icon={<GraduationCap className="w-10 h-10" />}
                title="Sinh viên / Mới tốt nghiệp"
                description="Đang tìm thực tập hoặc công việc đầu tiên. Muốn khám phá career path phù hợp."
                features={["Gợi ý ngành nghề", "Hướng dẫn tạo CV đầu tiên", "Việc làm part-time/intern"]}
                onClick={() => onSelect("student")}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <StageCard
                icon={<Briefcase className="w-10 h-10" />}
                title="Nhân sự văn phòng"
                description="Đã đi làm và đang tìm cơ hội nghề nghiệp tốt hơn hoặc chuyển ngành."
                features={["Match với vị trí senior", "Phân tích kỹ năng chuyên sâu", "Đề xuất lộ trình thăng tiến"]}
                onClick={() => onSelect("office")}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface StageCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  onClick: () => void
}

function StageCard({ icon, title, description, features, onClick }: StageCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-8 bg-card rounded-2xl border-2 border-border hover:border-primary transition-all duration-200 text-left group h-full flex flex-col"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-5">{description}</p>
      
      <ul className="space-y-2 mb-6 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
        <span>Chọn</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  )
}
