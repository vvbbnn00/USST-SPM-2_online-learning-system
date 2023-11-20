// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {Next13ProgressBar} from "next13-progressbar";

export function Providers({children}) {
    return (
        <NextUIProvider>
            {children}
            <Next13ProgressBar height="4px" color="#fff5d850" options={{ showSpinner: true }} showOnShallow />
        </NextUIProvider>
    )
}
