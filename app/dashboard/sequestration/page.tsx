"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CarbonSequestrationPlan } from "@/components/carbon-sequestration-plan"

export default function SequestrationPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Carbon Sequestration Plan"
        text="Estimate carbon storage potential for your land before project implementation."
      />
      <div className="mt-6">
        <CarbonSequestrationPlan />
      </div>
    </DashboardShell>
  )
}

