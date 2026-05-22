"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Sparkles, RefreshCw, Check, Edit3 } from "lucide-react"
import type { UserProfile } from "@/app/page"

interface ProfileBuilderScreenProps {
  userProfile: UserProfile
  onComplete: () => void
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

export default function ProfileBuilderScreen({ onComplete, onBack }: ProfileBuilderScreenProps) {
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [profile, setProfile] = useState(generatedProfile)

  const handleRegenerate = async (section: string) => {
    setIsRegenerating(true)
    // Simulate AI regeneration
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRegenerating(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen flex flex-col bg-background"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-3 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">Smart Profile Builder</h1>
          <p className="text-xs text-muted-foreground">AI tạo hồ sơ từ thông tin của bạn</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {/* Summary Section */}
        <ProfileSection
          title="Giới thiệu bản thân"
          onEdit={() => setEditingSection(editingSection === "summary" ? null : "summary")}
          onRegenerate={() => handleRegenerate("summary")}
          isRegenerating={isRegenerating}
        >
          {editingSection === "summary" ? (
            <textarea
              value={profile.summary}
              onChange={(e) => setProfile(prev => ({ ...prev, summary: e.target.value }))}
              className="w-full h-32 p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground"
            />
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">{profile.summary}</p>
          )}
        </ProfileSection>

        {/* Skills Section */}
        <ProfileSection
          title="Kỹ năng"
          onEdit={() => setEditingSection(editingSection === "skills" ? null : "skills")}
          onRegenerate={() => handleRegenerate("skills")}
          isRegenerating={isRegenerating}
        >
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </ProfileSection>

        {/* Projects Section */}
        <ProfileSection
          title="Dự án nổi bật"
          onEdit={() => setEditingSection(editingSection === "projects" ? null : "projects")}
          onRegenerate={() => handleRegenerate("projects")}
          isRegenerating={isRegenerating}
        >
          <ul className="space-y-2">
            {profile.projects.map((project, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{project}</span>
              </li>
            ))}
          </ul>
        </ProfileSection>

        {/* Achievements Section */}
        <ProfileSection
          title="Thành tựu"
          onEdit={() => setEditingSection(editingSection === "achievements" ? null : "achievements")}
          onRegenerate={() => handleRegenerate("achievements")}
          isRegenerating={isRegenerating}
        >
          <ul className="space-y-2">
            {profile.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-[10px] font-bold text-accent">{index + 1}</span>
                </div>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </ProfileSection>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-4 border-t border-border">
        <Button
          onClick={onComplete}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-xl"
        >
          Lưu và tìm việc phù hợp
        </Button>
      </div>
    </motion.div>
  )
}

interface ProfileSectionProps {
  title: string
  children: React.ReactNode
  onEdit: () => void
  onRegenerate: () => void
  isRegenerating: boolean
}

function ProfileSection({ title, children, onEdit, onRegenerate, isRegenerating }: ProfileSectionProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8 rounded-full"
          >
            <Edit3 className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="h-8 w-8 rounded-full"
          >
            <RefreshCw className={`w-4 h-4 text-muted-foreground ${isRegenerating ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}
