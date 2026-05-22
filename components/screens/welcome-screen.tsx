"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Compass, Sparkles, Target, ArrowRight } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-background"
    >
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
            <Compass className="w-10 h-10 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-foreground text-center mb-3"
        >
          TopCV Career Compass
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-center text-lg mb-8 max-w-xs"
        >
          Khám phá công việc phù hợp với kỹ năng và mục tiêu của bạn.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-primary font-semibold text-center mb-12"
        >
          Tìm đúng việc. Đi đúng hướng.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 w-full max-w-xs mb-12"
        >
          <FeatureItem
            icon={<Target className="w-5 h-5" />}
            text="Đánh giá kỹ năng cá nhân"
          />
          <FeatureItem
            icon={<Sparkles className="w-5 h-5" />}
            text="AI gợi ý nghề nghiệp phù hợp"
          />
          <FeatureItem
            icon={<Compass className="w-5 h-5" />}
            text="Xây dựng hồ sơ chuyên nghiệp"
          />
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="px-6 pb-8"
      >
        <Button
          onClick={onStart}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-xl"
        >
          Bắt đầu hành trình
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <span className="text-foreground font-medium">{text}</span>
    </div>
  )
}
