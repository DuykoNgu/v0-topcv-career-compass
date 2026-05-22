"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Check, X, TrendingUp, Target, Zap, ArrowRight, Loader2, Sparkles } from "lucide-react"
import type { UserProfile, Job } from "@/app/page"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface FitExplanationScreenProps {
  job: Job
  userProfile: UserProfile
  onMatchScoreUpdate?: (jobId: string, matchScore: number) => void
  onUserProfileUpdate?: (updatedProfile: Partial<UserProfile>) => void
  onApply: () => void
  onBack: () => void
}

interface FitData {
  matchScore: number
  matchedSkills: { name: string; level: string }[]
  missingSkills: { name: string; importance: string }[]
  strengths: string[]
  recommendations: string[]
}

export default function FitExplanationScreen({ 
  job, 
  userProfile, 
  onMatchScoreUpdate, 
  onUserProfileUpdate, 
  onApply, 
  onBack 
}: FitExplanationScreenProps) {
  const [fitData, setFitData] = useState<FitData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSkillsToAdd, setSelectedSkillsToAdd] = useState<string[]>([])
  const [customSkills, setCustomSkills] = useState<string[]>([])
  const [customSkillInput, setCustomSkillInput] = useState("")

  const handleOpenOptimizeDialog = () => {
    if (!fitData) return
    setSelectedSkillsToAdd([]) // Bắt đầu bằng mảng rỗng để người dùng tự chọn thủ công
    setCustomSkills([])
    setCustomSkillInput("")
    setIsDialogOpen(true)
  }

  const handleToggleSkill = (skill: string, checked: boolean) => {
    setSelectedSkillsToAdd(prev =>
      checked ? [...prev, skill] : prev.filter(s => s !== skill)
    )
  }

  const handleAddCustomSkill = () => {
    const trimmed = customSkillInput.trim()
    if (trimmed) {
      if (!selectedSkillsToAdd.includes(trimmed)) {
        setSelectedSkillsToAdd(prev => [...prev, trimmed])
      }
      if (!customSkills.includes(trimmed)) {
        setCustomSkills(prev => [...prev, trimmed])
      }
      setCustomSkillInput("")
    }
  }

  const handleDeleteCustomSkill = (skill: string) => {
    setCustomSkills(prev => prev.filter(s => s !== skill))
    setSelectedSkillsToAdd(prev => prev.filter(s => s !== skill))
  }

  const handleConfirmOptimize = () => {
    if (selectedSkillsToAdd.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một kỹ năng để thêm!")
      return
    }

    const newSkills = Array.from(new Set([...userProfile.skills, ...selectedSkillsToAdd]))

    onUserProfileUpdate?.({
      skills: newSkills
    })

    setIsDialogOpen(false)
    toast.success("Đã cập nhật hồ sơ thành công!", {
      description: `Đã thêm ${selectedSkillsToAdd.length} kỹ năng vào hồ sơ của bạn.`
    })
  }

  const jobId = job.id
  const jobMatchScore = job.matchScore
  const jobRequirements = job.requirements

  useEffect(() => {
    async function fetchFitExplanation() {
      try {
        setLoading(true)
        const response = await fetch("/api/fit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ job, userProfile }),
        })

        if (!response.ok) {
          throw new Error("Lỗi khi tải phân tích độ phù hợp")
        }

        const data = await response.json()
        setFitData(data)
        if (typeof data?.matchScore === "number" && data.matchScore !== jobMatchScore) {
          onMatchScoreUpdate?.(jobId, data.matchScore)
        }
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Đã xảy ra lỗi")
        // Fallback fallback fitData
        setFitData({
          matchScore: jobMatchScore || 80,
          matchedSkills: (userProfile.skills && userProfile.skills.length > 0)
            ? userProfile.skills.map(s => ({ name: s, level: "medium" }))
            : [{ name: "Kỹ năng mềm", level: "medium" }],
          missingSkills: jobRequirements
            ? jobRequirements.slice(0, 2).map(r => ({ name: r, importance: "recommended" }))
            : [{ name: "Kỹ năng chuyên môn", importance: "recommended" }],
          strengths: ["Profile cơ bản đáp ứng các yêu cầu tuyển dụng chính."],
          recommendations: ["Cập nhật CV của bạn để phù hợp hơn với vị trí này."]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFitExplanation()
  }, [jobId, userProfile])

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-background/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 max-w-md bg-card border border-border rounded-2xl shadow-sm space-y-6"
        >
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Đang phân tích độ phù hợp</h3>
            <p className="text-sm text-muted-foreground">AI đang so sánh hồ sơ và kỹ năng của bạn với yêu cầu tuyển dụng...</p>
          </div>
        </motion.div>
      </div>
    )
  }

  // Determine suitability level
  const score = fitData?.matchScore ?? jobMatchScore ?? 0
  let suitabilityText = "Rất phù hợp!"
  let suitabilityDesc = "Profile của bạn match rất tốt với vị trí này"
  let scoreBgColor = "bg-green-600 text-white border-transparent shadow-md"

  if (score < 60) {
    suitabilityText = "Chưa thực sự phù hợp"
    suitabilityDesc = "Kỹ năng của bạn chưa trùng khớp nhiều với vị trí này"
    scoreBgColor = "bg-red-500 text-white border-transparent shadow-md"
  } else if (score < 75) {
    suitabilityText = "Phù hợp một phần"
    suitabilityDesc = "Cần bổ sung một vài kỹ năng quan trọng để tăng cơ hội"
    scoreBgColor = "bg-amber-500 text-white border-transparent shadow-md"
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-[calc(100vh-4rem)] bg-background/50"
    >
      {/* Sub Header */}
      <div className="border-b border-border bg-card shadow-sm sticky top-16 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 max-w-5xl mx-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="font-semibold text-foreground text-lg">Phân tích độ phù hợp từ AI</h1>
              <p className="text-sm text-muted-foreground">{job.title} — {job.company}</p>
            </div>
            <Button onClick={onApply} className="hidden lg:flex rounded-xl">
              Ứng tuyển ngay
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Overall Score */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-10 bg-card border border-border rounded-2xl shadow-sm"
          >
            <div className={`w-32 h-32 rounded-full border flex items-center justify-center mx-auto mb-5 ${scoreBgColor}`}>
              <span className="text-4xl font-extrabold">{score}%</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{suitabilityText}</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">{suitabilityDesc}</p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Matched Skills */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Kỹ năng phù hợp</h3>
                </div>
                <div className="space-y-4">
                  {fitData && fitData.matchedSkills.length > 0 ? (
                    fitData.matchedSkills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-foreground text-sm font-medium">{skill.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                skill.level === "high" ? "bg-emerald-500 w-full" : "bg-primary w-3/4"
                              }`}
                            />
                          </div>
                          <span className={`text-xs font-semibold w-16 text-right ${
                            skill.level === "high" ? "text-emerald-500" : "text-primary"
                          }`}>
                            {skill.level === "high" ? "Thành thạo" : "Khá"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Không có trùng khớp kỹ năng trực tiếp.</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Missing Skills */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Kỹ năng cần bổ sung</h3>
                </div>
                <div className="space-y-3">
                  {fitData && fitData.missingSkills.length > 0 ? (
                    fitData.missingSkills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/40 rounded-xl">
                        <span className="text-foreground text-sm font-medium">{skill.name}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                          skill.importance === "recommended" 
                            ? "bg-orange-500/10 text-orange-600 border-orange-500/20" 
                            : "bg-muted text-muted-foreground border-transparent"
                        }`}>
                          {skill.importance === "recommended" ? "Khuyến nghị" : "Tùy chọn"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Tuyệt vời! Bạn không thiếu kỹ năng cốt lõi nào.</p>
                  )}
                </div>
              </div>

              {fitData && fitData.missingSkills.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border/60">
                  <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/5 rounded-xl p-4 border border-primary/20 relative overflow-hidden group">
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
                    <div className="relative flex items-center gap-3 justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                          <h4 className="text-sm font-bold text-foreground">Tối ưu CV bằng AI</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">Tự động bổ sung kỹ năng thiếu vào hồ sơ</p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={handleOpenOptimizeDialog}
                        className="rounded-lg shadow-sm font-semibold hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                      >
                        Tối ưu ngay
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Strengths */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Điểm mạnh nổi bật</h3>
              </div>
              <ul className="space-y-3">
                {fitData?.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-primary/5 rounded-2xl border border-primary/20 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Gợi ý từ AI</h3>
              </div>
              <ul className="space-y-4">
                {fitData?.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Mobile CTA */}
          <div className="mt-8 lg:hidden">
            <Button
              onClick={onApply}
              size="lg"
              className="w-full h-14 text-lg font-semibold rounded-xl shadow-md"
            >
              Ứng tuyển ngay
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-card border border-border p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Tối ưu hóa kỹ năng hồ sơ
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Chọn các kỹ năng đề xuất hoặc tự nhập thêm các kỹ năng khác để thêm vào hồ sơ của bạn.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 my-4">
            {/* AI Recommended skills */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kỹ năng khuyến nghị từ AI</h4>
                {fitData && fitData.missingSkills.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSkillsToAdd(fitData.missingSkills.map(s => s.name))}
                      className="text-xs text-primary hover:text-primary/80 hover:underline font-semibold cursor-pointer transition-colors"
                    >
                      Chọn tất cả
                    </button>
                    <span className="text-muted-foreground/40 text-xs">|</span>
                    <button
                      type="button"
                      onClick={() => setSelectedSkillsToAdd([])}
                      className="text-xs text-muted-foreground hover:text-foreground hover:underline font-semibold cursor-pointer transition-colors"
                    >
                      Bỏ chọn
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {fitData && fitData.missingSkills.length > 0 ? (
                  fitData.missingSkills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl hover:bg-muted/60 transition-colors border border-border/40"
                    >
                      <Checkbox 
                        id={`ai-skill-${skill.name}`}
                        checked={selectedSkillsToAdd.includes(skill.name)}
                        onCheckedChange={(checked) => handleToggleSkill(skill.name, !!checked)}
                      />
                      <label 
                        htmlFor={`ai-skill-${skill.name}`}
                        className="text-sm font-medium text-foreground cursor-pointer flex-1 select-none"
                      >
                        {skill.name}
                      </label>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-primary/10 text-primary uppercase">
                        AI gợi ý
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Không có kỹ năng gợi ý nào.</p>
                )}
              </div>
            </div>

            {/* Custom Added Skills list */}
            {customSkills.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kỹ năng tự thêm</h4>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {customSkills.map((skill) => (
                    <div 
                      key={skill} 
                      className="flex items-center justify-between p-3 bg-accent/5 rounded-xl border border-accent/20"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          id={`custom-skill-${skill}`}
                          checked={selectedSkillsToAdd.includes(skill)}
                          onCheckedChange={(checked) => handleToggleSkill(skill, !!checked)}
                        />
                        <label 
                          htmlFor={`custom-skill-${skill}`}
                          className="text-sm font-medium text-foreground cursor-pointer select-none"
                        >
                          {skill}
                        </label>
                      </div>
                      <button 
                        onClick={() => handleDeleteCustomSkill(skill)}
                        className="text-xs font-semibold text-destructive hover:underline p-1 cursor-pointer"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom skill input */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Thêm kỹ năng khác</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập tên kỹ năng..."
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddCustomSkill()
                    }
                  }}
                  className="flex-1 h-10 px-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button 
                  type="button" 
                  size="sm" 
                  onClick={handleAddCustomSkill}
                  className="rounded-xl h-10 px-4 font-semibold shrink-0 cursor-pointer"
                >
                  Thêm
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="rounded-xl cursor-pointer"
            >
              Hủy bỏ
            </Button>
            <Button 
              onClick={handleConfirmOptimize}
              className="rounded-xl font-semibold shadow-sm hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Cập nhật hồ sơ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
