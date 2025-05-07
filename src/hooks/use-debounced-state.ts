import { useEffect, useRef, useState } from 'react'

export function useDebouncedState<T>(defaultValue: T, wait: number, options = { leading: false }) {
  const [value, setValue] = useState(defaultValue)
  const timeoutRef = useRef<number | null>(null)
  const leadingRef = useRef(true)

  const clearTimeout = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => clearTimeout, [])

  const debouncedSetValue = (newValue: T) => {
    clearTimeout()
    if (leadingRef.current && options.leading) {
      setValue(newValue)
    } else {
      timeoutRef.current = window.setTimeout(() => {
        leadingRef.current = true
        setValue(newValue)
      }, wait)
    }
    leadingRef.current = false
  }

  return [value, debouncedSetValue] as const
}
