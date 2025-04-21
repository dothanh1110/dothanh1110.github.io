"use client"

import { Github, ExternalLink, Star, GitFork } from "lucide-react"
import { useState, useEffect } from "react"

// Define the GitHubData interface
interface GitHubData {
  stargazers_count: number
  forks_count: number
  loading: boolean
  error: boolean
}

// Update the RepositoryProps interface to include stars and forks
interface RepositoryProps {
  title: string
  description: string
  url: string
  image: string | null
  index: number
  stars?: number
  forks?: number
}

// Update the RepositoryCard component to fetch data from GitHub API
export default function RepositoryCard({
  title,
  description,
  url,
  image,
  index,
  stars = 0,
  forks = 0,
}: RepositoryProps) {
  const [githubData, setGithubData] = useState<GitHubData>({
    stargazers_count: stars,
    forks_count: forks,
    loading: false,
    error: false,
  })

  useEffect(() => {
    // Only try to fetch if we have a GitHub URL
    if (url && url.includes("github.com")) {
      const fetchRepoData = async () => {
        try {
          setGithubData((prev) => ({ ...prev, loading: true }))

          // Extract owner and repo name from GitHub URL
          const urlParts = url.replace("https://github.com/", "").split("/")
          if (urlParts.length >= 2) {
            const owner = urlParts[0]
            const repo = urlParts[1]

            // Fetch repository data from GitHub API
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)

            if (response.ok) {
              const data = await response.json()
              setGithubData({
                stargazers_count: data.stargazers_count,
                forks_count: data.forks_count,
                loading: false,
                error: false,
              })
            } else {
              // If API request fails, fall back to the provided values
              setGithubData({
                stargazers_count: stars,
                forks_count: forks,
                loading: false,
                error: true,
              })
            }
          }
        } catch (error) {
          console.error("Error fetching repository data:", error)
          // Fall back to the provided values
          setGithubData({
            stargazers_count: stars,
            forks_count: forks,
            loading: false,
            error: true,
          })
        }
      }

      fetchRepoData()
    }
  }, [url, stars, forks])

  // Rest of the component remains the same...
  const getColor = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    const colors = [
      {
        bg: "from-cyan-500/10 to-cyan-900/10",
        border: "border-cyan-500/40",
        icon: "bg-cyan-500/20 text-cyan-400",
        hover: "rgba(6, 182, 212, 0.2)",
      },
      {
        bg: "from-pink-500/10 to-pink-900/10",
        border: "border-pink-500/40",
        icon: "bg-pink-500/20 text-pink-400",
        hover: "rgba(236, 72, 153, 0.2)",
      },
      {
        bg: "from-purple-500/10 to-purple-900/10",
        border: "border-purple-500/40",
        icon: "bg-purple-500/20 text-purple-400",
        hover: "rgba(168, 85, 247, 0.2)",
      },
      {
        bg: "from-blue-500/10 to-blue-900/10",
        border: "border-blue-500/40",
        icon: "bg-blue-500/20 text-blue-400",
        hover: "rgba(59, 130, 246, 0.2)",
      },
    ]

    return colors[Math.abs(hash) % colors.length]
  }

  const color = getColor(title)

  // Default GitHub repository preview image
  const defaultImage = "/code-repository-structure.png"

  return (
    <div
      className={`bg-gradient-to-r ${color.bg} backdrop-blur-sm ${color.border} border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full`}
    >
      {/* Repository image */}
      <div className="w-full h-24 overflow-hidden relative">
        {/* Generate GitHub preview URL if we have a GitHub URL */}
        {url && url.includes("github.com") ? (
          <img
            src={(() => {
              // Extract owner and repo name from GitHub URL
              const urlParts = url.replace("https://github.com/", "").split("/")
              if (urlParts.length >= 2) {
                const owner = urlParts[0]
                const repo = urlParts[1]
                // Use GitHub's repository preview image
                return `https://opengraph.githubassets.com/1/${owner || "/placeholder.svg"}/${repo}`
              }
              // Fallback to provided image or default
              return image || "/code-repository-structure.png"
            })()}
            alt={`${title} preview`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If GitHub preview image fails to load, use the default image
              e.currentTarget.src = "/code-repository-structure.png"
            }}
          />
        ) : (
          <img
            src={image || "/code-repository-structure.png"}
            alt={`${title} preview`}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-2 left-3 flex items-center space-x-3">
          <div className={`p-1.5 rounded-md ${color.icon}`}>
            <Github className="w-4 h-4" />
          </div>
          <h3 className="text-white font-medium text-sm truncate">{title}</h3>
        </div>
      </div>

      {/* Repository content */}
      <div className="p-3 flex-grow">
        <p className="text-gray-300 text-xs line-clamp-2 mb-2">{description}</p>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex space-x-3">
            <div className="flex items-center text-gray-400 text-xs">
              <Star className="w-3.5 h-3.5 mr-1" />
              <span>{githubData.loading ? "..." : githubData.stargazers_count}</span>
            </div>
            <div className="flex items-center text-gray-400 text-xs">
              <GitFork className="w-3.5 h-3.5 mr-1" />
              <span>{githubData.loading ? "..." : githubData.forks_count}</span>
            </div>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center text-xs"
          >
            <span className="mr-1">View</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
