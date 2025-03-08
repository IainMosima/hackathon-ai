"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Building2, DollarSign, Leaf, CalendarDays, ArrowRight } from "lucide-react"
import type { SortOption } from "@/app/dashboard/marketplace/page"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"

// Types for purchase options
export interface PurchaseOption {
  id: string
  companyId: string
  companyName: string
  companyLogo: string
  companyType: string
  minCredits: number
  maxCredits: number
  pricePerCredit: number
  totalPotentialValue: number
  status: "open" | "pending" | "completed"
  datePosted: Date
  description: string
  percentageFilled: number
}

// Mock data for purchase options
const mockPurchaseOptions: PurchaseOption[] = [
  {
    id: "po1",
    companyId: "c1",
    companyName: "EcoTech Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    companyType: "Technology",
    minCredits: 100,
    maxCredits: 500,
    pricePerCredit: 35,
    totalPotentialValue: 17500,
    status: "open",
    datePosted: new Date(2023, 11, 15),
    description: "Looking to offset our data center emissions with high-quality carbon credits.",
    percentageFilled: 45,
  },
  {
    id: "po2",
    companyId: "c2",
    companyName: "Green Future Inc.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    companyType: "Energy",
    minCredits: 50,
    maxCredits: 200,
    pricePerCredit: 42,
    totalPotentialValue: 8400,
    status: "open",
    datePosted: new Date(2024, 0, 5),
    description: "Seeking carbon credits to meet our 2024 sustainability goals.",
    percentageFilled: 20,
  },
  {
    id: "po3",
    companyId: "c3",
    companyName: "Sustainable Ventures",
    companyLogo: "/placeholder.svg?height=40&width=40",
    companyType: "Finance",
    minCredits: 500,
    maxCredits: 2000,
    pricePerCredit: 30,
    totalPotentialValue: 60000,
    status: "open",
    datePosted: new Date(2024, 1, 10),
    description: "Building a portfolio of carbon credits for our sustainable investment fund.",
    percentageFilled: 65,
  },
  {
    id: "po4",
    companyId: "c4",
    companyName: "Carbon Neutral Co.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    companyType: "Manufacturing",
    minCredits: 200,
    maxCredits: 1000,
    pricePerCredit: 38,
    totalPotentialValue: 38000,
    status: "open",
    datePosted: new Date(2024, 0, 20),
    description: "Offsetting our manufacturing emissions with verified carbon credits.",
    percentageFilled: 30,
  },
  {
    id: "po5",
    companyId: "c5",
    companyName: "EarthFirst Enterprises",
    companyLogo: "/placeholder.svg?height=40&width=40",
    companyType: "Retail",
    minCredits: 150,
    maxCredits: 600,
    pricePerCredit: 32,
    totalPotentialValue: 19200,
    status: "open",
    datePosted: new Date(2023, 10, 5),
    description: "Seeking carbon credits to offset our retail operations and supply chain.",
    percentageFilled: 80,
  },
  {
    id: "po6",
    companyId: "c6",
    companyName: "Blue Ocean Fund",
    companyLogo: "/placeholder.svg?height=40&width=40",
    companyType: "Finance",
    minCredits: 1000,
    maxCredits: 5000,
    pricePerCredit: 28,
    totalPotentialValue: 140000,
    status: "open",
    datePosted: new Date(2024, 1, 1),
    description: "Building a diverse portfolio of carbon credits for our ESG investment strategy.",
    percentageFilled: 15,
  },
  {
    id: "po7",
    companyId: "c7",
    companyName: "Clean Air Industries",
    companyLogo: "/placeholder.svg?height=40&width=40",
    companyType: "Manufacturing",
    minCredits: 300,
    maxCredits: 1200,
    pricePerCredit: 33,
    totalPotentialValue: 39600,
    status: "open",
    datePosted: new Date(2023, 11, 10),
    description: "Seeking high-quality carbon credits to offset our manufacturing emissions.",
    percentageFilled: 50,
  },
  {
    id: "po8",
    companyId: "c8",
    companyName: "Renewable Energy Partners",
    companyLogo: "/placeholder.svg?height=40&width=40",
    companyType: "Energy",
    minCredits: 400,
    maxCredits: 1500,
    pricePerCredit: 40,
    totalPotentialValue: 60000,
    status: "open",
    datePosted: new Date(2024, 0, 15),
    description: "Looking for carbon credits to complement our renewable energy portfolio.",
    percentageFilled: 25,
  },
]

interface CreditPurchaseListProps {
  sortOption: SortOption
  filters: {
    minPrice: number
    maxPrice: number
    minCredits: number
    maxCredits: number
    companyTypes: string[]
  }
}

export function CreditPurchaseList({ sortOption, filters }: CreditPurchaseListProps) {
  const [purchaseOptions, setPurchaseOptions] = useState<PurchaseOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPurchaseOptions = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call to fetch purchase options
        // For demo purposes, we'll use the mock data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

        // Filter the options based on the filters
        const filteredOptions = mockPurchaseOptions.filter((option) => {
          const priceMatch = option.pricePerCredit >= filters.minPrice && option.pricePerCredit <= filters.maxPrice

          const creditsMatch = option.maxCredits >= filters.minCredits && option.minCredits <= filters.maxCredits

          const companyTypeMatch =
            filters.companyTypes.length === 0 || filters.companyTypes.includes(option.companyType)

          return priceMatch && creditsMatch && companyTypeMatch
        })

        // Sort the options based on the sort option
        switch (sortOption) {
          case "priceHighToLow":
            filteredOptions.sort((a, b) => b.pricePerCredit - a.pricePerCredit)
            break
          case "priceLowToHigh":
            filteredOptions.sort((a, b) => a.pricePerCredit - b.pricePerCredit)
            break
          case "creditsHighToLow":
            filteredOptions.sort((a, b) => b.maxCredits - a.maxCredits)
            break
          case "creditsLowToHigh":
            filteredOptions.sort((a, b) => a.maxCredits - b.maxCredits)
            break
          case "newest":
            filteredOptions.sort((a, b) => b.datePosted.getTime() - a.datePosted.getTime())
            break
          case "oldest":
            filteredOptions.sort((a, b) => a.datePosted.getTime() - b.datePosted.getTime())
            break
        }

        setPurchaseOptions(filteredOptions)
      } catch (error) {
        console.error("Failed to fetch purchase options:", error)
        toast({
          variant: "destructive",
          title: "Failed to load purchase options",
          description: "There was a problem loading the purchase options.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPurchaseOptions()
  }, [sortOption, filters, toast])

  const handleSellCredits = (purchaseOption: PurchaseOption) => {
    toast({
      title: "Interest submitted",
      description: `You've expressed interest in selling credits to ${purchaseOption.companyName}.`,
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading purchase options...</p>
      </div>
    )
  }

  if (purchaseOptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-muted-foreground">No purchase options match your filters.</p>
        <p className="text-sm text-muted-foreground">Try adjusting your filters to see more options.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {purchaseOptions.map((option) => (
        <Card key={option.id} className="flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">{option.companyName}</CardTitle>
                  <CardDescription>{option.companyType}</CardDescription>
                </div>
              </div>
              <Badge variant={option.percentageFilled > 75 ? "destructive" : "secondary"}>
                {option.percentageFilled}% Filled
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="mb-4 text-sm text-muted-foreground">{option.description}</p>

            <div className="mb-4">
              <Progress value={option.percentageFilled} className="h-2" />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <DollarSign className="mr-1 h-4 w-4" />
                  <span>Price per Credit</span>
                </div>
                <span className="font-medium">${option.pricePerCredit}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Leaf className="mr-1 h-4 w-4" />
                  <span>Credit Range</span>
                </div>
                <span className="font-medium">
                  {option.minCredits} - {option.maxCredits}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <DollarSign className="mr-1 h-4 w-4" />
                  <span>Potential Value</span>
                </div>
                <span className="font-medium">${option.totalPotentialValue.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-1 h-4 w-4" />
                  <span>Posted</span>
                </div>
                <span className="font-medium">{formatDistanceToNow(option.datePosted, { addSuffix: true })}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleSellCredits(option)}>
              Sell Credits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

