import { OnboardingForm } from "@/components/onboarding-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OnboardingPage() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-10">
      <Card className="mx-auto max-w-[800px] w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Complete your profile</CardTitle>
          <CardDescription>Upload your land photos to get started with carbon credits</CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm />
        </CardContent>
      </Card>
    </div>
  )
}

