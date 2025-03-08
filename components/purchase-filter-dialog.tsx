"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

// Mock company types for filtering
const companyTypes = ["Technology", "Energy", "Finance", "Manufacturing", "Retail", "Transportation", "Agriculture"]

interface PurchaseFilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: {
    minPrice: number
    maxPrice: number
    minCredits: number
    maxCredits: number
    companyTypes: string[]
  }
  onFiltersChange: (filters: {
    minPrice: number
    maxPrice: number
    minCredits: number
    maxCredits: number
    companyTypes: string[]
  }) => void
}

export function PurchaseFilterDialog({ open, onOpenChange, filters, onFiltersChange }: PurchaseFilterDialogProps) {
  // Local state for filters
  const [localFilters, setLocalFilters] = useState(filters)

  // Reset local filters when dialog opens
  useEffect(() => {
    if (open) {
      setLocalFilters(filters)
    }
  }, [open, filters])

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    onOpenChange(false)
  }

  const handleResetFilters = () => {
    const resetFilters = {
      minPrice: 0,
      maxPrice: 1000,
      minCredits: 0,
      maxCredits: 10000,
      companyTypes: [],
    }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
    onOpenChange(false)
  }

  const toggleCompanyType = (type: string) => {
    setLocalFilters((prev) => {
      if (prev.companyTypes.includes(type)) {
        return {
          ...prev,
          companyTypes: prev.companyTypes.filter((t) => t !== type),
        }
      } else {
        return {
          ...prev,
          companyTypes: [...prev.companyTypes, type],
        }
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Purchase Options</DialogTitle>
          <DialogDescription>Adjust the filters to find the perfect purchase options for your needs.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <Label>Price per Credit</Label>
                <span className="text-sm text-muted-foreground">
                  ${localFilters.minPrice} - ${localFilters.maxPrice}
                </span>
              </div>
              <div className="pt-4">
                <Slider
                  defaultValue={[localFilters.minPrice, localFilters.maxPrice]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    setLocalFilters((prev) => ({
                      ...prev,
                      minPrice: value[0],
                      maxPrice: value[1],
                    }))
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Credit Range</Label>
                <span className="text-sm text-muted-foreground">
                  {localFilters.minCredits} - {localFilters.maxCredits}
                </span>
              </div>
              <div className="pt-4">
                <Slider
                  defaultValue={[localFilters.minCredits, localFilters.maxCredits]}
                  min={0}
                  max={10000}
                  step={100}
                  onValueChange={(value) => {
                    setLocalFilters((prev) => ({
                      ...prev,
                      minCredits: value[0],
                      maxCredits: value[1],
                    }))
                  }}
                />
              </div>
            </div>

            <div>
              <Label>Company Types</Label>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {companyTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`company-type-${type}`}
                      checked={localFilters.companyTypes.includes(type)}
                      onCheckedChange={() => toggleCompanyType(type)}
                    />
                    <label
                      htmlFor={`company-type-${type}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filters
          </Button>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

