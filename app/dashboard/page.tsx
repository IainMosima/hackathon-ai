"use client"

import { useAuth } from "@/components/auth-provider"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BarChart3, Leaf } from "lucide-react"
import Link from "next/link"
import { CompanyList } from "@/components/company-list"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="View your carbon credit score and potential buyers." />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Score</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.carbonScore || 0}</div>
                <p className="text-xs text-muted-foreground">Your land's carbon credit score</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Potential Earnings</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,500 - $5,000</div>
                <p className="text-xs text-muted-foreground">Estimated annual earnings based on your score</p>
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Your Carbon Journey</CardTitle>
              <CardDescription>Track your verification progress and next steps</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <div className="font-medium">Account Created</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <div className="font-medium">Photos Uploaded</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <div className="font-medium">Verification Complete</div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-muted-foreground/30 bg-background">
                      <span className="text-xs font-bold">4</span>
                    </div>
                    <div className="font-medium text-muted-foreground">Connect with Markets</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-muted-foreground/30 bg-background">
                      <span className="text-xs font-bold">5</span>
                    </div>
                    <div className="font-medium text-muted-foreground">Finalize Agreements</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-muted-foreground/30 bg-background">
                      <span className="text-xs font-bold">6</span>
                    </div>
                    <div className="font-medium text-muted-foreground">Start Earning</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Link href="/dashboard/companies">
              <Button>
                Connect with Markets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <CompanyList />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

