"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Compass, Sparkles, Target, ArrowRight, Users, TrendingUp, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { toast } = useToast()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-background"
    >
      {/* Hero Section */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-6 lg:px-16 py-12 lg:py-20">
        {/* Left Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 max-w-xl text-center lg:text-left"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
              <Compass className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">TopCV Career Compass</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            Khám phá công việc
            <span className="text-primary block">phù hợp với bạn</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
            AI phân tích kỹ năng và mục tiêu của bạn để gợi ý nghề nghiệp phù hợp nhất. Xây dựng hồ sơ chuyên nghiệp chỉ trong vài phút.
          </p>

          {/* Tagline */}
          <p className="text-primary font-semibold text-lg mb-8">
            Tìm đúng việc. Đi đúng hướng.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              onClick={onStart}
              size="lg"
              className="h-14 px-8 text-lg font-semibold rounded-xl"
            >
              Đăng nhập / Đăng ký
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => toast({ title: "Thông tin dự án", description: "TopCV Career Compass là nền tảng AI giúp sinh viên và nhân viên văn phòng định hướng sự nghiệp phù hợp dựa trên phân tích kỹ năng." })}
              className="h-14 px-8 text-lg font-semibold rounded-xl"
            >
              Tìm hiểu thêm
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50K+ người dùng</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Miễn phí 100%</span>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Feature Cards */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 max-w-lg w-full"
        >
          <div className="grid gap-4">
            <FeatureCard
              icon={<Target className="w-6 h-6" />}
              title="Đánh giá kỹ năng cá nhân"
              description="Trả lời vài câu hỏi đơn giản để AI hiểu được thế mạnh của bạn"
              delay={0.5}
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="AI gợi ý nghề nghiệp"
              description="Nhận danh sách công việc phù hợp với độ match score chi tiết"
              delay={0.6}
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Xây dựng hồ sơ chuyên nghiệp"
              description="AI tự động tạo CV và profile ấn tượng từ thông tin của bạn"
              delay={0.7}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          <StatItem number="10K+" label="Việc làm" />
          <StatItem number="500+" label="Công ty đối tác" />
          <StatItem number="92%" label="Tỷ lệ hài lòng" />
          <StatItem number="48h" label="Thời gian phản hồi" />
        </div>
      </div>
    </motion.div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      className="flex items-start gap-4 bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl lg:text-3xl font-bold text-primary">{number}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
