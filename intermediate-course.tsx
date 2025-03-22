"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  FileText,
  Lightbulb,
  BarChart2,
  ArrowRight,
  X,
  TrendingUp,
  PieChart,
  CheckCircle2,
  Lock,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { LevelAccessModal } from "@/components/level-access-modal"
import {
  type CourseLevel,
  initQuizCompletionState,
  markQuizCompleted,
  isLevelAccessible,
  getNextRequiredLevel,
} from "@/lib/course-state"

export default function IntermediateCourse() {
  const [activeSection, setActiveSection] = useState<string | null>("resources")
  const [expandedMenu, setExpandedMenu] = useState("intermediate")
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState<{
    id: string
    title: string
    videoUrl: string
  } | null>(null)
  const [quizCompletionState, setQuizCompletionState] = useState(() => initQuizCompletionState())
  const [accessModalOpen, setAccessModalOpen] = useState(false)
  const [attemptedLevel, setAttemptedLevel] = useState<CourseLevel | null>(null)

  useEffect(() => {
    // Initialize quiz completion state from localStorage
    setQuizCompletionState(initQuizCompletionState())

    // Check if this level is accessible
    if (!isLevelAccessible("intermediate")) {
      setAccessModalOpen(true)
      setAttemptedLevel("intermediate")
    }
  }, [])

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? "" : menu)
  }

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const submitQuiz = () => {
    const correctAnswers = {
      q1: "c",
      q2: "a",
      q3: "d",
      q4: "b",
      q5: "a",
    }

    let score = 0
    Object.keys(correctAnswers).forEach((questionId) => {
      if (quizAnswers[questionId] === correctAnswers[questionId as keyof typeof correctAnswers]) {
        score++
      }
    })

    setQuizScore(score)
    setQuizSubmitted(true)

    // If the user passed the quiz (e.g., score >= 3), mark this level as completed
    if (score >= 3) {
      markQuizCompleted("intermediate")
      setQuizCompletionState(initQuizCompletionState())
    }
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
  }

  const handleLevelClick = (level: CourseLevel) => {
    // Check if the level is accessible
    if (!isLevelAccessible(level)) {
      const requiredLevel = getNextRequiredLevel(level)
      if (requiredLevel) {
        setAttemptedLevel(level)
        setAccessModalOpen(true)
      }
      return false
    }
    return true
  }

  return (
    <div className="flex flex-col h-screen bg-valour-black text-white">
      {/* Market Ticker */}
      <div className="bg-valour-darkGray text-xs py-1 px-4 overflow-hidden whitespace-nowrap">
        <div className="flex space-x-4 animate-[marquee_30s_linear_infinite]">
          <div className="flex items-center">
            <span className="font-semibold">BTCUSD</span>
            <span className="ml-1 text-valour-green">88825.21945</span>
            <span className="ml-1 text-valour-green">+1285.2195 (0.32%)</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">ETHUSD</span>
            <span className="ml-1 text-red-500">2188.99861</span>
            <span className="ml-1 text-red-500">-2.1014 (-0.10%)</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">GBPUSD</span>
            <span className="ml-1 text-valour-green">1.29548</span>
            <span className="ml-1 text-valour-green">+0.0055 (0.43%)</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-valour-black border-b border-valour-gray">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold">Valour Academy</div>
          <Button className="bg-valour-green hover:bg-valour-darkGreen text-black">My Login</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 border-r border-valour-gray bg-valour-darkGray">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-1">
              <div className="mb-4 px-2 text-sm font-semibold text-gray-400 uppercase">Course Levels</div>
              <Link href="/" className="block">
                <CourseLevelComponent
                  title="Beginner"
                  isActive={false}
                  onClick={() => {}}
                  isCompleted={quizCompletionState.beginner}
                />
              </Link>
              <Link href="/intermediate" className="block">
                <CourseLevelComponent
                  title="Intermediate"
                  isActive={expandedMenu === "intermediate"}
                  onClick={() => toggleMenu("intermediate")}
                  isCurrentLevel={true}
                  isCompleted={quizCompletionState.intermediate}
                />
              </Link>
              <div onClick={() => handleLevelClick("professional")} className="block">
                <Link href={isLevelAccessible("professional") ? "/professional" : "#"} className="block">
                  <CourseLevelComponent
                    title="Professional"
                    isActive={expandedMenu === "professional"}
                    onClick={() => toggleMenu("professional")}
                    isLocked={!isLevelAccessible("professional")}
                  />
                </Link>
              </div>

              <div className="mt-6 mb-4 px-2 text-sm font-semibold text-gray-400 uppercase">Resources</div>
              <a
                href="#"
                className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-valour-gray transition-colors"
              >
                <BookOpen className="mr-2 h-4 w-4 text-valour-green" />
                <span>My Courses</span>
              </a>
              <a
                href="#"
                className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-valour-gray transition-colors"
              >
                <BarChart2 className="mr-2 h-4 w-4 text-valour-green" />
                <span>Market Analysis</span>
              </a>
              <a
                href="#"
                className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-valour-gray transition-colors"
              >
                <Lightbulb className="mr-2 h-4 w-4 text-valour-green" />
                <span>Trading Strategies</span>
              </a>
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Course Header */}
          <div className="constellation-bg border-b border-valour-gray">
            <div className="container mx-auto px-4 py-8 relative z-10">
              <div className="flex flex-col space-y-2 max-w-3xl">
                <div className="flex items-center text-sm text-gray-400">
                  <span>Intermediate</span>
                  <ArrowRight className="mx-2 h-3 w-3" />
                  <span>Module 1</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">Advanced Portfolio Management</h1>
                <p className="text-gray-300 max-w-2xl">
                  Develop sophisticated portfolio management techniques and learn how to optimize asset allocation for
                  different market conditions.
                </p>
                <div className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center text-sm">
                    <BookOpen className="mr-2 h-4 w-4 text-valour-green" />
                    <span>6 Lessons</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BarChart2 className="mr-2 h-4 w-4 text-valour-green" />
                    <span>Intermediate Level</span>
                  </div>
                  {quizCompletionState.intermediate && (
                    <div className="flex items-center text-sm bg-valour-green/10 text-valour-green px-2 py-1 rounded-full">
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <ScrollArea className="flex-1">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <CourseSection
                title="Resources"
                icon={<BookOpen className="h-5 w-5" />}
                isOpen={activeSection === "resources"}
                onToggle={() => toggleSection("resources")}
              >
                <div className="rounded-lg border border-valour-gray overflow-hidden mb-4">
                  <Image
                    src="/placeholder.svg?height=500&width=800"
                    alt="Portfolio analysis chart"
                    width={800}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
                <div className="mb-4">
                  <h3 className="font-medium mb-3">Course Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        id: "intermediate-video-1",
                        title: "Modern Portfolio Theory Explained",
                        duration: "22:15",
                        thumbnail: "/placeholder.svg?height=200&width=350",
                        videoUrl: "https://your-r2-bucket.example.com/videos/intermediate-mpt.mp4",
                      },
                      {
                        id: "intermediate-video-2",
                        title: "Advanced Asset Allocation",
                        duration: "19:40",
                        thumbnail: "/placeholder.svg?height=200&width=350",
                        videoUrl: "https://your-r2-bucket.example.com/videos/intermediate-asset-allocation.mp4",
                      },
                      {
                        id: "intermediate-video-3",
                        title: "Portfolio Rebalancing Strategies",
                        duration: "16:35",
                        thumbnail: "/placeholder.svg?height=200&width=350",
                        videoUrl: "https://your-r2-bucket.example.com/videos/intermediate-rebalancing.mp4",
                      },
                    ].map((video) => (
                      <VideoCard
                        key={video.id}
                        title={video.title}
                        duration={video.duration}
                        thumbnail={video.thumbnail}
                        onClick={() => {
                          setActiveVideo(video)
                          setVideoModalOpen(true)
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResourceCard
                    title="Asset Allocation Strategies"
                    description="Learn how to distribute investments across different asset classes"
                    icon={<PieChart className="h-5 w-5" />}
                  />
                  <ResourceCard
                    title="Risk Management Techniques"
                    description="Advanced methods to mitigate risk in volatile markets"
                    icon={<TrendingUp className="h-5 w-5" />}
                  />
                </div>
              </CourseSection>

              <CourseSection
                title="Notes"
                icon={<FileText className="h-5 w-5" />}
                isOpen={activeSection === "notes"}
                onToggle={() => toggleSection("notes")}
              >
                <div className="p-4 rounded-lg border border-valour-gray bg-valour-darkGray">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h3 className="text-white">Key Concepts</h3>
                    <ul className="text-gray-300">
                      <li>Modern Portfolio Theory (MPT) and its practical applications</li>
                      <li>Efficient frontier optimization for balancing risk and return</li>
                      <li>Tactical vs. strategic asset allocation approaches</li>
                      <li>Rebalancing strategies and their impact on long-term performance</li>
                    </ul>
                    <h3 className="text-white mt-4">Advanced Considerations</h3>
                    <p className="text-gray-300">
                      How do macroeconomic factors influence optimal asset allocation? What role should alternative
                      investments play in a diversified portfolio?
                    </p>
                  </div>
                </div>
              </CourseSection>

              <CourseSection
                title="Knowledge"
                icon={<Lightbulb className="h-5 w-5" />}
                isOpen={activeSection === "knowledge"}
                onToggle={() => toggleSection("knowledge")}
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-valour-gray bg-valour-darkGray">
                      <h3 className="font-medium mb-2">Modern Portfolio Theory</h3>
                      <p className="text-sm text-gray-300">
                        An investment framework that aims to maximize expected return for a given level of risk by
                        carefully choosing the proportions of various assets.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-valour-gray bg-valour-darkGray">
                      <h3 className="font-medium mb-2">Sharpe Ratio</h3>
                      <p className="text-sm text-gray-300">
                        A measure that indicates the average return earned in excess of the risk-free rate per unit of
                        volatility or total risk.
                      </p>
                    </div>
                  </div>

                  {/* Quiz Section */}
                  <div className="p-4 rounded-lg border border-valour-gray bg-valour-darkGray">
                    <h3 className="font-medium mb-4 text-lg flex items-center">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-valour-green" />
                      Knowledge Check Quiz
                      {quizCompletionState.intermediate && (
                        <span className="ml-2 text-xs bg-valour-green/10 text-valour-green px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </h3>

                    {quizSubmitted ? (
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-valour-green/10 border border-valour-green">
                          <p className="font-medium text-valour-green">Your Score: {quizScore}/5</p>
                          <p className="text-sm text-gray-300 mt-1">
                            {quizScore === 5
                              ? "Excellent! You've mastered this section."
                              : quizScore >= 3
                                ? "Good job! You've passed this level and can now access the Professional level."
                                : "Keep studying! You need to score at least 3/5 to unlock the next level."}
                          </p>
                        </div>
                        <Button onClick={resetQuiz} className="bg-valour-green hover:bg-valour-darkGreen text-black">
                          Retake Quiz
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Question 1 */}
                        <div className="space-y-2">
                          <p className="font-medium">1. What is the Efficient Frontier in Modern Portfolio Theory?</p>
                          <RadioGroup
                            value={quizAnswers.q1}
                            onValueChange={(value) => handleQuizAnswer("q1", value)}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="a" id="q1-a" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q1-a" className="text-gray-300">
                                The point where all investments have zero risk
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="b" id="q1-b" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q1-b" className="text-gray-300">
                                The maximum possible return regardless of risk
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="c" id="q1-c" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q1-c" className="text-gray-300">
                                The set of optimal portfolios that offer the highest expected return for a defined level
                                of risk
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="d" id="q1-d" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q1-d" className="text-gray-300">
                                The boundary between safe and risky investments
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Question 2 */}
                        <div className="space-y-2">
                          <p className="font-medium">2. What is the primary purpose of portfolio rebalancing?</p>
                          <RadioGroup
                            value={quizAnswers.q2}
                            onValueChange={(value) => handleQuizAnswer("q2", value)}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="a" id="q2-a" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q2-a" className="text-gray-300">
                                To maintain the desired asset allocation and risk level
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="b" id="q2-b" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q2-b" className="text-gray-300">
                                To maximize short-term gains
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="c" id="q2-c" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q2-c" className="text-gray-300">
                                To avoid paying taxes on investments
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="d" id="q2-d" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q2-d" className="text-gray-300">
                                To increase portfolio complexity
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Question 3 */}
                        <div className="space-y-2">
                          <p className="font-medium">3. What is beta in investment terms?</p>
                          <RadioGroup
                            value={quizAnswers.q3}
                            onValueChange={(value) => handleQuizAnswer("q3", value)}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="a" id="q3-a" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q3-a" className="text-gray-300">
                                The expected return of an investment
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="b" id="q3-b" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q3-b" className="text-gray-300">
                                The dividend yield of a stock
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="c" id="q3-c" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q3-c" className="text-gray-300">
                                The risk-free rate of return
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="d" id="q3-d" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q3-d" className="text-gray-300">
                                A measure of volatility or systematic risk compared to the market
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Question 4 */}
                        <div className="space-y-2">
                          <p className="font-medium">4. What is tactical asset allocation?</p>
                          <RadioGroup
                            value={quizAnswers.q4}
                            onValueChange={(value) => handleQuizAnswer("q4", value)}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="a" id="q4-a" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q4-a" className="text-gray-300">
                                A long-term investment strategy that never changes
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="b" id="q4-b" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q4-b" className="text-gray-300">
                                Actively adjusting a portfolio's asset allocation based on short-term market forecasts
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="c" id="q4-c" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q4-c" className="text-gray-300">
                                Investing only in military-related companies
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="d" id="q4-d" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q4-d" className="text-gray-300">
                                Avoiding all high-risk investments
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Question 5 */}
                        <div className="space-y-2">
                          <p className="font-medium">5. What is the Capital Asset Pricing Model (CAPM) used for?</p>
                          <RadioGroup
                            value={quizAnswers.q5}
                            onValueChange={(value) => handleQuizAnswer("q5", value)}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="a" id="q5-a" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q5-a" className="text-gray-300">
                                Calculating the expected return of an asset based on its risk relative to the market
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="b" id="q5-b" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q5-b" className="text-gray-300">
                                Determining the capital gains tax on investments
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="c" id="q5-c" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q5-c" className="text-gray-300">
                                Measuring a company's total assets
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="d" id="q5-d" className="border-valour-gray text-valour-green" />
                              <Label htmlFor="q5-d" className="text-gray-300">
                                Predicting stock market crashes
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Button
                          onClick={submitQuiz}
                          className="bg-valour-green hover:bg-valour-darkGreen text-black"
                          disabled={Object.keys(quizAnswers).length < 5}
                        >
                          Submit Answers
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CourseSection>
            </div>
          </ScrollArea>

          {/* Course Navigation */}
          <div className="border-t border-valour-gray bg-valour-darkGray p-4">
            <div className="container mx-auto flex justify-between">
              <Button variant="outline" disabled className="border-valour-gray text-gray-400">
                Previous Lesson
              </Button>
              <Button className="bg-valour-green hover:bg-valour-darkGreen text-black">
                Next Lesson
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && activeVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-valour-darkGray rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-valour-gray">
              <h3 className="font-medium">{activeVideo.title}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setVideoModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative w-full aspect-video bg-black">
              <video className="w-full h-full" controls autoPlay src={activeVideo.videoUrl}>
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Level Access Modal */}
      {accessModalOpen && attemptedLevel && (
        <LevelAccessModal
          isOpen={accessModalOpen}
          onClose={() => setAccessModalOpen(false)}
          requiredLevel={getNextRequiredLevel(attemptedLevel) || "beginner"}
          currentLevel={attemptedLevel}
        />
      )}
    </div>
  )
}

interface CourseLevelProps {
  title: string
  isActive: boolean
  isCurrentLevel?: boolean
  isCompleted?: boolean
  isLocked?: boolean
  onClick: () => void
}

function CourseLevelComponent({ title, isActive, isCurrentLevel, isCompleted, isLocked, onClick }: CourseLevelProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md transition-colors",
        isCurrentLevel ? "text-valour-green font-medium" : "text-white",
        isActive ? "bg-valour-gray" : "hover:bg-valour-gray/50",
        isLocked && "opacity-70",
      )}
    >
      <div className="flex items-center">
        {isLocked ? (
          <Lock className="mr-2 h-3.5 w-3.5 text-gray-400" />
        ) : isCompleted ? (
          <CheckCircle2 className="mr-2 h-3.5 w-3.5 text-valour-green" />
        ) : null}
        <span>{title}</span>
      </div>
      <ChevronRight className={cn("h-4 w-4 transition-transform", isActive && "rotate-90")} />
    </button>
  )
}

interface CourseSectionProps {
  title: string
  icon: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function CourseSection({ title, icon, isOpen, onToggle, children }: CourseSectionProps) {
  return (
    <div className="rounded-lg border border-valour-gray bg-valour-darkGray overflow-hidden">
      <button onClick={onToggle} className="flex items-center justify-between w-full p-4 text-left">
        <div className="flex items-center space-x-2">
          <div className="text-valour-green">{icon}</div>
          <h2 className="font-medium">{title}</h2>
        </div>
        {isOpen ? <X className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>
      {isOpen && <div className="p-4 pt-0 border-t border-valour-gray">{children}</div>}
    </div>
  )
}

interface ResourceCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

function ResourceCard({ title, description, icon }: ResourceCardProps) {
  return (
    <div className="p-4 rounded-lg border border-valour-gray bg-valour-darkGray hover:bg-valour-gray/50 transition-colors cursor-pointer">
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-full bg-valour-green/10 text-valour-green">{icon}</div>
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  )
}

interface VideoCardProps {
  title: string
  duration: string
  thumbnail: string
  onClick: () => void
}

function VideoCard({ title, duration, thumbnail, onClick }: VideoCardProps) {
  return (
    <div
      className="rounded-lg overflow-hidden border border-valour-gray bg-valour-darkGray hover:bg-valour-gray/50 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={350}
          height={200}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-valour-green/90 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm line-clamp-2">{title}</h4>
      </div>
    </div>
  )
}

