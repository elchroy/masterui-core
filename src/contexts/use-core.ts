import { Context, createContext, useContext } from "react"
import { CoreContextType } from "./core-context"


export const CoreContext: Context<CoreContextType | null> =
    createContext<CoreContextType | null>(null)

export function useCore(): CoreContextType {
  const context = useContext(CoreContext)
  if (!context) {
    throw new Error("useCore must be used within a CoreProvider")
  }
  return context
}