"use client"

import { QuestProvider, TutorialScreen } from "@questlabs/react-sdk"

import { apikey, entityId, questId, token, userId } from "./config"
import "@questlabs/react-sdk/dist/style.css"
import "../../styles/quest.css"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function taskList() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Task list" text="Manage task list" />
      <QuestProvider
        apiSecret=""
        apiKey={apikey}
        entityId={entityId}
        apiType="STAGING"
        themeConfig={{
          backgroundColor: "",
          borderColor: "",
          buttonColor: "",
          primaryColor: "",
          secondaryColor: "",
          fontFamily: "",
        }}
      >
        <TutorialScreen
          heading="Task list"
          subheading="complete part "
          userId={userId}
          token={token}
          questId={questId}
          // styleConfig= {{Heading:{},"Description":{},"Form":{}}}
        />
      </QuestProvider>
    </DashboardShell>
  )
}
