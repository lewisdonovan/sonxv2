"use client"

import { QuestProvider, Challenges } from "@questlabs/react-sdk"
import { apikey, entityId, questId, token, userId } from "./config"
import "@questlabs/react-sdk/dist/style.css"
import "../../../../styles/quest.css"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"

export default function referrals() {
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Challenges & Missions"
                text="Manage challenges & missions"
            />
            <QuestProvider
                apiKey={apikey}
                entityId={entityId}
                apiType='STAGING'
            >
                <Challenges
                    questId={questId}
                    token={token}
                    userId={userId}
                // styleConfig={{
                //   Form: { backgroundColor: "#000000" },
                //   MainHeading: { color: "#551717" },
                //   Heading: { color: "#35A52D" },
                //   PointsColor: { color: "#D7429E" },
                //   InnerBackground: { background: "#5DCAD4" },
                //   ProgressBarColor: { background: "#30D410" },
                // }}
                />
            </QuestProvider>
        </DashboardShell>
    )
}
