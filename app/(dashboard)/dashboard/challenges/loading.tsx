import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardReferralsLoading() {
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Challenges & Missions"
                text="Manage challenges & missions"
            />
            <div className="grid gap-10">
                <CardSkeleton />
            </div>
        </DashboardShell>
    )
}