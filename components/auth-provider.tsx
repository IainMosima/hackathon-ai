"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  image?: string
  onboardingComplete: boolean
  verificationStatus: "pending" | "verified" | "rejected" | null
  carbonScore?: number
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (provider: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Simulate fetching the user on initial load
  useEffect(() => {
    const checkUser = async () => {
      try {
        // In a real app, this would be an API call to get the session
        const storedUser = localStorage.getItem("carbon-credits-user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  // Redirect based on auth state and route
  useEffect(() => {
    if (!isLoading) {
      const publicRoutes = ["/", "/auth/signin"]
      const isPublicRoute = publicRoutes.includes(pathname)

      // TODO: Implement here
      // if (!user && !isPublicRoute) {
      //   router.push("/auth/signin")
      // } else if (user && !user.onboardingComplete && pathname !== "/onboarding") {
      //   router.push("/onboarding")
      // } else if (
      //   user &&
      //   user.onboardingComplete &&
      //   user.verificationStatus === "pending" &&
      //   pathname !== "/verification-pending"
      // ) {
      //   router.push("/verification-pending")
      // }
    }
  }, [user, isLoading, pathname, router])

  // Mock sign in function
  const signIn = async (provider: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would redirect to the OAuth provider
      // For demo purposes, we'll simulate a successful sign in
      const mockUser: User = {
        id: "user_123",
        name: "Demo User",
        email: "user@example.com",
        image: "/placeholder.svg?height=40&width=40",
        onboardingComplete: false,
        verificationStatus: null,
      }

      setUser(mockUser)
      localStorage.setItem("carbon-credits-user", JSON.stringify(mockUser))

      toast({
        title: "Signed in successfully",
        description: "Welcome to Carbon Credits Platform!",
      })

      router.push("/onboarding")
    } catch (error) {
      console.error("Failed to sign in:", error)
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: "There was a problem signing you in.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Mock sign out function
  const signOut = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to sign out
      setUser(null)
      localStorage.removeItem("carbon-credits-user")

      toast({
        title: "Signed out successfully",
      })

      router.push("/")
    } catch (error) {
      console.error("Failed to sign out:", error)
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "There was a problem signing you out.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

