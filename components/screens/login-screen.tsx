"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Compass, Mail, Lock, ArrowRight, ChevronLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LoginScreenProps {
  onLoginSuccess: () => void
  onBack: () => void
}

export default function LoginScreen({ onLoginSuccess, onBack }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Giả lập API call
    setTimeout(() => {
      setIsLoading(false)
      onLoginSuccess()
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen flex flex-col bg-background"
    >
      {/* Header / Nav */}
      <div className="p-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-3xl p-8 shadow-sm"
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <Compass className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Đăng nhập
              </h1>
              <p className="text-muted-foreground text-sm">
                Chào mừng bạn trở lại với TopCV Career Compass
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="nguyenvana@gmail.com"
                    className="pl-9 h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <button 
                    type="button"
                    onClick={() => toast({ title: "Quên mật khẩu", description: "Vui lòng liên hệ với Quản trị viên để khôi phục mật khẩu của bạn." })}
                    className="text-xs text-primary hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="pl-9 h-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base font-medium mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : (
                  <>
                    Đăng nhập
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Chưa có tài khoản?{" "}
              <button 
                onClick={() => toast({ title: "Đăng ký tài khoản", description: "Hệ thống đăng ký đang bảo trì. Vui lòng đăng nhập với tài khoản Demo." })}
                className="text-primary font-medium hover:underline"
              >
                Đăng ký ngay
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
