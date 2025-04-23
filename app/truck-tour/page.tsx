"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Html, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Headphones, Heart, Play, Pause, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"

function Model({ setCurrentSection, currentSection }) {
  // Using a simple mesh instead of loading a model to avoid compatibility issues
  const group = useRef()

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={group} position={[0, 0, 0]} scale={2}>
      {/* Simple box as placeholder */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* These would be positioned correctly on the actual truck model */}
      <Html position={[1, 1, 0]} distanceFactor={10}>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
            currentSection === "weights" ? "bg-purple-600" : "bg-white"
          }`}
          onClick={() => setCurrentSection("weights")}
        >
          <Dumbbell className={`h-3 w-3 ${currentSection === "weights" ? "text-white" : "text-purple-600"}`} />
        </div>
      </Html>

      <Html position={[-1, 1, 0]} distanceFactor={10}>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
            currentSection === "cardio" ? "bg-purple-600" : "bg-white"
          }`}
          onClick={() => setCurrentSection("cardio")}
        >
          <Heart className={`h-3 w-3 ${currentSection === "cardio" ? "text-white" : "text-purple-600"}`} />
        </div>
      </Html>

      <Html position={[0, 1, 1]} distanceFactor={10}>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
            currentSection === "recovery" ? "bg-purple-600" : "bg-white"
          }`}
          onClick={() => setCurrentSection("recovery")}
        >
          <Headphones className={`h-3 w-3 ${currentSection === "recovery" ? "text-white" : "text-purple-600"}`} />
        </div>
      </Html>
    </group>
  )
}

function TruckScene({ setCurrentSection, currentSection }) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <Model setCurrentSection={setCurrentSection} currentSection={currentSection} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={8}
      />
    </Canvas>
  )
}

const sections = {
  weights: {
    title: "Weights Area",
    description:
      "Our weights area features premium free weights, kettlebells, and resistance bands for strength training.",
    details: [
      "Adjustable dumbbells (5-50 lbs)",
      "Olympic barbell and weight plates",
      "Kettlebells and medicine balls",
      "TRX suspension system",
      "Resistance bands of varying strengths",
    ],
  },
  cardio: {
    title: "Cardio Zone",
    description: "Get your heart rate up with our compact but effective cardio equipment.",
    details: [
      "Foldable treadmill",
      "Stationary bike",
      "Rowing machine",
      "Jump ropes and agility ladders",
      "Step platforms for aerobic exercises",
    ],
  },
  recovery: {
    title: "Recovery Corner",
    description: "Enhance your post-workout recovery with our specialized equipment.",
    details: [
      "Foam rollers and massage tools",
      "Stretching area with yoga mats",
      "Compression therapy devices",
      "Ice/heat packs for immediate treatment",
      "Relaxation space with guided recovery sessions",
    ],
  },
}

export default function TruckTourPage() {
  const [currentSection, setCurrentSection] = useState("weights")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.log("Audio play error:", e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Interactive Truck Tour</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our state-of-the-art mobile gym truck. Click on the hotspots to learn more about each section.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-muted rounded-lg overflow-hidden h-[500px] relative">
            <TruckScene setCurrentSection={setCurrentSection} currentSection={currentSection} />

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
                  onClick={handleAudioToggle}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
                  onClick={handleMuteToggle}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm">
                <p>Click and drag to rotate | Scroll to zoom</p>
              </div>
            </div>

            <audio ref={audioRef} loop className="hidden">
              <source src="/placeholder.mp3" type="audio/mpeg" />
            </audio>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{sections[currentSection].title}</CardTitle>
                <CardDescription>{sections[currentSection].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">Features:</h3>
                <ul className="space-y-2">
                  {sections[currentSection].details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="weights" value={currentSection} onValueChange={setCurrentSection}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weights">Weights Area</TabsTrigger>
              <TabsTrigger value="cardio">Cardio Zone</TabsTrigger>
              <TabsTrigger value="recovery">Recovery Corner</TabsTrigger>
            </TabsList>
            <TabsContent value="weights" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Strength Training Equipment</h3>
                  <p className="text-muted-foreground mb-4">
                    Our weights area is designed to provide a comprehensive strength training experience in a compact
                    space. With adjustable equipment and versatile options, you can perform virtually any strength
                    exercise.
                  </p>
                  <p className="text-muted-foreground">
                    Our certified trainers will guide you through proper form and technique to maximize your results and
                    prevent injury.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/modern-gym-floor.png"
                    alt="Weights Area"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="cardio" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Cardio Equipment</h3>
                  <p className="text-muted-foreground mb-4">
                    Our cardio zone features space-efficient equipment that delivers effective cardiovascular workouts.
                    From high-intensity interval training to steady-state cardio, we have options for all fitness
                    levels.
                  </p>
                  <p className="text-muted-foreground">
                    The cardio zone is equipped with a smart display that tracks your metrics and can sync with your
                    fitness apps for seamless progress tracking.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/modern-gym-cardio.png"
                    alt="Cardio Zone"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recovery" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Recovery Tools</h3>
                  <p className="text-muted-foreground mb-4">
                    Recovery is a crucial part of any fitness regimen. Our recovery corner is equipped with tools to
                    help you recover faster, reduce soreness, and prevent injuries.
                  </p>
                  <p className="text-muted-foreground">
                    Our trainers are knowledgeable in recovery techniques and can guide you through proper use of all
                    recovery equipment for maximum benefit.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/gym-recovery-zone.png"
                    alt="Recovery Corner"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
