import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardOnboardingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Onboarding Quiz"
        text="Manage onboarding quiz"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}