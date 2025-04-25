import Image from "next/image"

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image src="/nomadfit-logo.jpeg" alt="NomadFit Logo" width={40} height={40} className="object-contain" />
    </div>
  )
}
