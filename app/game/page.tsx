"use client"

import Room from '@/components/Room';
import React from 'react'

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { LiveObject } from '@liveblocks/client';

const page = () => {
    
  return (
    <LiveblocksProvider publicApiKey='pk_dev_SCAL1NpjXwSW-ThpfEk36nmvLQkwSHE1ssupMUPEDmU0ikl7Cc3YvQWPguLsREVP'>
      <RoomProvider
        id='testRoomId'
        initialStorage={{
          centralCard: new LiveObject<{color: 'blue', value: '4'}>,
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <Room />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}

export default page
