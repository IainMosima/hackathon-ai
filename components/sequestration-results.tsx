"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Info } from "lucide-react"
import {
  Chart,
  ChartContainer,
  ChartBar,
  ChartGroup,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipTrigger,
} from "@/components/ui/chart"

interface Factor {
  name: string
  value: number
  impact: "low" | "medium" | "high"
}

interface SequestrationResultsProps {
  results: {
    carbonStorage: number
    factors: Factor[]
    recommendations: string[]
  }
}

export function SequestrationResults({ results }: SequestrationResultsProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-primary"
      case "medium":
        return "bg-amber-500"
      case "low":
        return "bg-sky-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Carbon Sequestration Potential Prediction Results</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Estimated Carbon Storage Potential</CardTitle>
            <CardDescription>Based on your land's characteristics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-primary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-primary" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold">{results.carbonStorage}</span>
                  <span className="text-sm text-muted-foreground">tons/hectare/year</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Primary Factors in This Prediction</CardTitle>
            <CardDescription>Key elements affecting carbon sequestration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Chart
                type="bar"
                data={results.factors.map((factor) => ({
                  name: factor.name,
                  value: factor.value,
                  impact: factor.impact,
                }))}
                className="h-[200px]"
              >
                <ChartContainer>
                  <ChartGroup>
                    {results.factors.map((factor, index) => (
                      <ChartTooltip key={index}>
                        <ChartTooltipTrigger>
                          <ChartBar name={factor.name} value={factor.value} className={getImpactColor(factor.impact)} />
                        </ChartTooltipTrigger>
                        <ChartTooltipContent>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{factor.name}</p>
                            <p className="text-xs text-muted-foreground">Value: {factor.value}</p>
                            <p className="text-xs capitalize">
                              Impact: <span className="font-medium">{factor.impact}</span>
                            </p>
                          </div>
                        </ChartTooltipContent>
                      </ChartTooltip>
                    ))}
                  </ChartGroup>
                </ChartContainer>
              </Chart>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recommendations</CardTitle>
          <CardDescription>Suggested actions to maximize carbon sequestration</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {results.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

