'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Lang } from '@/lib/i18n'

type LangCtx = { lang: Lang; setLang: (l: Lang) => void }
const Ctx = createContext<LangCtx>({ lang: 'el', setLang: () => {} })

export const useLang = () => useContext(Ctx)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('el')
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}
