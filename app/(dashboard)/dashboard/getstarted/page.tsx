"use client"
import React from 'react'
import { GetStarted, QuestProvider } from "@questlabs/react-sdk";
import "@questlabs/react-sdk/dist/style.css"
import "../../../../styles/quest.css"
import { apikey, entityId, questId, token, userId } from './config';
import { DashboardShell } from '@/components/shell';
import { DashboardHeader } from '@/components/header';


export default function getStarted() {

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Get started"
                text="Manage get started."
            />
            <QuestProvider apiKey={apikey} entityId={entityId} featureFlags={{}} themeConfig={{}} >
                <GetStarted
                    questId={questId}
                    token={token}
                    arrowColor=''
                    userId={userId}
                    template={2}
                    iconUrls={[
                        "https://pin.questprotocol.xyz/ipfs/QmWSjM2BwmSW7pda3YmWxyFQ7sCJ9PVmVAwj1W9K7XAHhG",
                        "https://pin.questprotocol.xyz/ipfs/QmRC5SwJpBup4wRB32DxjPV2fEnccpJkuMTBtzS9aiJg42",
                        "https://pin.questprotocol.xyz/ipfs/QmcYB6T27vbqdaaeJdx1Cz3nz9oYMhTegpWjhSff7aX2Mi",
                        "https://pin.questprotocol.xyz/ipfs/QmavuprWaHKvd5JZvkdgathYKLr5Zcshc1EPRzRzBJaPqw"
                    ]}
                    showFooter={false}
                    cardBackground="rgb(22, 22, 22)"
                    styleConfig={{
                        Form: { background: 'transparent', margin: '20px' },
                        Heading: { color: "white", fontSize: '24px', lineHeight: '32px' }
                    }}
                    cardBorderColor={'transparent'}
                />
            </QuestProvider>
        </DashboardShell>
    )
}
