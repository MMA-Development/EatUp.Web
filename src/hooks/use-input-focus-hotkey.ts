import { useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export function useInputFocusHotkey(hotkey: string = 'ctrl+k') {
  const ref = useRef<HTMLInputElement>(null)

  useHotkeys(hotkey, (event) => {
    event.preventDefault() // Stops Chrome from hijacking the shortcut
    if (ref.current) {
      ref.current.focus()
    }
  })

  return ref
}
