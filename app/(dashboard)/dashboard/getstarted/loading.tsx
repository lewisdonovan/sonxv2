import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardGetStartedLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Get started"
        text="Manage get started"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}