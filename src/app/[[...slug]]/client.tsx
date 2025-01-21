'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import {utilisateurType} from "@/types";

interface HeaderProps {
    userConnected : utilisateurType;
}

const App = dynamic(() => import('@/App'), { ssr: false })


export  function ClientOnly({userConnected}) {
    return <App userConnected={userConnected}/>
}