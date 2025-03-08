"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "@/components/image-upload"
import { Loader2, MapPin, Upload, RefreshCw, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SequestrationResults } from "@/components/sequestration-results"

type AnalysisStatus = "idle" | "loading" | "success" | "error"

export function CarbonSequestrationPlan() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [location, setLocation] = useState("")
  const [status, setStatus] = useState<AnalysisStatus>("idle")
  const [results, setResults] = useState<any | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const { toast } = useToast()

  const handleCalculate = async () => {
    // Validate inputs
    if (!imageFile && !location) {
      setStatus("error")
      setErrorMessage("Please upload an image or enter a location to analyze.")
      return
    }

    setStatus("loading")

    try {
      // Simulate API call to analyze the image or location
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock results
      const mockResults = {
        carbonStorage: Math.floor(Math.random() * 50) + 10, // 10-60 tons per hectare/year
        factors: [
          {
            name: "Soil Quality",
            value: Math.floor(Math.random() * 100),
            impact: "high",
          },
          {
            name: "Climate Conditions",
            value: Math.floor(Math.random() * 100),
            impact: "medium",
          },
          {
            name: "Vegetation Type",
            value: Math.floor(Math.random() * 100),
            impact: "high",
          },
          {
            name: "Topography",
            value: Math.floor(Math.random() * 100),
            impact: "low",
          },
        ],
        recommendations: [
          "Plant native tree species to maximize carbon sequestration",
          "Implement no-till farming practices to preserve soil carbon",
          "Consider agroforestry to combine agriculture with carbon storage",
          "Restore any degraded areas with appropriate vegetation",
        ],
      }

      setResults(mockResults)
      setStatus("success")

      toast({
        title: "Analysis complete",
        description: "Your carbon sequestration potential has been calculated.",
      })
    } catch (error) {
      console.error("Analysis failed:", error)
      setStatus("error")
      setErrorMessage("Failed to analyze your input. Please try again.")

      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was a problem analyzing your input.",
      })
    }
  }

  const handleReset = () => {
    setImageFile(null)
    setLocation("")
    setStatus("idle")
    setResults(null)
    setErrorMessage("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Carbon Sequestration Plan</CardTitle>
          <CardDescription>
            Estimate the carbon storage potential for your land before implementing your project. Our AI analyzes your
            land's characteristics to provide accurate predictions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="image" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="image">Upload Image</TabsTrigger>
              <TabsTrigger value="location">Project Info</TabsTrigger>
            </TabsList>

            <TabsContent value="image" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Upload Satellite or Drone Image (JPG/PNG)</h3>
                <p className="text-sm text-muted-foreground">Upload a clear image of your project area.</p>
                <ImageUpload
                  id="project-image"
                  value={imageFile}
                  onChange={setImageFile}
                  maxSize={150 * 1024 * 1024} // 150MB
                  accept="image/jpeg,image/png"
                />
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Enter Project Details</h3>
                <p className="text-sm text-muted-foreground">
                  Include location, crops, acreage, and other relevant information.
                </p>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Example: Central Park, New York, 5 acres, mixed forest"
                      className="pl-8"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {status === "error" && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {status === "loading" && (
            <div className="mt-6 flex flex-col items-center justify-center space-y-4 py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-center text-sm text-muted-foreground">
                Analyzing land type, climate, and soil data...
              </p>
            </div>
          )}

          {status === "success" && results && (
            <div className="mt-6">
              <SequestrationResults results={results} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {status === "idle" || status === "error" ? (
            <Button onClick={handleCalculate} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Calculate Potential
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

