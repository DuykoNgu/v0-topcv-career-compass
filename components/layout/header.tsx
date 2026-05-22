"use client"

import { Compass, User, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface HeaderProps {
  showNav?: boolean
  isLoggedIn?: boolean
  onLogoClick?: () => void
  onProfileClick?: () => void
  onJobsClick?: () => void
}

export default function Header({ showNav = true, isLoggedIn = false, onLogoClick, onProfileClick, onJobsClick }: HeaderProps) {
  const { toast } = useToast()

  const handleFeatureNotAvailable = (featureName: string) => {
    toast({
      title: "Tính năng đang phát triển",
      description: `Tính năng ${featureName} đang được xây dựng và sẽ sớm ra mắt!`,
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground leading-tight">TopCV Career Compass</h1>
            <p className="text-xs text-muted-foreground">Tìm đúng việc. Đi đúng hướng.</p>
          </div>
        </button>

        {/* Navigation */}
        {showNav && (
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={onJobsClick} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Tìm việc
            </button>
            <button 
              onClick={onProfileClick} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Hồ sơ
            </button>
            <button 
              onClick={() => handleFeatureNotAvailable("Công cụ AI")} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Công cụ AI
            </button>
            <button 
              onClick={() => handleFeatureNotAvailable("Blog")} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </button>
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex"
                onClick={() => toast({ title: "Thông báo", description: "Bạn chưa có thông báo mới nào." })}
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-muted" onClick={onProfileClick}>
                <User className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <Button className="hidden sm:flex" onClick={onLogoClick}>
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
