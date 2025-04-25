"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type SoundType =
  | "click"
  | "success"
  | "error"
  | "navigation"
  | "selection"
  | "submit"
  | "celebration"
  | "booking-confirmed"

export function useSoundEffects() {
  const [muted, setMuted] = useState(false)
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    click: null,
    success: null,
    error: null,
    navigation: null,
    selection: null,
    submit: null,
    celebration: null,
    "booking-confirmed": null,
  })

  // Initialize audio elements
  useEffect(() => {
    // Create audio elements for each sound type
    const sounds: SoundType[] = [
      "click",
      "success",
      "error",
      "navigation",
      "selection",
      "submit",
      "celebration",
      "booking-confirmed",
    ]

    sounds.forEach((sound) => {
      const audio = new Audio(`/sounds/${sound}.mp3`)
      audio.preload = "auto"
      audioRefs.current[sound] = audio
    })

    // Check if user has previously set mute preference
    const muteSetting = localStorage.getItem("sound-muted")
    if (muteSetting === "true") {
      setMuted(true)
    }

    return () => {
      // Cleanup audio elements
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause()
          audio.src = ""
        }
      })
    }
  }, [])

  const playSound = useCallback(
    (type: SoundType) => {
      if (muted) return

      try {
        // Create a new audio instance each time to allow overlapping sounds
        const audio = new Audio(`/sounds/${type}.mp3`)
        audio.volume = 0.5 // Set volume to 50%

        const playPromise = audio.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error playing sound:", error)
          })
        }
      } catch (error) {
        console.error("Failed to play sound:", error)
      }
    },
    [muted],
  )

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const newMuted = !prev
      localStorage.setItem("sound-muted", String(newMuted))
      return newMuted
    })
  }, [])

  return { playSound, muted, toggleMute }
}
