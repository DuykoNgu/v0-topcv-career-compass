"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Header from "@/components/layout/header"
import WelcomeScreen from "@/components/screens/welcome-screen"
import CareerStageScreen from "@/components/screens/career-stage-screen"
import OnboardingScreen from "@/components/screens/onboarding-screen"
import CareerCompassResult from "@/components/screens/career-compass-result"
import ProfileBuilderScreen from "@/components/screens/profile-builder-screen"
import JobMatchScreen, { sampleJobs } from "@/components/screens/job-match-screen"
import JobDetailScreen from "@/components/screens/job-detail-screen"
import FitExplanationScreen from "@/components/screens/fit-explanation-screen"
import ApplyScreen from "@/components/screens/apply-screen"
import ReferralScreen from "@/components/screens/referral-screen"
import { calculateJobMatchScore } from "@/lib/match"

export type Screen = 
  | "welcome"
  | "career-stage"
  | "onboarding"
  | "compass-result"
  | "profile-builder"
  | "job-match"
  | "job-detail"
  | "fit-explanation"
  | "apply"
  | "referral"

export type CareerStage = "student" | "office" | null

export interface PreviousJobSurvey {
  title: string
  salary: number
  workMode: string
  hasMentor: boolean
  dislikedFactors: string[]
  expectedImprovements: string[]
}

export interface UserProfile {
  careerStage: CareerStage
  skills: string[]
  interests: string[]
  experience: string
  goals: string
  previousJobSurvey?: PreviousJobSurvey
}

export interface Job {
  id: string
  title: string
  company: string
  logo: string
  salary: string
  workMode: string
  hasMentor: boolean
  isVerified: boolean
  matchScore: number
  location: string
  description: string
  requirements: string[]
  benefits: string[]
  experience?: string
  jobType?: string
  field?: string
  salaryMin?: number
  salaryMax?: number
}

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [userProfile, setUserProfile] = useState<UserProfile>({
    careerStage: null,
    skills: [],
    interests: [],
    experience: "",
    goals: "",
  })
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  const handleCareerStageSelect = (stage: CareerStage) => {
    setUserProfile(prev => ({ ...prev, careerStage: stage }))
    handleNavigate("onboarding")
  }

  const handleOnboardingComplete = (data: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...data }))
    handleNavigate("compass-result")
  }

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job)
    handleNavigate("job-detail")
  }

  const handleUserProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }))
  }

  const processedJobs = sampleJobs.map(job => ({
    ...job,
    matchScore: calculateJobMatchScore(job, userProfile)
  }))

  const processedSelectedJob = selectedJob 
    ? processedJobs.find(j => j.id === selectedJob.id) || selectedJob 
    : null

  const showHeader = currentScreen !== "welcome"

  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <Header 
          showNav={currentScreen === "job-match" || currentScreen === "job-detail"} 
          onLogoClick={() => handleNavigate("welcome")}
        />
      )}
      
      <main>
        <AnimatePresence mode="wait">
          {currentScreen === "welcome" && (
            <WelcomeScreen 
              key="welcome"
              onStart={() => handleNavigate("career-stage")} 
            />
          )}
          {currentScreen === "career-stage" && (
            <CareerStageScreen 
              key="career-stage"
              onSelect={handleCareerStageSelect}
              onBack={() => handleNavigate("welcome")}
            />
          )}
          {currentScreen === "onboarding" && (
            <OnboardingScreen 
              key="onboarding"
              careerStage={userProfile.careerStage}
              onComplete={handleOnboardingComplete}
              onBack={() => handleNavigate("career-stage")}
            />
          )}
          {currentScreen === "compass-result" && (
            <CareerCompassResult 
              key="compass-result"
              userProfile={userProfile}
              onCreateProfile={() => handleNavigate("profile-builder")}
              onViewJobs={() => handleNavigate("job-match")}
              onBack={() => handleNavigate("onboarding")}
            />
          )}
          {currentScreen === "profile-builder" && (
            <ProfileBuilderScreen 
              key="profile-builder"
              userProfile={userProfile}
              onComplete={() => handleNavigate("job-match")}
              onBack={() => handleNavigate("compass-result")}
            />
          )}
          {currentScreen === "job-match" && (
            <JobMatchScreen 
              key="job-match"
              userProfile={userProfile}
              jobs={processedJobs}
              onJobSelect={handleJobSelect}
              onBack={() => handleNavigate("profile-builder")}
            />
          )}
          {currentScreen === "job-detail" && processedSelectedJob && (
            <JobDetailScreen 
              key="job-detail"
              job={processedSelectedJob}
              userProfile={userProfile}
              onApply={() => handleNavigate("apply")}
              onViewFit={() => handleNavigate("fit-explanation")}
              onBack={() => handleNavigate("job-match")}
            />
          )}
          {currentScreen === "fit-explanation" && processedSelectedJob && (
            <FitExplanationScreen 
              key="fit-explanation"
              job={processedSelectedJob}
              userProfile={userProfile}
              onUserProfileUpdate={handleUserProfileUpdate}
              onBack={() => handleNavigate("job-detail")}
              onApply={() => handleNavigate("apply")}
            />
          )}
          {currentScreen === "apply" && processedSelectedJob && (
            <ApplyScreen 
              key="apply"
              job={processedSelectedJob}
              onSuccess={() => handleNavigate("referral")}
              onBack={() => handleNavigate("job-detail")}
            />
          )}
          {currentScreen === "referral" && (
            <ReferralScreen 
              key="referral"
              onDone={() => handleNavigate("job-match")}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
