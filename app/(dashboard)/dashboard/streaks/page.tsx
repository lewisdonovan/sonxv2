"use client"

import { DailyStreak, QuestProvider } from "@questlabs/react-sdk"

import "@questlabs/react-sdk/dist/style.css"
import "../../styles/quest.css"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { apikey, entityId, questId, token, userId } from "./config"

export default function streaks() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Streaks" text="Manage streaks" />
      <QuestProvider
        apiKey={apikey}
        entityId={entityId}
        themeConfig={{
          backgroundColor: "",
          borderColor: "",
          buttonColor: "",
          primaryColor: "",
          secondaryColor: "",
          fontFamily: "",
        }}
      >
        <DailyStreak
          userId={userId}
          token={token}
          metric="undefined"
          pendingStreakImg=""
          filledStreakImg=""
          styleConfig={{ Heading: {}, Description: {}, Input: {} }}
          stepDetails={[
            {
              description: "This is the longest streak you’ve ever head1",
              title: "Confident reader",
              range: 3,
            },
            {
              description: "This is the longest streak you’ve ever head2",
              title: "Responsible reader",
              range: 2,
            },
            {
              description: "This is the longest streak you’ve ever head3",
              title: "Serious learner",
              range: 5,
            },
            {
              description: "This is the longest streak you’ve ever head4",
              title: "Absolute reader",
              range: 3,
            },
          ]}
        />
      </QuestProvider>
    </DashboardShell>
  )
}
