import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'

/** Renders a page into #root. Every HTML entry calls this once. */
export function mount(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)
}
