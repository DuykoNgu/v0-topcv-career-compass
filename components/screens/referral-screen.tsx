"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Gift, MessageCircle, Share2, Users, ArrowRight, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

interface ReferralScreenProps {
  onDone: () => void
}

export default function ReferralScreen({ onDone }: ReferralScreenProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = (platform: string) => {
    if (platform === "copy") {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-12"
    >
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 rounded-2xl bg-primary mx-auto mb-6 flex items-center justify-center"
          >
            <Gift className="w-12 h-12 text-primary-foreground" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl lg:text-4xl font-bold text-foreground mb-3"
          >
            Chia sẻ với bạn bè!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-md mx-auto"
          >
            Giúp bạn bè tìm được công việc phù hợp và nhận thưởng khi họ ứng tuyển thành công
          </motion.p>
        </div>

        {/* Reward Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl border border-border p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-xl font-bold text-foreground">Mời 3 bạn bè</p>
              <p className="text-muted-foreground">Nhận voucher 100K khi bạn bè ứng tuyển thành công</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-accent">1/3</span>
              <p className="text-sm text-muted-foreground">người đã mời</p>
            </div>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-accent rounded-full" />
          </div>
        </motion.div>

        {/* Share Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid sm:grid-cols-3 gap-4 mb-8"
        >
          <button
            onClick={() => handleShare("messenger")}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-[#0084FF] text-white rounded-xl font-medium transition-opacity hover:opacity-90"
          >
            <MessageCircle className="w-5 h-5" />
            Messenger
          </button>
          <button
            onClick={() => handleShare("zalo")}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-[#0068FF] text-white rounded-xl font-medium transition-opacity hover:opacity-90"
          >
            <MessageCircle className="w-5 h-5" />
            Zalo
          </button>
          <button
            onClick={() => handleShare("copy")}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-muted text-foreground rounded-xl font-medium transition-opacity hover:opacity-90"
          >
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5 text-accent" />
                Đã sao chép!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Sao chép link
              </>
            )}
          </button>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center"
        >
          <Button
            onClick={onDone}
            variant="outline"
            size="lg"
            className="h-14 px-10 text-lg font-semibold rounded-xl"
          >
            Tiếp tục tìm việc
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
