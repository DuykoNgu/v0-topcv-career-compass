"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { CareerStage, UserProfile } from "@/app/page"

interface OnboardingScreenProps {
  careerStage: CareerStage
  onComplete: (data: Partial<UserProfile>) => void
  onBack: () => void
}

const skillOptions = [
  "JavaScript", "Python", "React", "Node.js", "SQL", "Excel",
  "Communication", "Leadership", "Problem Solving", "Design",
  "Marketing", "Data Analysis", "Project Management", "Sales",
  "Content Writing", "SEO", "Social Media", "Customer Service"
]

const interestOptions = [
  "Công nghệ", "Marketing", "Tài chính", "Nhân sự", "Kinh doanh",
  "Thiết kế", "Data Science", "Sản phẩm", "Operations", "Consulting",
  "Startup", "Remote Work", "Quản lý", "Creative"
]

const dislikeOptions = [
  "Lương thấp, không tương xứng",
  "Không có người hướng dẫn (Mentor)",
  "Môi trường gò bó (Onsite 100%)",
  "Áp lực quá tải, OT nhiều",
  "Thiếu lộ trình thăng tiến rõ ràng",
  "Công việc tẻ nhạt, ít học hỏi"
]

const expectationOptions = [
  "Lương thưởng hấp dẫn hơn",
  "Có Mentor giàu kinh nghiệm",
  "Hình thức làm việc Hybrid/Remote",
  "Thời gian linh hoạt, ít OT",
  "Cơ hội học tập & thăng tiến rõ ràng",
  "Công nghệ mới, dự án thử thách"
]

export default function OnboardingScreen({ careerStage, onComplete, onBack }: OnboardingScreenProps) {
  const [step, setStep] = useState(1)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [experience, setExperience] = useState("")
  const [goals, setGoals] = useState("")

  // State khảo sát công việc cũ cho office worker
  const [prevTitle, setPrevTitle] = useState("")
  const [prevSalary, setPrevSalary] = useState<number>(15)
  const [prevWorkMode, setPrevWorkMode] = useState("On-site")
  const [prevHasMentor, setPrevHasMentor] = useState(false)
  const [prevDislikes, setPrevDislikes] = useState<string[]>([])
  const [prevExpectations, setPrevExpectations] = useState<string[]>([])

  const isOffice = careerStage === "office"
  const totalSteps = isOffice ? 5 : 4
  const progress = (step / totalSteps) * 100

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete({
        skills: selectedSkills,
        interests: selectedInterests,
        experience,
        goals,
        previousJobSurvey: isOffice ? {
          title: prevTitle,
          salary: prevSalary,
          workMode: prevWorkMode,
          hasMentor: prevHasMentor,
          dislikedFactors: prevDislikes,
          expectedImprovements: prevExpectations
        } : undefined
      })
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      onBack()
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1: return selectedSkills.length >= 3
      case 2: return selectedInterests.length >= 2
      case 3: return experience.trim().length > 0
      case 4: 
        if (isOffice) {
          return prevTitle.trim().length > 0 && prevDislikes.length >= 1 && prevExpectations.length >= 1
        }
        return goals.trim().length > 0
      case 5:
        return goals.trim().length > 0
      default: return false
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col"
    >
      {/* Progress Bar */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 max-w-3xl mx-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="rounded-full flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            <span className="text-sm text-muted-foreground font-medium flex-shrink-0">
              Bước {step + 1}/{totalSteps + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full">
          {step === 1 && (
            <StepContent
              title="Kỹ năng của bạn"
              subtitle={`Chọn ít nhất 3 kỹ năng ${careerStage === "student" ? "bạn đang học hoặc đã có" : "bạn thành thạo"}`}
            >
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {skillOptions.map(skill => (
                  <ChipButton
                    key={skill}
                    label={skill}
                    selected={selectedSkills.includes(skill)}
                    onClick={() => toggleSkill(skill)}
                  />
                ))}
              </div>
              {selectedSkills.length > 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  Đã chọn: {selectedSkills.length} kỹ năng
                </p>
              )}
            </StepContent>
          )}

          {step === 2 && (
            <StepContent
              title="Lĩnh vực quan tâm"
              subtitle="Chọn ít nhất 2 lĩnh vực bạn muốn làm việc"
            >
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {interestOptions.map(interest => (
                  <ChipButton
                    key={interest}
                    label={interest}
                    selected={selectedInterests.includes(interest)}
                    onClick={() => toggleInterest(interest)}
                  />
                ))}
              </div>
              {selectedInterests.length > 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  Đã chọn: {selectedInterests.length} lĩnh vực
                </p>
              )}
            </StepContent>
          )}

          {step === 3 && (
            <StepContent
              title="Kinh nghiệm của bạn"
              subtitle={careerStage === "student" 
                ? "Mô tả ngắn về dự án, hoạt động, hoặc công việc part-time"
                : "Mô tả ngắn về vị trí hiện tại và công việc trước đây"
              }
            >
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder={careerStage === "student"
                  ? "Ví dụ: Tham gia CLB Marketing, làm dự án web cho startup, thực tập tại..."
                  : "Ví dụ: 3 năm kinh nghiệm Marketing Digital tại công ty X, quản lý team 5 người..."
                }
                className="w-full h-48 p-5 bg-card border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground text-lg"
              />
            </StepContent>
          )}

          {step === 4 && isOffice && (
            <StepContent
              title="Khảo sát công việc cũ"
              subtitle="Chia sẻ trải nghiệm công việc trước để AI gợi ý bến đỗ tốt hơn"
            >
              <div className="space-y-6 bg-card border border-border p-6 rounded-2xl shadow-sm text-left">
                {/* Chức danh & Mức lương */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Chức danh công việc cũ *</label>
                    <input
                      type="text"
                      value={prevTitle}
                      onChange={(e) => setPrevTitle(e.target.value)}
                      placeholder="Ví dụ: Marketing Executive"
                      className="w-full h-11 px-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Mức lương cũ: {prevSalary} triệu/tháng</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={prevSalary}
                        onChange={(e) => setPrevSalary(Number(e.target.value))}
                        className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={prevSalary}
                        onChange={(e) => setPrevSalary(Number(e.target.value))}
                        className="w-20 h-11 px-2 bg-background border border-border rounded-xl text-sm text-center text-foreground font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Hình thức & Mentor */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Hình thức làm việc cũ</label>
                    <div className="flex gap-2">
                      {["On-site", "Hybrid", "Remote"].map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setPrevWorkMode(mode)}
                          className={`flex-1 h-11 rounded-xl text-sm font-semibold border transition-all ${
                            prevWorkMode === mode
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-background border-border text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Có người hướng dẫn (Mentor)?</label>
                    <div className="flex gap-2">
                      {[
                        { label: "Có Mentor", value: true },
                        { label: "Không có", value: false }
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setPrevHasMentor(item.value)}
                          className={`flex-1 h-11 rounded-xl text-sm font-semibold border transition-all ${
                            prevHasMentor === item.value
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-background border-border text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Điểm chưa hài lòng */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Điều chưa hài lòng ở công việc cũ (Chọn ít nhất 1) *</label>
                  <div className="flex flex-wrap gap-2">
                    {dislikeOptions.map((item) => {
                      const isSelected = prevDislikes.includes(item)
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setPrevDislikes(prev =>
                              prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
                            )
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${
                            isSelected
                              ? "bg-destructive/10 border-destructive text-destructive font-bold"
                              : "bg-background border border-border text-muted-foreground hover:border-primary hover:bg-primary/5"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Mong muốn cải thiện */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Mong muốn cải thiện nhất (Chọn ít nhất 1) *</label>
                  <div className="flex flex-wrap gap-2">
                    {expectationOptions.map((item) => {
                      const isSelected = prevExpectations.includes(item)
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setPrevExpectations(prev =>
                              prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
                            )
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${
                            isSelected
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold"
                              : "bg-background border border-border text-muted-foreground hover:border-primary hover:bg-primary/5"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </StepContent>
          )}

          {((!isOffice && step === 4) || (isOffice && step === 5)) && (
            <StepContent
              title="Mục tiêu nghề nghiệp"
              subtitle="Bạn mong muốn gì trong công việc tiếp theo?"
            >
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="Ví dụ: Muốn học hỏi thêm về data analysis, tìm công việc remote, lương từ 15-20 triệu..."
                className="w-full h-48 p-5 bg-card border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground text-lg"
              />
            </StepContent>
          )}

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              size="lg"
              className="h-14 px-12 text-lg font-semibold rounded-xl"
            >
              {step === totalSteps ? "Xem kết quả" : "Tiếp tục"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function StepContent({ 
  title, 
  subtitle, 
  children 
}: { 
  title: string
  subtitle: string
  children: React.ReactNode 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center lg:text-left mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{title}</h2>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  )
}

function ChipButton({ 
  label, 
  selected, 
  onClick 
}: { 
  label: string
  selected: boolean
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
        selected
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-card border border-border text-foreground hover:border-primary hover:bg-primary/5"
      }`}
    >
      {label}
    </button>
  )
}
