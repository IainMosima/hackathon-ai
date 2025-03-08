"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function OnboardingForm() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [groundPhoto, setGroundPhoto] = useState<File | null>(null)
  const [satellitePhoto, setSatellitePhoto] = useState<File | null>(null)
  const [signedUrls, setSignedUrls] = useState<any>(null)

  useEffect(() => {
    // Get user data from localStorage if not available in context
    const storedUser = localStorage.getItem("carbon-credits-user")
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.upload_urls) {
        setSignedUrls(parsedUser.upload_urls)
      }
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!groundPhoto || !satellitePhoto) {
      toast({
        variant: "destructive",
        title: "Missing photos",
        description: "Please upload both ground and satellite photos.",
      })
      return
    }

    if (!signedUrls) {
      toast({
        variant: "destructive",
        title: "Missing signed URLs",
        description: "Unable to upload photos. Please try signing in again.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Upload photos to S3 using signed URLs from registration
      await Promise.all([
        uploadToS3(groundPhoto, signedUrls.ground_photo_signed),
        uploadToS3(satellitePhoto, signedUrls.aerial_photo_signed),
      ])

      // Update user verification status
      const storedUser = localStorage.getItem("carbon-credits-user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        const updatedUser = {
          ...parsedUser,
          verification_status: "Pending",
          ground_photo_url: signedUrls.ground_photo_url,
          aerial_photo_url: signedUrls.aerial_photo_url,
        }
        
        localStorage.setItem("carbon-credits-user", JSON.stringify(updatedUser))
      }

      toast({
        title: "Photos uploaded successfully",
        description: "Your profile is now pending verification.",
      })

      router.push("/verification-pending")
    } catch (error) {
      console.error("Failed to upload photos:", error)
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was a problem uploading your photos.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const uploadToS3 = async (file: File, signedUrl: string) => {
    try {
      const response = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
          "x-amz-acl": "public-read",
        },
        body: file,
      })

      if (!response.ok) {
        throw new Error("Failed to upload to S3")
      }

      return true
    } catch (error) {
      console.error("Error uploading to S3:", error)
      throw error
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="ground-photo">Ground Photo</Label>
          <p className="text-sm text-muted-foreground mb-2">Upload a clear photo of your land from ground level</p>
          <ImageUpload
            id="ground-photo"
            value={groundPhoto}
            onChange={setGroundPhoto}
            maxSize={150 * 1024 * 1024} // 150MB
            accept="image/jpeg,image/png,image/webp"
          />
        </div>

        <Separator className="my-4" />

        <div>
          <Label htmlFor="satellite-photo">Satellite Photo</Label>
          <p className="text-sm text-muted-foreground mb-2">Upload a satellite or aerial view of your land</p>
          <ImageUpload
            id="satellite-photo"
            value={satellitePhoto}
            onChange={setSatellitePhoto}
            maxSize={150 * 1024 * 1024} // 150MB
            accept="image/jpeg,image/png,image/webp"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Submit for Verification
          </>
        )}
      </Button>
    </form>
  )
}

