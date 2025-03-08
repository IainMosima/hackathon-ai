import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CompanyList } from "@/components/company-list"

export default function CompaniesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Markets" text="Browse companies interested in purchasing your carbon credits." />

      <div className="mt-6">
        <CompanyList />
      </div>
    </DashboardShell>
  )
}

