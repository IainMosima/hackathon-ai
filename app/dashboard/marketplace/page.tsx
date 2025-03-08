"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CreditPurchaseList } from "@/components/credit-purchase-list"
import { Button } from "@/components/ui/button"
import { PurchaseFilterDialog } from "@/components/purchase-filter-dialog"
import { ArrowDownAZ, SlidersHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type SortOption =
  | "priceHighToLow"
  | "priceLowToHigh"
  | "creditsHighToLow"
  | "creditsLowToHigh"
  | "newest"
  | "oldest"

export default function MarketplacePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortOption, setSortOption] = useState<SortOption>("priceHighToLow")
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    minCredits: 0,
    maxCredits: 10000,
    companyTypes: [] as string[],
  })

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case "priceHighToLow":
        return "Price (High to Low)"
      case "priceLowToHigh":
        return "Price (Low to High)"
      case "creditsHighToLow":
        return "Credits (High to Low)"
      case "creditsLowToHigh":
        return "Credits (Low to High)"
      case "newest":
        return "Newest First"
      case "oldest":
        return "Oldest First"
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Credit Marketplace" text="Browse and purchase carbon credits from companies.">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowDownAZ className="h-4 w-4" />
                <span>Sort: {getSortLabel(sortOption)}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOption("priceHighToLow")}>Price (High to Low)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("priceLowToHigh")}>Price (Low to High)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("creditsHighToLow")}>
                Credits (High to Low)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("creditsLowToHigh")}>
                Credits (Low to High)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("newest")}>Newest First</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("oldest")}>Oldest First</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </DashboardHeader>

      <div className="mt-6">
        <CreditPurchaseList sortOption={sortOption} filters={filters} />
      </div>

      <PurchaseFilterDialog
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </DashboardShell>
  )
}

