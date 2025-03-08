"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Building2, Check, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"

// Mock company data
const mockCompanies = [
  {
    id: "1",
    name: "EcoTech Solutions",
    description: "Leading provider of sustainable technology solutions",
    minScore: 60,
    pricePerCredit: 25,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Green Future Inc.",
    description: "Investing in a greener tomorrow",
    minScore: 70,
    pricePerCredit: 30,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Sustainable Ventures",
    description: "Building a sustainable world through innovation",
    minScore: 50,
    pricePerCredit: 22,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Carbon Neutral Co.",
    description: "Committed to carbon neutrality by 2030",
    minScore: 80,
    pricePerCredit: 35,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "EarthFirst Enterprises",
    description: "Putting the planet first in everything we do",
    minScore: 65,
    pricePerCredit: 28,
    logo: "/placeholder.svg?height=40&width=40",
  },
]

type Company = (typeof mockCompanies)[0]

export function CompanyList() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [companies, setCompanies] = useState<Company[]>([])
  const [interestedCompanies, setInterestedCompanies] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // In a real app, this would be an API call to fetch companies
        // For demo purposes, we'll use the mock data

        // Filter companies based on user's carbon score
        const filteredCompanies = mockCompanies.filter((company) => (user?.carbonScore || 0) >= company.minScore)

        // Sort by price per credit (highest first)
        filteredCompanies.sort((a, b) => b.pricePerCredit - a.pricePerCredit)

        setCompanies(filteredCompanies)
      } catch (error) {
        console.error("Failed to fetch companies:", error)
        toast({
          variant: "destructive",
          title: "Failed to load companies",
          description: "There was a problem loading the company data.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanies()
  }, [toast, user?.carbonScore])

  const handleExpressInterest = (companyId: string) => {
    // In a real app, this would be an API call to express interest
    setInterestedCompanies((prev) => [...prev, companyId])

    toast({
      title: "Interest expressed",
      description: "The company has been notified of your interest.",
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-muted-foreground">Loading companies...</p>
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-muted-foreground">No companies match your carbon score yet.</p>
        <p className="text-sm text-muted-foreground">Improve your land's carbon potential to attract more buyers.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <Card
          key={company.id}
          className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] border-t-4 border-t-primary"
        >
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{company.name}</CardTitle>
              <CardDescription className="line-clamp-1">{company.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Minimum Score:</span>
                <span className="font-medium">{company.minScore}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Maximum Score:</span>
                <span className="font-medium">150</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price per Credit:</span>
                <span className="font-medium">${company.pricePerCredit}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Potential Earnings:</span>
                <span className="font-medium">${(user?.carbonScore || 0) * company.pricePerCredit}</span>
              </div>

              <div className="mt-2 pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Your Score</span>
                  <span className="text-xs text-muted-foreground">Max Score</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${Math.min(((user?.carbonScore || 0) / 150) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs font-medium">{user?.carbonScore || 0}</span>
                  <span className="text-xs font-medium">150</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-2">
            {interestedCompanies.includes(company.id) ? (
              <Button className="w-full" variant="outline" disabled>
                <Check className="mr-2 h-4 w-4" />
                Interest Expressed
              </Button>
            ) : (
              <Button className="w-full" onClick={() => handleExpressInterest(company.id)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Express Interest
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

