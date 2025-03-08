"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Building2, Settings, Leaf } from "lucide-react"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Link href="/dashboard">
              <span className="text-primary">Carbon</span>
              <span>Credits</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">{user && <UserNav user={user} />}</div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6">
            <nav className="flex flex-col space-y-2">
              <Link href="/dashboard">
                <Button variant={pathname === "/dashboard" ? "default" : "ghost"} className="w-full justify-start">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/companies">
                <Button
                  variant={pathname === "/dashboard/companies" ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Markets
                </Button>
              </Link>
              <Link href="/dashboard/sequestration">
                <Button
                  variant={pathname === "/dashboard/sequestration" ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <Leaf className="mr-2 h-4 w-4" />
                  Sequestration
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button
                  variant={pathname === "/dashboard/settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}

