"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { CourseLevel } from "@/lib/course-state"

interface LevelAccessModalProps {
  isOpen: boolean
  onClose: () => void
  requiredLevel: CourseLevel
  currentLevel: CourseLevel
}

export function LevelAccessModal({ isOpen, onClose, requiredLevel, currentLevel }: LevelAccessModalProps) {
  if (!isOpen) return null

  const levelNames = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    professional: "Professional",
  }

  const levelPaths = {
    beginner: "/",
    intermediate: "/intermediate",
    professional: "/professional",
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-valour-darkGray rounded-lg max-w-md w-full overflow-hidden flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-valour-gray">
          <h3 className="font-medium text-lg">Course Level Locked</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-valour-darkGray border-2 border-valour-green flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-valour-green"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          <p className="text-center text-gray-300 mb-4">
            You need to complete the {levelNames[requiredLevel]} level quiz before accessing the{" "}
            {levelNames[currentLevel]} level.
          </p>
          <div className="flex justify-center">
            <Link href={levelPaths[requiredLevel]}>
              <Button className="bg-valour-green hover:bg-valour-darkGreen text-black">
                Go to {levelNames[requiredLevel]} Level
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

