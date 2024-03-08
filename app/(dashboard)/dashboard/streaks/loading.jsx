import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardTaskListLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Streaks"
        text="Manage streaks"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}