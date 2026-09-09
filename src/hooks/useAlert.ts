import { useCallback, useRef, useState } from 'react'

export type AlertType = 'success' | 'danger'

export interface AlertState {
  show: boolean
  text: string
  type: AlertType
}

const HIDDEN: AlertState = { show: false, text: '', type: 'success' }

export function useAlert(autoHideMs = 4000) {
  const [alert, setAlert] = useState<AlertState>(HIDDEN)
  const timer = useRef<number | null>(null)

  const hideAlert = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = null
    setAlert(HIDDEN)
  }, [])

  const showAlert = useCallback(
    (text: string, type: AlertType = 'success') => {
      if (timer.current !== null) window.clearTimeout(timer.current)
      setAlert({ show: true, text, type })
      timer.current = window.setTimeout(() => setAlert(HIDDEN), autoHideMs)
    },
    [autoHideMs],
  )

  return { alert, showAlert, hideAlert }
}
