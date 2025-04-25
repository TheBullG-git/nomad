"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import { useEffect, useState } from "react"

export function SoundToggle() {
  const { muted, toggleMute, playSound } = useSoundEffects()
  const [mounted, setMounted] = useState(false)

  // Only show the component after it's mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="sm"
      className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm rounded-full h-10 w-10 p-0"
      onClick={() => {
        toggleMute()
        if (muted) {
          playSound("click")
        }
      }}
      title={muted ? "Enable sounds" : "Disable sounds"}
      aria-label={muted ? "Enable sounds" : "Disable sounds"}
    >
      {muted ? <VolumeX className="h-5 w-5 text-muted-foreground" /> : <Volume2 className="h-5 w-5 text-primary" />}
    </Button>
  )
}
