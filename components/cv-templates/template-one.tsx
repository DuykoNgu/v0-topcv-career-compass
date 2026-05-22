import React from "react"

export interface CVData {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  address: string
  summary: string
  experience: { id: string; company: string; role: string; period: string; description: string }[]
  education: { id: string; school: string; degree: string; period: string }[]
  skills: string
}

interface TemplateOneProps {
  data: CVData
  cvRef: React.RefObject<HTMLDivElement | null>
}

export default function TemplateOne({ data, cvRef }: TemplateOneProps) {
  return (
    <div className="bg-muted p-4 sm:p-8 flex justify-center overflow-auto w-full h-full">
      {/* Khung giấy A4 */}
      <div 
        ref={cvRef}
        className="bg-white shadow-xl flex-shrink-0"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "20mm 15mm",
          color: "#000",
          fontFamily: "Arial, sans-serif",
          boxSizing: "border-box"
        }}
      >
        {/* Header: Personal Info */}
        <div className="border-b-2 border-slate-800 pb-6 mb-6 text-center">
          <h1 className="text-4xl font-bold uppercase tracking-wider text-slate-800 mb-2">
            {data.fullName || "TÊN CỦA BẠN"}
          </h1>
          <h2 className="text-xl text-slate-600 font-medium mb-4">
            {data.jobTitle || "Vị trí ứng tuyển"}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            {data.email && <span>Email: {data.email}</span>}
            {data.phone && <span>SĐT: {data.phone}</span>}
            {data.address && <span>Địa chỉ: {data.address}</span>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-6">
            {/* Mục tiêu nghề nghiệp */}
            <section>
              <h3 className="text-lg font-bold text-slate-800 uppercase border-b border-slate-300 pb-1 mb-3">Mục tiêu</h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {data.summary || "Giới thiệu ngắn gọn về định hướng và mục tiêu của bạn..."}
              </p>
            </section>

            {/* Kỹ năng */}
            <section>
              <h3 className="text-lg font-bold text-slate-800 uppercase border-b border-slate-300 pb-1 mb-3">Kỹ năng</h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {data.skills || "Liệt kê các kỹ năng của bạn..."}
              </p>
            </section>
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-6">
            {/* Kinh nghiệm */}
            <section>
              <h3 className="text-lg font-bold text-slate-800 uppercase border-b border-slate-300 pb-1 mb-4">Kinh nghiệm làm việc</h3>
              <div className="space-y-5">
                {data.experience.length === 0 ? (
                  <p className="text-sm text-slate-500 italic">Chưa có kinh nghiệm nào được thêm.</p>
                ) : (
                  data.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-bold text-slate-800">{exp.role || "Tên vị trí"}</h4>
                        <span className="text-xs font-semibold text-slate-500">{exp.period || "Thời gian"}</span>
                      </div>
                      <div className="text-sm font-medium text-slate-600 mb-2">{exp.company || "Tên công ty"}</div>
                      <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                        {exp.description || "Mô tả công việc..."}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Học vấn */}
            <section>
              <h3 className="text-lg font-bold text-slate-800 uppercase border-b border-slate-300 pb-1 mb-4">Học vấn</h3>
              <div className="space-y-4">
                {data.education.length === 0 ? (
                  <p className="text-sm text-slate-500 italic">Chưa có thông tin học vấn.</p>
                ) : (
                  data.education.map(edu => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-bold text-slate-800">{edu.school || "Tên trường học"}</h4>
                        <span className="text-xs font-semibold text-slate-500">{edu.period || "Thời gian"}</span>
                      </div>
                      <div className="text-sm text-slate-700">{edu.degree || "Bằng cấp/Chuyên ngành"}</div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
