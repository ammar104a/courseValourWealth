// This is a utility file to handle Cloudflare R2 video URLs
// You'll need to customize this based on your R2 setup

interface VideoMetadata {
  id: string
  title: string
  description?: string
  duration: string
  thumbnail: string
  videoUrl: string
  courseLevel: "beginner" | "intermediate" | "professional"
  moduleId: string
}

// Replace with your actual Cloudflare R2 bucket URL
const R2_BASE_URL = "https://a5f9ee7b3883a9c77c46adca93821bec.r2.cloudflarestorage.com"

// Sample video data - replace with your actual video metadata
export const courseVideos: VideoMetadata[] = [
  // Beginner videos
  {
    id: "beginner-video-1",
    title: "Introduction to Financial Markets",
    description: "Learn the basics of financial markets and how they function",
    duration: "08:56",
    thumbnail: "/beginner1.svg?height=200&width=350",
    videoUrl: "https://pub-d2ff83079c6c49b8ab7c726284b83a97.r2.dev/beginner-intro.mp4",
    courseLevel: "beginner",
    moduleId: "module-1",
  },
  {
    id: "beginner-video-2",
    title: "Understanding Risk & Return",
    description: "Explore the relationship between risk and return in investments",
    duration: "15:20",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: "https://pub-d2ff83079c6c49b8ab7c726284b83a97.r2.dev/beginner-intro.mp4",
    courseLevel: "beginner",
    moduleId: "module-1",
  },
  {
    id: "beginner-video-3",
    title: "Building Your First Portfolio",
    description: "Step-by-step guide to creating a balanced investment portfolio",
    duration: "18:10",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: "https://pub-d2ff83079c6c49b8ab7c726284b83a97.r2.dev/beginner-intro.mp4",
    courseLevel: "beginner",
    moduleId: "module-1",
  },

  // Intermediate videos
  {
    id: "intermediate-video-1",
    title: "Modern Portfolio Theory Explained",
    description: "Deep dive into MPT and its applications in portfolio management",
    duration: "22:15",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: `${R2_BASE_URL}/intermediate-mpt.mp4`,
    courseLevel: "intermediate",
    moduleId: "module-1",
  },
  {
    id: "intermediate-video-2",
    title: "Advanced Asset Allocation",
    description: "Sophisticated techniques for optimizing asset allocation",
    duration: "19:40",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: `${R2_BASE_URL}/intermediate-asset-allocation.mp4`,
    courseLevel: "intermediate",
    moduleId: "module-1",
  },
  {
    id: "intermediate-video-3",
    title: "Portfolio Rebalancing Strategies",
    description: "Learn when and how to rebalance your portfolio for optimal performance",
    duration: "16:35",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: `${R2_BASE_URL}/intermediate-rebalancing.mp4`,
    courseLevel: "intermediate",
    moduleId: "module-1",
  },

  // Professional videos
  {
    id: "professional-video-1",
    title: "Institutional Trading Strategies",
    description: "Advanced trading techniques used by professional institutions",
    duration: "28:50",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: `${R2_BASE_URL}/professional-trading.mp4`,
    courseLevel: "professional",
    moduleId: "module-1",
  },
  {
    id: "professional-video-2",
    title: "Algorithmic Trading Systems",
    description: "Building and implementing algorithmic trading systems",
    duration: "32:15",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: `${R2_BASE_URL}/professional-algo-trading.mp4`,
    courseLevel: "professional",
    moduleId: "module-1",
  },
  {
    id: "professional-video-3",
    title: "Advanced Derivatives & Structured Products",
    description: "Understanding complex financial instruments and their applications",
    duration: "25:40",
    thumbnail: "/placeholder.svg?height=200&width=350",
    videoUrl: `${R2_BASE_URL}/professional-derivatives.mp4`,
    courseLevel: "professional",
    moduleId: "module-1",
  },
]

/**
 * Get videos for a specific course level and module
 */
export function getVideosForCourse(
  level: "beginner" | "intermediate" | "professional",
  moduleId: string,
): VideoMetadata[] {
  return courseVideos.filter((video) => video.courseLevel === level && video.moduleId === moduleId)
}

/**
 * Generate a signed URL for Cloudflare R2 (if needed)
 * This is a placeholder function - you'll need to implement the actual signing logic
 * based on your Cloudflare R2 setup and authentication requirements
 */
export async function getSignedVideoUrl(videoId: string): Promise<string> {
  // Find the video
  const video = courseVideos.find((v) => v.id === videoId)

  if (!video) {
    throw new Error(`Video with ID ${videoId} not found`)
  }

  // In a real implementation, you would:
  // 1. Generate a signed URL with appropriate expiration
  // 2. Include any necessary authentication tokens
  // 3. Handle any R2-specific requirements

  // For now, we'll just return the basic URL
  return video.videoUrl
}

