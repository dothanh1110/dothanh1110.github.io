import CosmicBackground from "@/components/cosmic-background"
import ProfileCard from "@/components/profile-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      <CosmicBackground />
      <div className="container mx-auto px-4 py-8 relative z-10 flex items-center justify-center min-h-screen">
        <ProfileCard />
      </div>
    </main>
  )
}
