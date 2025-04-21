"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"

interface GitHubStats {
  username: string
  theme?: string
  hideBorder?: boolean
  bgColor?: string
}

export default function GitHubStats({
  username,
  theme = "radical",
  hideBorder = true,
  bgColor = "00000000",
}: GitHubStats) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Build the GitHub Stats URL with proper parameters
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}${hideBorder ? "&hide_border=true" : ""}${bgColor ? `&bg_color=${bgColor}` : ""}`

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#171321]/80 z-10">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-cyan-500 rounded-full animate-spin mb-2"></div>
            <p className="text-cyan-400 text-sm">Loading stats...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-[#171321] rounded-lg p-4 border border-red-500/30 text-center">
          <p className="text-red-400 mb-2">Failed to load GitHub stats</p>
          <p className="text-gray-400 text-sm">{error}</p>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-cyan-400 text-sm mt-2 hover:text-cyan-300"
          >
            View Profile <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      )}

      <img
        src={statsUrl || "/placeholder.svg"}
        alt={`${username}'s GitHub Stats`}
        className="w-full h-auto"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false)
          setError("Could not load GitHub stats. Please try again later.")
        }}
      />
    </div>
  )
}
