"use client"

import React, { useState } from "react"
import { OnBoarding, QuestProvider } from "@questlabs/react-sdk"

import "@questlabs/react-sdk/dist/style.css"
import "../../styles/quest.css"
import { apikey, entityId, questId, token, userId } from "./config"
import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"

export default function getStarted() {
  const [answer, setAnswer] = useState([])

  return (
    <DashboardShell>
        <DashboardHeader
          heading="Onboarding"
          text="Manage onboarding"
        />
    <QuestProvider
      apiKey={apikey}
      entityId={entityId}
      apiType="STAGING"
      featureFlags={{}}
      themeConfig={{}}
      apiSecret=""
    >
      <OnBoarding
        questId={questId}
        userId={userId}
        token={token}
        progress={["Personal Details", "Professional Details"]}
        controlBtnType="Buttons"
        answer={answer}
        setAnswer={setAnswer}
        headingScreen={[
          {
            name: "Identity Insights",
            desc: "Revealing dimensions beyond words",
          },
          {
            name: "Professional Details",
            desc: "Tell us more about your company",
          },
        ]}
        template="multi-question"
        design={[
          [1, 2, 3],
          [4, 5, 6],
        ]}
        singleChoose="modal1"
        multiChoice={"modal1"}
        
        styleConfig={{ Heading: {}, Description: {}, Input: {},Form:{background:"#708090"} }}
      />
    </QuestProvider>
    </DashboardShell>
  )
}
