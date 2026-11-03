import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedKey, setStoredKey] = useState(key)
  const [value, setValue] = useState(() => {
    if (!key) return initialValue
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  if (key !== storedKey) {
    setStoredKey(key)
    let nextValue = initialValue
    if (key) {
      try {
        const saved = localStorage.getItem(key)
        if (saved !== null) nextValue = JSON.parse(saved)
      } catch {
        nextValue = initialValue
      }
    }
    setValue(nextValue)
  }

  useEffect(() => {
    if (!key) return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore write errors
    }
  }, [key, value])

  return [value, setValue]
}
