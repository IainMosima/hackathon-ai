"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useState } from "react"
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

  const getSignedUrl = async (file: File, userId: string) => {
    try {
      const response = await fetch("/api/get-signed-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          userId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get signed URL")
      }

      return await response.json()
    } catch (error) {
      console.error("Error getting signed URL:", error)
      throw error
    }
  }

  const uploadToS3 = async (file: File, signedUrl: string) => {
    try {
      const response = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
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

    setIsSubmitting(true)

    try {
      // Get signed URLs for both photos
      const groundPhotoData = await getSignedUrl(groundPhoto, user?.id || "")
      const satellitePhotoData = await getSignedUrl(satellitePhoto, user?.id || "")

      // Upload photos to S3 using signed URLs
      await Promise.all([
        uploadToS3(groundPhoto, groundPhotoData.signedUrl),
        uploadToS3(satellitePhoto, satellitePhotoData.signedUrl),
      ])

      // In a real app, you would save the S3 keys to your database
      const groundPhotoKey = groundPhotoData.key
      const satellitePhotoKey = satellitePhotoData.key

      // Update user in local storage
      if (user) {
        const updatedUser = {
          ...user,
          onboardingComplete: true,
          verificationStatus: "pending",
          groundPhotoKey,
          satellitePhotoKey,
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

