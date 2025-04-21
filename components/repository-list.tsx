"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Star, GitFork, Code, ExternalLink, Loader, AlertCircle } from "lucide-react"

interface Repository {
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
}

// Fallback repositories to use when API requests fail
const fallbackRepositories = [
  {
    name: "Web-Profile-V1",
    description: "Web Profile giới thiệu bản thân v1",
    html_url: "https://github.com/thanhdo1110/web-profile-v1",
    stargazers_count: 42,
    forks_count: 12,
    language: "TypeScript",
  },
  {
    name: "Bug-Hunter-Tools",
    description: "Collection of tools for bug hunting and security research",
    html_url: "https://github.com/thanhdo1110/bug-hunter-tools",
    stargazers_count: 87,
    forks_count: 15,
    language: "Python",
  },
  {
    name: "Tech-Tutorials",
    description: "Tutorials and guides for various technologies",
    html_url: "https://github.com/thanhdo1110/tech-tutorials",
    stargazers_count: 63,
    forks_count: 9,
    language: "JavaScript",
  },
  {
    name: "Cybersecurity-Notes",
    description: "Personal notes on cybersecurity topics and findings",
    html_url: "https://github.com/thanhdo1110/cybersecurity-notes",
    stargazers_count: 35,
    forks_count: 7,
    language: "Markdown",
  },
  {
    name: "Mobile-App-Mods",
    description: "Modified versions of popular mobile applications",
    html_url: "https://github.com/thanhdo1110/mobile-app-mods",
    stargazers_count: 92,
    forks_count: 18,
    language: "Java",
  },
  {
    name: "Security-Scripts",
    description: "Collection of security testing scripts and tools",
    html_url: "https://github.com/thanhdo1110/security-scripts",
    stargazers_count: 56,
    forks_count: 11,
    language: "Python",
  },
]

export default function RepositoryList({ username }: { username: string }) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allLoaded, setAllLoaded] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)
  const loadingRef = useRef(false)
  const pageRef = useRef(1)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Function to fetch repositories - optimized to avoid duplicate fetches
  const fetchRepositories = useCallback(async () => {
    // Prevent concurrent fetches
    if (loadingRef.current || allLoaded) return

    try {
      loadingRef.current = true
      const isFirstLoad = pageRef.current === 1

      if (isFirstLoad) {
        setLoading(true)
      }

      // Fetch a large batch (100 per page) to minimize API calls
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${pageRef.current}`,
      )

      if (!response.ok) {
        // If we get a 403 or other error, use fallback data
        console.warn(`GitHub API error: ${response.status}. Using fallback data.`)

        if (isFirstLoad) {
          setRepositories(fallbackRepositories)
          setUsingFallback(true)
          setAllLoaded(true)
        }

        throw new Error(`Failed to fetch repositories: ${response.status}`)
      }

      const data = await response.json()

      // Append new repositories to existing ones
      setRepositories((prev) => [...prev, ...data])

      // Check if we've reached the end
      if (data.length < 100) {
        setAllLoaded(true)
      } else {
        pageRef.current += 1
      }
    } catch (err) {
      console.error("Error fetching repositories:", err)

      // Only set error if we're not using fallback data
      if (!usingFallback) {
        if (pageRef.current === 1) {
          // If first page fails and we haven't set fallback data yet, use fallbacks
          setRepositories(fallbackRepositories)
          setUsingFallback(true)
          setAllLoaded(true)
        } else {
          // If subsequent pages fail, just mark as all loaded
          setAllLoaded(true)
        }
      }
    } finally {
      loadingRef.current = false
      if (pageRef.current === 1 || usingFallback) {
        setLoading(false)
      }
    }
  }, [username, allLoaded, usingFallback])

  // Initial fetch of repositories
  useEffect(() => {
    fetchRepositories()
  }, [fetchRepositories])

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    // Only observe if we haven't loaded all repositories yet
    if (allLoaded) {
      if (observerRef.current && loadMoreRef.current) {
        observerRef.current.unobserve(loadMoreRef.current)
      }
      return
    }

    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create new observer with a higher threshold to load earlier
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !loadingRef.current && !allLoaded) {
          fetchRepositories()
        }
      },
      { threshold: 0.1, rootMargin: "200px" }, // Load earlier with larger rootMargin
    )

    // Observe the load more element
    const currentLoadMoreRef = loadMoreRef.current
    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef)
    }

    return () => {
      if (observerRef.current && currentLoadMoreRef) {
        observerRef.current.unobserve(currentLoadMoreRef)
      }
    }
  }, [fetchRepositories, allLoaded])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-black/10 to-black/5 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 h-32 animate-pulse"
          >
            <div className="w-2/3 h-5 bg-purple-500/20 rounded mb-3"></div>
            <div className="w-full h-4 bg-purple-500/10 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-purple-500/10 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error && !usingFallback) {
    return (
      <div className="bg-black/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 text-center">
        <p className="text-red-400 mb-2">Failed to load repositories</p>
        <p className="text-gray-400 text-sm">{error}</p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-cyan-400 text-sm mt-2 hover:text-cyan-300"
        >
          View on GitHub <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {usingFallback && (
        <div className="bg-black/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3 mb-4 flex items-center">
          <AlertCircle className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
          <p className="text-gray-300 text-sm">GitHub API rate limit reached. Showing sample repositories.</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {repositories.map((repo, index) => {
          // Generate a preview image URL - use GitHub's default repository social preview
          const previewImageUrl = `https://opengraph.githubassets.com/1/${username}/${repo.name}`

          return (
            <div
              key={repo.name + index}
              className="bg-gradient-to-r from-black/10 to-black/5 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              {/* Repository preview image */}
              <div className="w-full h-24 overflow-hidden relative">
                <img
                  src={previewImageUrl || "/placeholder.svg"}
                  alt={`${repo.name} preview`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // If GitHub preview image fails to load, use the default image
                    e.currentTarget.src = "/code-repository-structure.png"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-3 flex flex-col flex-grow">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white hover:text-cyan-400 transition-colors duration-300 flex items-center truncate"
                >
                  {repo.name}
                  <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0 opacity-70" />
                </a>

                <p className="text-gray-400 text-xs mt-1 mb-2 line-clamp-2 flex-grow">
                  {repo.description || "No description provided"}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-gray-400 text-xs">
                      <Star className="w-3 h-3 mr-1 text-yellow-400" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <GitFork className="w-3 h-3 mr-1 text-purple-400" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>

                  {repo.language && (
                    <div className="flex items-center text-gray-400 text-xs">
                      <Code className="w-3 h-3 mr-1 text-cyan-400" />
                      <span className="truncate max-w-[60px]">{repo.language}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Loading indicator - only visible when not all repositories are loaded */}
      {!allLoaded && (
        <div ref={loadMoreRef} className="w-full py-4 flex justify-center">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Loader className="w-4 h-4 animate-spin" />
            <span>Loading more repositories...</span>
          </div>
        </div>
      )}

      {/* View all repositories link */}
      <a
        href={`https://github.com/${username}?tab=repositories`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-2 px-4 bg-[#171321]/30 hover:bg-[#171321]/50 rounded-lg border border-purple-500/30 text-purple-400 transition-colors duration-300 mt-2"
      >
        <span className="flex items-center justify-center">
          <Code className="w-4 h-4 mr-2" />
          View All Repositories on GitHub
          <ExternalLink className="w-3 h-3 ml-1" />
        </span>
      </a>
    </div>
  )
}
