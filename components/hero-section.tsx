import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="container flex flex-1 flex-col items-center justify-center gap-6 py-8 md:py=12 lg:flex-row lg:gap-12 lg:py-24">
      <div className="flex flex-col items-center gap-4 lg:items-start lg:gap-6">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-left lg:text-6xl">
          Turn your land into <span className="text-primary">carbon credits</span>
        </h1>
        <p className="max-w-[42rem] text-center text-muted-foreground sm:text-xl lg:text-left">
          Connect with companies actively buying carbon credits based on your land's potential. Upload your photos, get
          verified, and start earning.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/auth/signin">
            <Button size="lg">Get Started</Button>
          </Link>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
      <div className="relative aspect-video w-full max-w-[600px] overflow-hidden rounded-lg shadow-xl">
        <Image
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
          alt="Sustainable land management"
          width={600}
          height={400}
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}

