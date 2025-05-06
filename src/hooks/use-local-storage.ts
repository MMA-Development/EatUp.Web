import { useState } from 'react'

export enum LocalStorage {
  SIDEBAR_COLLAPSED = 'sidebar_collapsed'
}

export const useLocalStorage = <T>(key: LocalStorage, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (e) {
      console.error(e)
      return initialValue
    }
  })

  const setValue = (value: T): void => {
    if (!value || value === '' || value === undefined) {
      window.localStorage.removeItem(key)
    }

    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(e)
    }
  }

  return [storedValue, setValue]
}
