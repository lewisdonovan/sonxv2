"use client"

import { QuestProvider, LeaderBoard } from "@questlabs/react-sdk"
import { apikey, entityId, questId, token, userId } from "./config"
import "@questlabs/react-sdk/dist/style.css"
import "../../../../styles/quest.css"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"

export default function referrals() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Leaderboard"
        text="Manage leaderboard"
      />
      <QuestProvider
        apiKey={apikey}
        entityId={entityId}
        apiType='STAGING'
      >
        <LeaderBoard
          userId={userId}
          token={token}
        // styleConfig={{
        //   Form: { backgroundColor: "#000000" },
        //   MainHeading: { color: "#551717" },
        //   Heading: { color: "#35A52D" },
        // }}
        />
      </QuestProvider>
    </DashboardShell>
  )
}
