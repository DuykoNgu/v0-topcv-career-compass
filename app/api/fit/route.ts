import { NextResponse } from "next/server"
import type { Job, UserProfile } from "@/app/page"
import { calculateJobMatchScore } from "@/lib/match"

// Map of common keywords to skills for advanced comparison
const skillKeywords: Record<string, string[]> = {
  "marketing": ["Marketing", "Digital Marketing", "Social Media", "SEO", "Content Writing"],
  "content": ["Content Writing", "Social Media", "Marketing"],
  "seo": ["SEO", "Marketing"],
  "social": ["Social Media", "Marketing"],
  "ads": ["Marketing", "Digital Marketing"],
  "facebook": ["Marketing", "Digital Marketing", "Social Media"],
  "google": ["Marketing", "Digital Marketing"],
  "data": ["Data Analysis", "SQL", "Excel", "Python"],
  "analyst": ["Data Analysis", "SQL", "Excel"],
  "sql": ["SQL", "Data Analysis"],
  "python": ["Python", "Data Analysis"],
  "excel": ["Excel", "Data Analysis"],
  "javascript": ["JavaScript", "React", "Node.js"],
  "react": ["React", "JavaScript"],
  "node": ["Node.js", "JavaScript"],
  "sales": ["Sales", "Communication"],
  "communication": ["Communication", "Sales", "Customer Service"],
  "leadership": ["Leadership", "Project Management"],
  "project": ["Project Management", "Leadership"],
  "solving": ["Problem Solving"],
  "problem": ["Problem Solving"],
  "design": ["Design"],
  "service": ["Customer Service", "Communication"]
}

export async function POST(request: Request) {
  try {
    const { job, userProfile }: { job: Job; userProfile: UserProfile } = await request.json()

    if (!job || !userProfile) {
      return NextResponse.json({ error: "Missing job or userProfile data" }, { status: 400 })
    }

    const userSkills = userProfile.skills || []
    const jobRequirements = job.requirements || []
    const jobDescription = job.description || ""

    // 1. Analyze matched and missing skills
    const matchedSkillsList: { name: string; level: string }[] = []
    const missingSkillsList: { name: string; importance: string }[] = []

    // Map user skills lowercased for quick lookup
    const userSkillsLower = userSkills.map(s => s.toLowerCase())

    // Also look at job requirements to see what matches user skills
    jobRequirements.forEach(req => {
      const reqLower = req.toLowerCase()
      let isMatched = false
      let matchedSkillName = ""

      // Check if user skill directly matches or is a substring of the requirement
      for (const skill of userSkills) {
        const skillLower = skill.toLowerCase()
        if (reqLower.includes(skillLower) || skillLower.includes(reqLower)) {
          isMatched = true
          matchedSkillName = skill
          break
        }
      }

      // Check using keywords if not directly matched
      if (!isMatched) {
        for (const [kw, skillsMapped] of Object.entries(skillKeywords)) {
          if (reqLower.includes(kw)) {
            const foundSkill = skillsMapped.find(s => userSkillsLower.includes(s.toLowerCase()))
            if (foundSkill) {
              isMatched = true
              matchedSkillName = foundSkill
              break
            }
          }
        }
      }

      if (isMatched) {
        // Prevent duplicate matched skills
        if (!matchedSkillsList.some(s => s.name === matchedSkillName)) {
          matchedSkillsList.push({
            name: matchedSkillName,
            level: Math.random() > 0.5 ? "high" : "medium" // Simulate level
          })
        }
      } else {
        // Extract a clean skill/subject from the requirement
        // E.g., "Thành thạo Facebook Ads, Google Ads" -> extract keyword or keep clean req
        let cleanName = req.replace(/^(yêu cầu|cần có|thành thạo|kỹ năng|hiểu biết về|kinh nghiệm)\s+/i, "")
        // Capitalize first letter
        cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1)
        missingSkillsList.push({
          name: cleanName,
          importance: reqLower.includes("yêu cầu") || reqLower.includes("bắt buộc") || reqLower.includes("kinh nghiệm") ? "recommended" : "optional"
        })
      }
    })

    // Fallback if matchedSkills is empty, add any general overlap
    if (matchedSkillsList.length === 0 && userSkills.length > 0) {
      // Find overlap with job description
      userSkills.forEach(skill => {
        if (jobDescription.toLowerCase().includes(skill.toLowerCase())) {
          matchedSkillsList.push({ name: skill, level: "medium" })
        }
      })
    }

    // 2. Calculate dynamic match score using the shared logic to avoid mismatch
    const calculatedScore = calculateJobMatchScore(job, userProfile)

    // 3. Generate dynamic Strengths
    const strengths: string[] = []
    if (matchedSkillsList.length > 0) {
      strengths.push(`Kỹ năng ${matchedSkillsList.map(s => s.name).slice(0, 2).join(" & ")} của bạn hoàn toàn phù hợp với yêu cầu cốt lõi.`)
    } else {
      strengths.push("Bạn có nền tảng tốt và thái độ sẵn sàng học hỏi những công nghệ mới.")
    }

    if (userProfile.experience && userProfile.experience.length > 10) {
      strengths.push("Kinh nghiệm thực tế được mô tả trong hồ sơ của bạn giúp tăng khả năng thích nghi.")
    } else {
      strengths.push("Sự năng động và định hướng phát triển rõ ràng của bạn là điểm cộng lớn.")
    }

    if (userProfile.goals && userProfile.goals.toLowerCase().includes("học hỏi")) {
      strengths.push("Mục tiêu học hỏi và phát triển bản thân phù hợp với văn hóa đào tạo của công ty.")
    }

    // 4. Generate dynamic Recommendations
    const recommendations: string[] = []
    if (missingSkillsList.length > 0) {
      const topMissing = missingSkillsList[0].name
      recommendations.push(`Tìm hiểu và bổ sung kiến thức về **${topMissing}** để nâng cao năng lực ứng tuyển.`)
    }
    recommendations.push("Cập nhật các dự án cá nhân hoặc case study liên quan vào CV Builder để gây ấn tượng mạnh.")
    recommendations.push("Chuẩn bị kỹ các câu hỏi tình huống thực tế liên quan đến mô tả công việc khi tham gia phỏng vấn.")

    return NextResponse.json({
      matchScore: calculatedScore,
      matchedSkills: matchedSkillsList.length > 0 ? matchedSkillsList : [{ name: "Kỹ năng mềm & Thích ứng", level: "medium" }],
      missingSkills: missingSkillsList.length > 0 ? missingSkillsList : [{ name: "Chứng chỉ nâng cao", importance: "optional" }],
      strengths: strengths.slice(0, 3),
      recommendations: recommendations.slice(0, 3)
    })
  } catch (error: any) {
    console.error("Error calculating fit:", error)
    return NextResponse.json({ error: "Failed to process fit calculation" }, { status: 500 })
  }
}
