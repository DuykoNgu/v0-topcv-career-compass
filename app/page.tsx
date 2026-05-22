"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import WelcomeScreen from "@/components/screens/welcome-screen"
import CareerStageScreen from "@/components/screens/career-stage-screen"
import OnboardingScreen from "@/components/screens/onboarding-screen"
import CareerCompassResult from "@/components/screens/career-compass-result"
import ProfileBuilderScreen from "@/components/screens/profile-builder-screen"
import JobMatchScreen from "@/components/screens/job-match-screen"
import JobDetailScreen from "@/components/screens/job-detail-screen"
import FitExplanationScreen from "@/components/screens/fit-explanation-screen"
import ApplyScreen from "@/components/screens/apply-screen"
import ReferralScreen from "@/components/screens/referral-screen"

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

export interface UserProfile {
  careerStage: CareerStage
  skills: string[]
  interests: string[]
  experience: string
  goals: string
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

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-md min-h-screen">
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
              onJobSelect={handleJobSelect}
              onBack={() => handleNavigate("profile-builder")}
            />
          )}
          {currentScreen === "job-detail" && selectedJob && (
            <JobDetailScreen 
              key="job-detail"
              job={selectedJob}
              userProfile={userProfile}
              onApply={() => handleNavigate("apply")}
              onViewFit={() => handleNavigate("fit-explanation")}
              onBack={() => handleNavigate("job-match")}
            />
          )}
          {currentScreen === "fit-explanation" && selectedJob && (
            <FitExplanationScreen 
              key="fit-explanation"
              job={selectedJob}
              userProfile={userProfile}
              onBack={() => handleNavigate("job-detail")}
              onApply={() => handleNavigate("apply")}
            />
          )}
          {currentScreen === "apply" && selectedJob && (
            <ApplyScreen 
              key="apply"
              job={selectedJob}
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
      </div>
    </main>
  )
}
