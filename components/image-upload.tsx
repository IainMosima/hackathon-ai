"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

interface ImageUploadProps {
  id: string
  value: File | null
  onChange: (file: File | null) => void
  maxSize?: number // in bytes
  accept?: string
}

export function ImageUpload({
  id,
  value,
  onChange,
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = "image/*",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setPreview(null)
      onChange(null)
      return
    }

    // Validate file size
    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: `Maximum file size is ${Math.round(maxSize / 1024 / 1024)}MB`,
      })
      return
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file",
      })
      return
    }

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    onChange(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileChange(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0] || null
    handleFileChange(file)
  }

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <input id={id} type="file" ref={fileInputRef} onChange={handleInputChange} accept={accept} className="sr-only" />

      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center
            hover:bg-muted/50 cursor-pointer transition-colors
            ${isDragging ? "border-primary bg-muted/50" : "border-muted-foreground/25"}
          `}
        >
          <div className="flex flex-col items-center gap-1">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag and drop or click to upload</p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or WEBP (max. {Math.round(maxSize / 1024 / 1024)}MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

