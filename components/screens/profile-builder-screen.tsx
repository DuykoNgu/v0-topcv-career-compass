"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, Sparkles, RefreshCw, Check, Edit3, ArrowRight,
  User, Mail, Phone, MapPin, Globe, FileText, Briefcase, Award,
  Printer
} from "lucide-react"
import type { UserProfile } from "@/app/page"

interface ProfileBuilderScreenProps {
  userProfile: UserProfile
  onComplete: (updatedProfile?: Partial<UserProfile>) => void
  onBack: () => void
}

const generatedProfile = {
  summary: "Chuyên viên Marketing năng động với kinh nghiệm quản lý social media và content marketing. Có khả năng phân tích data và tối ưu chiến dịch. Đam mê sáng tạo và luôn cập nhật xu hướng mới.",
  skills: ["Digital Marketing", "Social Media Management", "Google Analytics", "Content Strategy", "SEO/SEM", "Data Analysis"],
  projects: [
    "Tăng engagement Facebook page 150% trong 3 tháng",
    "Quản lý chiến dịch Google Ads với ROI 3.5x",
    "Xây dựng content calendar và đạt 10K followers trên Instagram",
  ],
  achievements: [
    "Top 10 Marketing Student Competition 2024",
    "Chứng chỉ Google Digital Marketing",
    "Hoàn thành khóa Data Analytics - Coursera",
  ],
}

export default function ProfileBuilderScreen({ userProfile, onComplete, onBack }: ProfileBuilderScreenProps) {
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<"cv" | "edit">("edit") // Default to edit on mobile so they see inputs first

  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState(() => {
    let defaultTitle = "Chuyên viên Marketing"
    if (userProfile.targetTitle) {
      defaultTitle = userProfile.targetTitle
    } else if (userProfile.previousJobSurvey?.title) {
      defaultTitle = userProfile.previousJobSurvey.title
    } else if (userProfile.goals) {
      defaultTitle = userProfile.goals.split(".")[0].substring(0, 40)
    }

    return {
      fullName: userProfile.fullName || "Nguyễn Minh Đức",
      title: defaultTitle,
      email: userProfile.email || "minhduc.dev@gmail.com",
      phone: userProfile.phone || "0901 234 567",
      location: userProfile.location || "Quận 1, TP. Hồ Chí Minh",
      website: userProfile.website || "linkedin.com/in/minhduc",
    }
  })

  // Profile data state
  const [profile, setProfile] = useState(() => {
    let summary = generatedProfile.summary
    if (userProfile.experience || userProfile.goals) {
      summary = `Ứng viên có mục tiêu nghề nghiệp: ${userProfile.goals || "Phát triển bản thân"}. Kinh nghiệm làm việc: ${userProfile.experience || "Mới tốt nghiệp / chưa có nhiều kinh nghiệm"}.`
    }
    return {
      summary,
      skills: userProfile.skills && userProfile.skills.length > 0 ? userProfile.skills : generatedProfile.skills,
      projects: generatedProfile.projects,
      achievements: generatedProfile.achievements,
    }
  })

  const handleRegenerateSection = async (section: string) => {
    setIsRegenerating(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsRegenerating(false)
    if (section === "summary") {
      setProfile(prev => ({
        ...prev,
        summary: "Chuyên viên Marketing dày dặn kinh nghiệm với thế mạnh tối ưu hóa công cụ tìm kiếm (SEO) và phát triển thương hiệu trên các nền tảng số. Đam mê thiết lập chiến lược nội dung đột phá và theo đuổi các KPI chuyển đổi thực tế."
      }))
    } else if (section === "skills") {
      setProfile(prev => ({
        ...prev,
        skills: Array.from(new Set([...prev.skills, "Growth Hacking", "Content Writing", "Copywriting", "Branding"]))
      }))
    } else if (section === "projects") {
      setProfile(prev => ({
        ...prev,
        projects: [
          ...prev.projects,
          "Phát triển chiến dịch viral video trên TikTok đạt 1M+ views trong 2 tuần.",
        ]
      }))
    } else if (section === "achievements") {
      setProfile(prev => ({
        ...prev,
        achievements: [
          ...prev.achievements,
          "Chứng chỉ IELTS 7.5 Academic",
        ]
      }))
    }
  }

  const handleComplete = () => {
    onComplete({
      skills: profile.skills,
      experience: profile.summary,
      fullName: personalInfo.fullName,
      targetTitle: personalInfo.title,
      email: personalInfo.email,
      phone: personalInfo.phone,
      location: personalInfo.location,
      website: personalInfo.website,
    })
  }

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col no-print"
    >
      {/* Print Styles Injected */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: #1e293b !important;
          }
          .cv-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            display: block !important;
          }
          #cv-preview-sheet {
            border: none !important;
            box-shadow: none !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 30px !important;
            background: white !important;
            color: #1e293b !important;
          }
        }
      `}} />

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="rounded-full hover:bg-muted"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-semibold text-foreground flex items-center gap-2">
                  Hồ sơ Career Compass
                  <Sparkles className="w-4 h-4 text-[#00b14f]" />
                </h1>
                <p className="text-sm text-muted-foreground">AI khởi tạo & cập nhật CV của bạn trực tiếp</p>
              </div>
            </div>
            <Button onClick={handleComplete} className="hidden sm:flex bg-[#00b14f] hover:bg-[#009a44] text-white font-semibold">
              Lưu và tiếp tục
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Tabs Switch (hidden on desktop) */}
      <div className="container mx-auto px-6 pt-6 flex justify-center lg:hidden">
        <div className="bg-muted/60 p-1.5 rounded-xl flex gap-1 border border-border/80">
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "edit"
                ? "bg-background text-foreground shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-primary" />
            Nhập thông tin
          </button>
          <button
            onClick={() => setActiveTab("cv")}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "cv"
                ? "bg-background text-foreground shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#00b14f]" />
            Xem CV chuẩn TopCV
          </button>
        </div>
      </div>

      {/* Main Content Area (Side-by-side on desktop) */}
      <div className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Editor (Visible on desktop, and on mobile only when edit tab is active) */}
            <div className={`w-full lg:col-span-5 flex flex-col gap-6 no-print ${activeTab === "edit" ? "block" : "hidden lg:flex"}`}>
              
              {/* Card 1: Personal Info */}
              <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2 pb-1 border-b border-border/60">
                  <User className="w-4 h-4 text-[#00b14f]" />
                  Thông tin cá nhân & Liên hệ
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Họ và tên</label>
                    <input
                      type="text"
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full p-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-[#00b14f]/50 focus:outline-none transition-shadow"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Vị trí ứng tuyển</label>
                    <input
                      type="text"
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-[#00b14f]/50 focus:outline-none transition-shadow"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Số điện thoại</label>
                    <input
                      type="text"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-[#00b14f]/50 focus:outline-none transition-shadow"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Email</label>
                    <input
                      type="text"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-[#00b14f]/50 focus:outline-none transition-shadow"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Địa chỉ</label>
                    <input
                      type="text"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-[#00b14f]/50 focus:outline-none transition-shadow"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Website / Link</label>
                    <input
                      type="text"
                      value={personalInfo.website}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full p-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-[#00b14f]/50 focus:outline-none transition-shadow"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Career Objective */}
              <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-border/60 pb-1">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00b14f]" />
                    Giới thiệu bản thân
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isRegenerating}
                    onClick={() => handleRegenerateSection("summary")}
                    className="h-8 text-xs text-[#00b14f] hover:text-white hover:bg-[#00b14f] rounded-lg flex items-center gap-1 transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin" : ""}`} />
                    Tối ưu AI
                  </Button>
                </div>
                <textarea
                  value={profile.summary}
                  onChange={(e) => setProfile(prev => ({ ...prev, summary: e.target.value }))}
                  className="w-full h-32 p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00b14f]/50 text-foreground text-sm leading-relaxed"
                />
              </div>

              {/* Card 3: Skills */}
              <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-border/60 pb-1">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#00b14f]" />
                    Kỹ năng chuyên môn
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isRegenerating}
                    onClick={() => handleRegenerateSection("skills")}
                    className="h-8 text-xs text-[#00b14f] hover:text-white hover:bg-[#00b14f] rounded-lg flex items-center gap-1 transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin" : ""}`} />
                    Tối ưu AI
                  </Button>
                </div>
                <div className="space-y-2">
                  <textarea
                    value={profile.skills.join(", ")}
                    onChange={(e) => {
                      const newSkills = e.target.value
                        .split(",")
                        .map(s => s.trim())
                        .filter(Boolean)
                      setProfile(prev => ({ ...prev, skills: newSkills }))
                    }}
                    className="w-full h-24 p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00b14f]/50 text-foreground text-sm"
                  />
                  <p className="text-[11px] text-muted-foreground">Phân tách các kỹ năng bằng dấu phẩy (ví dụ: React, Python, Marketing)</p>
                </div>
              </div>

              {/* Card 4: Projects */}
              <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-border/60 pb-1">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00b14f]" />
                    Dự án nổi bật
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isRegenerating}
                    onClick={() => handleRegenerateSection("projects")}
                    className="h-8 text-xs text-[#00b14f] hover:text-white hover:bg-[#00b14f] rounded-lg flex items-center gap-1 transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin" : ""}`} />
                    Thêm gợi ý AI
                  </Button>
                </div>
                <div className="space-y-2">
                  <textarea
                    value={profile.projects.join("\n")}
                    onChange={(e) => {
                      const newProjects = e.target.value
                        .split("\n")
                        .map(p => p.trim())
                        .filter(Boolean)
                      setProfile(prev => ({ ...prev, projects: newProjects }))
                    }}
                    className="w-full h-28 p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00b14f]/50 text-foreground text-sm leading-relaxed"
                  />
                  <p className="text-[11px] text-muted-foreground">Mỗi dòng là một gạch đầu dòng dự án</p>
                </div>
              </div>

              {/* Card 5: Achievements */}
              <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-border/60 pb-1">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#00b14f]" />
                    Thành tựu & Chứng chỉ
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isRegenerating}
                    onClick={() => handleRegenerateSection("achievements")}
                    className="h-8 text-xs text-[#00b14f] hover:text-white hover:bg-[#00b14f] rounded-lg flex items-center gap-1 transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin" : ""}`} />
                    Thêm gợi ý AI
                  </Button>
                </div>
                <div className="space-y-2">
                  <textarea
                    value={profile.achievements.join("\n")}
                    onChange={(e) => {
                      const newAchievements = e.target.value
                        .split("\n")
                        .map(a => a.trim())
                        .filter(Boolean)
                      setProfile(prev => ({ ...prev, achievements: newAchievements }))
                    }}
                    className="w-full h-28 p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00b14f]/50 text-foreground text-sm leading-relaxed"
                  />
                  <p className="text-[11px] text-muted-foreground">Mỗi dòng tương ứng với một thành tựu/chứng chỉ</p>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="mt-4 sm:hidden">
                <Button onClick={handleComplete} size="lg" className="w-full h-14 text-lg font-semibold rounded-xl bg-[#00b14f] hover:bg-[#009a44] text-white">
                  Lưu và tiếp tục
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Column: Live CV Preview (Visible on desktop, sticky position, and mobile only when cv tab is active) */}
            <div className={`w-full lg:col-span-7 lg:sticky lg:top-24 flex flex-col items-center cv-print-area ${activeTab === "cv" ? "block" : "hidden lg:flex"}`}>
              
              {/* Toolbar */}
              <div className="w-full flex justify-between items-center bg-card/60 backdrop-blur border border-border p-4 rounded-2xl mb-4 no-print shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00b14f] animate-pulse" />
                  <span className="text-xs font-semibold text-muted-foreground">Bản xem trước CV trực tiếp (TopCV Theme)</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    className="text-xs h-8 font-medium hover:bg-muted"
                  >
                    <Printer className="w-3.5 h-3.5 mr-1" />
                    In / Xuất PDF
                  </Button>
                </div>
              </div>

              {/* CV Page Sheet */}
              <div 
                id="cv-preview-sheet" 
                className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 min-h-[900px] flex flex-col transition-all duration-300 hover:shadow-primary/5 hover:scale-[1.002]"
              >
                {/* Top decorative bar */}
                <div className="h-3.5 bg-[#00b14f] w-full" />

                {/* CV Header block */}
                <div className="p-8 pb-6 bg-[#f8faf9] border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="flex items-center gap-4">
                    {/* Initials Avatar */}
                    <div className="w-16 h-16 bg-[#00b14f]/10 border border-[#00b14f] rounded-xl flex items-center justify-center text-xl font-black text-[#00b14f] tracking-wide uppercase shadow-sm">
                      {getInitials(personalInfo.fullName)}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 leading-tight">
                        {personalInfo.fullName}
                      </h2>
                      <p className="text-[12px] font-bold text-[#00b14f] uppercase tracking-wider mt-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#00b14f] fill-[#00b14f]/15" />
                        {personalInfo.title}
                      </p>
                    </div>
                  </div>
                  {/* Contact Info */}
                  <div className="space-y-1.5 text-[11px] text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#00b14f] flex-shrink-0" />
                      <span>{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#00b14f] flex-shrink-0" />
                      <span>{personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#00b14f] flex-shrink-0" />
                      <span>{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-[#00b14f] flex-shrink-0" />
                      <span>{personalInfo.website}</span>
                    </div>
                  </div>
                </div>

                {/* CV Body */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                  
                  {/* Main Column */}
                  <div className="col-span-1 md:col-span-2 space-y-6">
                    
                    {/* Goal / objective */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-[#00b14f] border-b border-[#00b14f]/25 pb-1 flex items-center gap-2 uppercase tracking-wide">
                        <User className="w-3.5 h-3.5 text-[#00b14f]" />
                        Mục tiêu nghề nghiệp
                      </h3>
                      <p className="text-[11px] leading-relaxed text-slate-500 text-justify">
                        {profile.summary}
                      </p>
                    </div>

                    {/* Kinh nghiệm làm việc */}
                    <div className="space-y-3.5">
                      <h3 className="text-xs font-bold text-[#00b14f] border-b border-[#00b14f]/25 pb-1 flex items-center gap-2 uppercase tracking-wide">
                        <Briefcase className="w-3.5 h-3.5 text-[#00b14f]" />
                        Kinh nghiệm làm việc
                      </h3>
                      
                      {userProfile.previousJobSurvey ? (
                        <div className="space-y-2.5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-[11px] font-bold text-slate-900 uppercase">
                                {userProfile.previousJobSurvey.title}
                              </h4>
                              <p className="text-[9px] text-slate-400 font-bold mt-0.5">Cựu nhân viên tại Công ty cũ</p>
                            </div>
                            <span className="text-[9px] bg-[#00b14f]/10 text-[#00b14f] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              {userProfile.previousJobSurvey.workMode}
                            </span>
                          </div>
                          
                          <ul className="list-disc list-outside text-[10px] text-slate-500 space-y-1 pl-3.5">
                            <li>Mức lương cũ: <strong className="text-slate-700">{userProfile.previousJobSurvey.salary} triệu VNĐ</strong>.</li>
                            <li>Người hướng dẫn: {userProfile.previousJobSurvey.hasMentor ? "Nhận được sự kèm cặp trực tiếp từ Mentor cấp cao." : "Tự nghiên cứu và vận hành độc lập."}</li>
                            {userProfile.previousJobSurvey.dislikedFactors.length > 0 && (
                              <li>
                                Khó khăn đã gặp ở công ty cũ: <span className="text-rose-500 font-medium">{userProfile.previousJobSurvey.dislikedFactors.join(", ")}</span>.
                              </li>
                            )}
                            {userProfile.previousJobSurvey.expectedImprovements.length > 0 && (
                              <li>
                                Kỳ vọng môi trường mới: Mong muốn cải thiện về <span className="text-[#00b14f] font-semibold">{userProfile.previousJobSurvey.expectedImprovements.join(", ")}</span>.
                              </li>
                            )}
                          </ul>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-[11px] font-bold text-slate-900 uppercase">
                                CTV / Thực tập sinh Marketing & Phát triển dự án
                              </h4>
                              <p className="text-[9px] text-slate-400 font-bold mt-0.5">Dành cho Sinh viên / Mới bắt đầu</p>
                            </div>
                            <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              Hybrid
                            </span>
                          </div>
                          <ul className="list-disc list-outside text-[10px] text-slate-500 space-y-1 pl-3.5">
                            <li>Tham gia học tập và hỗ trợ chuẩn bị tài liệu dự án thực tế.</li>
                            <li>Tự lập, trau dồi các kiến thức nền tảng trong quá trình học tập.</li>
                            <li>Học hỏi quy trình làm việc nhóm chuyên nghiệp.</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Dự án nổi bật */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold text-[#00b14f] border-b border-[#00b14f]/25 pb-1 flex items-center gap-2 uppercase tracking-wide">
                        <FileText className="w-3.5 h-3.5 text-[#00b14f]" />
                        Dự án nổi bật
                      </h3>
                      <div className="space-y-2.5">
                        {profile.projects.map((project, idx) => (
                          <div key={idx} className="relative pl-4 border-l border-[#00b14f]/30">
                            <div className="absolute w-2 h-2 rounded-full bg-[#00b14f] -left-[4.5px] top-1 border border-white shadow-sm" />
                            <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                              {project}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Sidebar Column */}
                  <div className="col-span-1 border-t md:border-t-0 md:border-l border-slate-100 pt-5 md:pt-0 md:pl-5 space-y-5">
                    
                    {/* Kỹ năng */}
                    <div className="space-y-2">
                      <h3 className="text-[11px] font-bold text-[#00b14f] uppercase tracking-wide border-b border-[#00b14f]/25 pb-1 flex items-center gap-1">
                        Kỹ năng chuyên môn
                      </h3>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {profile.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-0.5 bg-[#00b14f]/10 text-[#00b14f] text-[9px] font-bold rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sở thích / Quan tâm */}
                    <div className="space-y-2">
                      <h3 className="text-[11px] font-bold text-[#00b14f] uppercase tracking-wide border-b border-[#00b14f]/25 pb-1 flex items-center gap-1">
                        Lĩnh vực quan tâm
                      </h3>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {userProfile.interests && userProfile.interests.length > 0 ? (
                          userProfile.interests.map((interest, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded"
                            >
                              {interest}
                            </span>
                          ))
                        ) : (
                          <span className="text-[9px] text-slate-400 italic">Chưa xác định</span>
                        )}
                      </div>
                    </div>

                    {/* Thành tựu */}
                    <div className="space-y-2">
                      <h3 className="text-[11px] font-bold text-[#00b14f] uppercase tracking-wide border-b border-[#00b14f]/25 pb-1 flex items-center gap-1">
                        Thành tựu & Chứng chỉ
                      </h3>
                      <ul className="space-y-2 text-[9px] text-slate-500 pl-0.5 pt-0.5">
                        {profile.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex gap-1.5 items-start leading-normal">
                            <Award className="w-3.5 h-3.5 text-[#00b14f] flex-shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>

                {/* CV Footer branding */}
                <div className="p-3 bg-[#f8faf9] border-t border-slate-100 text-center text-[8px] text-slate-400 font-bold tracking-widest uppercase">
                  CV được tạo tự động bởi TopCV Career Compass AI
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}
