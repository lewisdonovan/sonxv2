import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardTaskListLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Task List"
        text="Manage task list"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}