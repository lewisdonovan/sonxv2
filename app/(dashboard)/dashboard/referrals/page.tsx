"use client"

import { QuestProvider, Referral } from "@questlabs/react-sdk"
import { apikey, entityId, questId, token, userId } from "./config"
import "@questlabs/react-sdk/dist/style.css"
import "../../../../styles/quest.css"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"

export default function referrals() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Referrals"
        text="Manage referrals"
      />
      <QuestProvider
        apiKey={apikey}
        entityId={entityId}
        apiType='STAGING'
      >
        <Referral
          questId={questId}
          token={token}
          userId={userId}
          styleConfig={{ Form: { background: "white" } }}
          referralLink='https://sonx.com/'
          showReferralCode={false}
          // To run below props run on the local react app
          onClose={() => setOpen(false)}
        />
      </QuestProvider>
    </DashboardShell>
  )
}
