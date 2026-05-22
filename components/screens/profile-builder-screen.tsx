"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Sparkles, RefreshCw, Check, Edit3, ArrowRight } from "lucide-react"
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
  const [editingSection, setEditingSection] = useState<string | null>(null)
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

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRegenerating(false)
  }

  const handleComplete = () => {
    onComplete({
      skills: profile.skills,
      experience: profile.summary,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-semibold text-foreground flex items-center gap-2">
                  Smart Profile Builder
                  <Sparkles className="w-4 h-4 text-primary" />
                </h1>
                <p className="text-sm text-muted-foreground">AI tạo hồ sơ từ thông tin của bạn</p>
              </div>
            </div>
            <Button onClick={handleComplete} className="hidden sm:flex">
              Lưu và tiếp tục
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Summary Section */}
            <ProfileSection
              title="Giới thiệu bản thân"
              onEdit={() => setEditingSection(editingSection === "summary" ? null : "summary")}
              onRegenerate={handleRegenerate}
              isRegenerating={isRegenerating}
              isEditing={editingSection === "summary"}
            >
              {editingSection === "summary" ? (
                <textarea
                  value={profile.summary}
                  onChange={(e) => setProfile(prev => ({ ...prev, summary: e.target.value }))}
                  className="w-full h-40 p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              ) : (
                <p className="text-muted-foreground leading-relaxed">{profile.summary}</p>
              )}
            </ProfileSection>

            {/* Skills Section */}
            <ProfileSection
              title="Kỹ năng"
              onEdit={() => setEditingSection(editingSection === "skills" ? null : "skills")}
              onRegenerate={handleRegenerate}
              isRegenerating={isRegenerating}
              isEditing={editingSection === "skills"}
            >
              {editingSection === "skills" ? (
                <div className="space-y-2 w-full">
                  <textarea
                    value={profile.skills.join(", ")}
                    onChange={(e) => {
                      const newSkills = e.target.value
                        .split(",")
                        .map(s => s.trim())
                        .filter(Boolean)
                      setProfile(prev => ({ ...prev, skills: newSkills }))
                    }}
                    placeholder="Nhập các kỹ năng, phân tách bằng dấu phẩy..."
                    className="w-full h-32 p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Phân tách các kỹ năng bằng dấu phẩy (ví dụ: React, Node.js, SQL)</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </ProfileSection>

            {/* Projects Section */}
            <ProfileSection
              title="Dự án nổi bật"
              onEdit={() => setEditingSection(editingSection === "projects" ? null : "projects")}
              onRegenerate={handleRegenerate}
              isRegenerating={isRegenerating}
              isEditing={editingSection === "projects"}
            >
              {editingSection === "projects" ? (
                <div className="space-y-2 w-full">
                  <textarea
                    value={profile.projects.join("\n")}
                    onChange={(e) => {
                      const newProjects = e.target.value
                        .split("\n")
                        .map(p => p.trim())
                        .filter(Boolean)
                      setProfile(prev => ({ ...prev, projects: newProjects }))
                    }}
                    placeholder="Mỗi dòng là một dự án..."
                    className="w-full h-40 p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Mỗi dòng tương ứng với một dự án nổi bật</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {profile.projects.map((project, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              )}
            </ProfileSection>

            {/* Achievements Section */}
            <ProfileSection
              title="Thành tựu"
              onEdit={() => setEditingSection(editingSection === "achievements" ? null : "achievements")}
              onRegenerate={handleRegenerate}
              isRegenerating={isRegenerating}
              isEditing={editingSection === "achievements"}
            >
              {editingSection === "achievements" ? (
                <div className="space-y-2 w-full">
                  <textarea
                    value={profile.achievements.join("\n")}
                    onChange={(e) => {
                      const newAchievements = e.target.value
                        .split("\n")
                        .map(a => a.trim())
                        .filter(Boolean)
                      setProfile(prev => ({ ...prev, achievements: newAchievements }))
                    }}
                    placeholder="Mỗi dòng là một thành tựu..."
                    className="w-full h-40 p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Mỗi dòng tương ứng với một thành tựu/chứng chỉ</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {profile.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-accent">{index + 1}</span>
                      </div>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </ProfileSection>
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 sm:hidden">
            <Button onClick={handleComplete} size="lg" className="w-full h-14 text-lg font-semibold rounded-xl">
              Lưu và tìm việc phù hợp
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
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
  isEditing: boolean
}

function ProfileSection({ title, children, onEdit, onRegenerate, isRegenerating, isEditing }: ProfileSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className={`h-9 w-9 rounded-full ${isEditing ? "bg-primary/10 text-primary" : ""}`}
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="h-9 w-9 rounded-full"
          >
            <RefreshCw className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>
      {children}
    </motion.div>
  )
}
