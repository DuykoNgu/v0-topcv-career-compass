"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Gift, MessageCircle, Share2, Users, ArrowRight } from "lucide-react"

interface ReferralScreenProps {
  onDone: () => void
}

export default function ReferralScreen({ onDone }: ReferralScreenProps) {
  const handleShare = (platform: string) => {
    // In a real app, this would open the share dialog for the platform
    console.log(`Sharing to ${platform}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-background"
    >
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-6"
        >
          <Gift className="w-10 h-10 text-primary-foreground" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-foreground text-center mb-2"
        >
          Chia sẻ với bạn bè!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-center mb-8 max-w-xs"
        >
          Giúp bạn bè tìm được công việc phù hợp và nhận thưởng khi họ ứng tuyển thành công
        </motion.p>

        {/* Reward Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm bg-card rounded-xl border border-border p-4 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Mời 3 bạn bè</p>
              <p className="text-sm text-muted-foreground">Nhận voucher 100K</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-accent rounded-full" />
            </div>
            <span className="text-xs text-muted-foreground">1/3</span>
          </div>
        </motion.div>

        {/* Share Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm space-y-3"
        >
          <ShareButton
            icon={<MessageCircle className="w-5 h-5" />}
            label="Chia sẻ qua Messenger"
            color="bg-[#0084FF]"
            onClick={() => handleShare("messenger")}
          />
          <ShareButton
            icon={<MessageCircle className="w-5 h-5" />}
            label="Chia sẻ qua Zalo"
            color="bg-[#0068FF]"
            onClick={() => handleShare("zalo")}
          />
          <ShareButton
            icon={<Share2 className="w-5 h-5" />}
            label="Sao chép liên kết"
            color="bg-muted"
            textColor="text-foreground"
            onClick={() => handleShare("copy")}
          />
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
          onClick={onDone}
          variant="outline"
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-xl"
        >
          Tiếp tục tìm việc
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

interface ShareButtonProps {
  icon: React.ReactNode
  label: string
  color: string
  textColor?: string
  onClick: () => void
}

function ShareButton({ icon, label, color, textColor = "text-white", onClick }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 px-6 py-4 ${color} ${textColor} rounded-xl font-medium transition-opacity hover:opacity-90`}
    >
      {icon}
      {label}
    </button>
  )
}
