"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function VerificationPendingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isChecking, setIsChecking] = useState(false)
  const [pollCount, setPollCount] = useState(0)

  // Simulate polling for verification status
  useEffect(() => {
    const checkVerificationStatus = async () => {
      // In a real app, this would be an API call to check verification status
      // For demo purposes, we'll simulate a verification after a few polls

      if (pollCount >= 3) {
        // After 3 polls, simulate verification completion
        if (user) {
          const updatedUser = {
            ...user,
            verificationStatus: "verified",
            carbonScore: Math.floor(Math.random() * 100) + 50, // Random score between 50-150
          }

          localStorage.setItem("carbon-credits-user", JSON.stringify(updatedUser))

          toast({
            title: "Verification complete!",
            description: "Your account has been verified. Redirecting to dashboard...",
          })

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        }
      }
    }

    const interval = setInterval(() => {
      checkVerificationStatus()
      setPollCount((prev) => prev + 1)
    }, 10000) // Poll every 10 seconds

    return () => clearInterval(interval)
  }, [pollCount, router, toast, user])

  const handleManualCheck = async () => {
    setIsChecking(true)

    try {
      // In a real app, this would be an API call to check verification status
      // For demo purposes, we'll simulate a verification after a manual check

      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (user) {
        const updatedUser = {
          ...user,
          verificationStatus: "verified",
          carbonScore: Math.floor(Math.random() * 100) + 50, // Random score between 50-150
        }

        localStorage.setItem("carbon-credits-user", JSON.stringify(updatedUser))

        toast({
          title: "Verification complete!",
          description: "Your account has been verified. Redirecting to dashboard...",
        })

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      }
    } catch (error) {
      console.error("Failed to check verification status:", error)
      toast({
        variant: "destructive",
        title: "Check failed",
        description: "There was a problem checking your verification status.",
      })
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center">
      <Card className="mx-auto max-w-[500px] w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verification Pending</CardTitle>
          <CardDescription>We're processing your photos and verifying your land's carbon potential</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              This process typically takes 1-2 business days. We'll notify you once verification is complete.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline" onClick={handleManualCheck} disabled={isChecking}>
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Check Status
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

