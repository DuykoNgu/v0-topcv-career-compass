"use client"

import { Compass, User, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  showNav?: boolean
  onLogoClick?: () => void
}

export default function Header({ showNav = true, onLogoClick }: HeaderProps) {
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
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Tìm việc
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Hồ sơ
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Công cụ AI
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </a>
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
          <Button className="hidden sm:flex">
            Đăng nhập
          </Button>
        </div>
      </div>
    </header>
  )
}
