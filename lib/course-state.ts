// This file manages the course state and quiz completion status

// Define the course levels
export type CourseLevel = "beginner" | "intermediate" | "professional"

// Define the quiz completion state interface
interface QuizCompletionState {
  beginner: boolean
  intermediate: boolean
  professional: boolean
}

// Local storage key for quiz completion state
const QUIZ_COMPLETION_KEY = "valour-academy-quiz-completion"

// Initialize quiz completion state
export function initQuizCompletionState(): QuizCompletionState {
  if (typeof window === "undefined") {
    return {
      beginner: false,
      intermediate: false,
      professional: false,
    }
  }

  const savedState = localStorage.getItem(QUIZ_COMPLETION_KEY)

  if (savedState) {
    try {
      return JSON.parse(savedState)
    } catch (error) {
      console.error("Error parsing quiz completion state:", error)
    }
  }

  return {
    beginner: false,
    intermediate: false,
    professional: false,
  }
}

// Save quiz completion state
export function saveQuizCompletionState(state: QuizCompletionState): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(QUIZ_COMPLETION_KEY, JSON.stringify(state))
  }
}

// Mark a level's quiz as completed
export function markQuizCompleted(level: CourseLevel): void {
  const state = initQuizCompletionState()
  state[level] = true
  saveQuizCompletionState(state)
}

// Check if a level is accessible
export function isLevelAccessible(level: CourseLevel): boolean {
  const state = initQuizCompletionState()

  switch (level) {
    case "beginner":
      return true // Beginner level is always accessible
    case "intermediate":
      return state.beginner // Intermediate requires beginner completion
    case "professional":
      return state.intermediate // Professional requires intermediate completion
    default:
      return false
  }
}

// Get the next required level to complete
export function getNextRequiredLevel(level: CourseLevel): CourseLevel | null {
  const state = initQuizCompletionState()

  if (level === "intermediate" && !state.beginner) {
    return "beginner"
  }

  if (level === "professional" && !state.intermediate) {
    return "intermediate"
  }

  return null
}

