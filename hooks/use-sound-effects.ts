"use client"

import { useState, useEffect, useCallback, useRef } from "react"

type SoundType =
  | "click"
  | "success"
  | "error"
  | "navigation"
  | "selection"
  | "submit"
  | "celebration"
  | "booking-confirmed"

const soundFiles = {
  click: "/sounds/click.mp3",
  success: "/sounds/success.mp3",
  error: "/sounds/error.mp3",
  navigation: "/sounds/navigation.mp3",
  selection: "/sounds/selection.mp3",
  submit: "/sounds/submit.mp3",
  celebration: "/sounds/celebration.mp3",
  "booking-confirmed": "/sounds/booking-confirmed.mp3",
}

export function useSoundEffects() {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("nomadfit-sounds-muted")
      return savedMute === "true"
    }
    return false
  })

  // Use refs to store audio elements to prevent re-creation on each render
  const soundsRef = useRef<Record<SoundType, HTMLAudioElement | null>>({
    click: null,
    success: null,
    error: null,
    navigation: null,
    selection: null,
    submit: null,
    celebration: null,
    "booking-confirmed": null,
  })

  // Flag to track if sounds are loaded
  const [soundsLoaded, setSoundsLoaded] = useState(false)

  useEffect(() => {
    // Only load sounds on client side
    if (typeof window === "undefined") return

    // Create audio elements
    const audioElements: Record<SoundType, HTMLAudioElement> = {
      click: new Audio(soundFiles.click),
      success: new Audio(soundFiles.success),
      error: new Audio(soundFiles.error),
      navigation: new Audio(soundFiles.navigation),
      selection: new Audio(soundFiles.selection),
      submit: new Audio(soundFiles.submit),
      celebration: new Audio(soundFiles.celebration),
      "booking-confirmed": new Audio(soundFiles["booking-confirmed"]),
    }

    // Set volume for all sounds
    Object.values(audioElements).forEach((audio) => {
      audio.volume = 0.3 // Set to a subtle volume level
      audio.preload = "auto"
    })

    // Store audio elements in ref
    soundsRef.current = audioElements

    // Mark sounds as loaded
    setSoundsLoaded(true)

    // Cleanup
    return () => {
      Object.values(audioElements).forEach((audio) => {
        audio.pause()
        audio.src = ""
      })
    }
  }, [])

  // Save mute preference to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nomadfit-sounds-muted", muted.toString())
    }
  }, [muted])

  const playSound = useCallback(
    (type: SoundType) => {
      if (muted || !soundsLoaded) return

      // Get the sound from ref
      const sound = soundsRef.current[type]

      if (sound) {
        // Create a new instance for each play to allow overlapping sounds
        const soundInstance = new Audio(sound.src)
        soundInstance.volume = sound.volume

        // Play the sound
        soundInstance.play().catch((err) => {
          // Handle autoplay restrictions gracefully
          console.log("Sound playback prevented:", err)
        })
      }
    },
    [muted, soundsLoaded],
  )

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev)
  }, [])

  return { playSound, muted, toggleMute }
}
