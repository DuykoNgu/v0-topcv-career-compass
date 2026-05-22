"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Download, Plus, Trash2 } from "lucide-react"
import TemplateOne, { CVData } from "@/components/cv-templates/template-one"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface CVBuilderScreenProps {
  onBack: () => void
}

export default function CVBuilderScreen({ onBack }: CVBuilderScreenProps) {
  const [isExporting, setIsExporting] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)

  const [cvData, setCvData] = useState<CVData>({
    fullName: "Nguyễn Văn A",
    jobTitle: "Marketing Executive",
    email: "nguyenvana@email.com",
    phone: "0123 456 789",
    address: "Hà Nội, Việt Nam",
    summary: "Chuyên viên Marketing năng động với 2 năm kinh nghiệm quản lý social media và content. Luôn mong muốn áp dụng dữ liệu để tối ưu hóa chiến dịch.",
    skills: "- Digital Marketing\n- SEO/SEM\n- Content Strategy\n- Data Analysis",
    experience: [
      {
        id: "1",
        company: "TechViet Solutions",
        role: "Digital Marketing Specialist",
        period: "01/2022 - Hiện tại",
        description: "- Quản lý chiến dịch Google Ads và Facebook Ads.\n- Tăng tương tác trên mạng xã hội lên 150%."
      }
    ],
    education: [
      {
        id: "1",
        school: "Đại học Kinh tế Quốc dân",
        degree: "Cử nhân Marketing",
        period: "2018 - 2022"
      }
    ]
  })

  const downloadPDF = async () => {
    if (!cvRef.current) return
    setIsExporting(true)
    try {
      const element = cvRef.current
      const canvas = await html2canvas(element, { scale: 2, useCORS: true })
      const imgData = canvas.toDataURL("image/png")
      
      const pdf = new jsPDF("p", "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save(`CV_${cvData.fullName.replace(/\s+/g, '_')}.pdf`)
    } catch (error) {
      console.error("Lỗi xuất PDF: ", error)
      alert("Đã xảy ra lỗi khi xuất PDF!")
    } finally {
      setIsExporting(false)
    }
  }

  // --- Helpers to update experience/education arrays ---
  const updateExp = (index: number, field: string, value: string) => {
    const newExp = [...cvData.experience]
    newExp[index] = { ...newExp[index], [field]: value }
    setCvData({ ...cvData, experience: newExp })
  }
  
  const addExp = () => {
    setCvData({
      ...cvData,
      experience: [...cvData.experience, { id: Date.now().toString(), company: "", role: "", period: "", description: "" }]
    })
  }

  const removeExp = (index: number) => {
    const newExp = [...cvData.experience]
    newExp.splice(index, 1)
    setCvData({ ...cvData, experience: newExp })
  }

  const updateEdu = (index: number, field: string, value: string) => {
    const newEdu = [...cvData.education]
    newEdu[index] = { ...newEdu[index], [field]: value }
    setCvData({ ...cvData, education: newEdu })
  }

  const addEdu = () => {
    setCvData({
      ...cvData,
      education: [...cvData.education, { id: Date.now().toString(), school: "", degree: "", period: "" }]
    })
  }

  const removeEdu = (index: number) => {
    const newEdu = [...cvData.education]
    newEdu.splice(index, 1)
    setCvData({ ...cvData, education: newEdu })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row bg-background"
    >
      {/* Cột trái: Form nhập liệu (Scrollable) */}
      <div className="w-full lg:w-[450px] xl:w-[500px] border-r border-border flex flex-col h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="font-semibold text-lg">Chỉnh sửa CV</h2>
          </div>
          <Button onClick={downloadPDF} disabled={isExporting} className="sm:hidden">
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Đang xuất..." : "Tải PDF"}
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Thông tin cá nhân */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Thông tin cá nhân</h3>
            <div className="space-y-3">
              <div className="grid gap-1">
                <Label>Họ và tên</Label>
                <Input value={cvData.fullName} onChange={e => setCvData({ ...cvData, fullName: e.target.value })} />
              </div>
              <div className="grid gap-1">
                <Label>Vị trí ứng tuyển</Label>
                <Input value={cvData.jobTitle} onChange={e => setCvData({ ...cvData, jobTitle: e.target.value })} />
              </div>
              <div className="grid gap-1">
                <Label>Email</Label>
                <Input value={cvData.email} onChange={e => setCvData({ ...cvData, email: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label>Số điện thoại</Label>
                  <Input value={cvData.phone} onChange={e => setCvData({ ...cvData, phone: e.target.value })} />
                </div>
                <div className="grid gap-1">
                  <Label>Địa chỉ</Label>
                  <Input value={cvData.address} onChange={e => setCvData({ ...cvData, address: e.target.value })} />
                </div>
              </div>
            </div>
          </section>

          {/* Mục tiêu */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Mục tiêu nghề nghiệp</h3>
            <div className="grid gap-1">
              <Textarea 
                value={cvData.summary} 
                onChange={e => setCvData({ ...cvData, summary: e.target.value })} 
                rows={4}
                className="resize-none"
              />
            </div>
          </section>

          {/* Kỹ năng */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Kỹ năng</h3>
            <div className="grid gap-1">
              <Textarea 
                value={cvData.skills} 
                onChange={e => setCvData({ ...cvData, skills: e.target.value })} 
                rows={4}
                placeholder="Mỗi kỹ năng một dòng..."
              />
            </div>
          </section>

          {/* Kinh nghiệm */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Kinh nghiệm làm việc</h3>
              <Button variant="outline" size="sm" onClick={addExp}><Plus className="w-4 h-4 mr-1"/> Thêm</Button>
            </div>
            <div className="space-y-4">
              {cvData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border border-border rounded-lg bg-card space-y-3 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:bg-destructive/10" onClick={() => removeExp(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid gap-1 pr-8">
                    <Label>Công ty</Label>
                    <Input value={exp.company} onChange={e => updateExp(index, "company", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1">
                      <Label>Vị trí</Label>
                      <Input value={exp.role} onChange={e => updateExp(index, "role", e.target.value)} />
                    </div>
                    <div className="grid gap-1">
                      <Label>Thời gian</Label>
                      <Input value={exp.period} onChange={e => updateExp(index, "period", e.target.value)} placeholder="VD: 01/2022 - Hiện tại" />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label>Mô tả chi tiết</Label>
                    <Textarea value={exp.description} onChange={e => updateExp(index, "description", e.target.value)} rows={3} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Học vấn */}
          <section className="space-y-4 pb-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Học vấn</h3>
              <Button variant="outline" size="sm" onClick={addEdu}><Plus className="w-4 h-4 mr-1"/> Thêm</Button>
            </div>
            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border border-border rounded-lg bg-card space-y-3 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:bg-destructive/10" onClick={() => removeEdu(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid gap-1 pr-8">
                    <Label>Trường học / Tổ chức</Label>
                    <Input value={edu.school} onChange={e => updateEdu(index, "school", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1">
                      <Label>Bằng cấp</Label>
                      <Input value={edu.degree} onChange={e => updateEdu(index, "degree", e.target.value)} />
                    </div>
                    <div className="grid gap-1">
                      <Label>Thời gian</Label>
                      <Input value={edu.period} onChange={e => updateEdu(index, "period", e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Cột phải: Live Preview */}
      <div className="flex-1 bg-muted relative h-[calc(100vh-4rem)] overflow-hidden">
        <div className="absolute top-4 right-4 z-10 hidden sm:block">
          <Button onClick={downloadPDF} disabled={isExporting} className="shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Đang xuất..." : "Tải xuống PDF"}
          </Button>
        </div>
        
        {/* Render CV Template inside a scrollable area */}
        <TemplateOne data={cvData} cvRef={cvRef} />
      </div>
    </motion.div>
  )
}
