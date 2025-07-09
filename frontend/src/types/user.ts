import type { ReactNode } from "react"

export interface CheckAuthProps {
    children: ReactNode,
    protectedRoute: boolean
}