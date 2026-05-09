import { useState, useCallback, useEffect, useRef } from 'react'

const readStoredValue = (key, initialValue) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch {
    return initialValue
  }
}

export const useLocalStorage = (key, initialValue) => {
  const initialValueRef = useRef(initialValue)
  const [storedValue, setStoredValue] = useState(() => readStoredValue(key, initialValueRef.current))

  useEffect(() => {
    const syncValue = (event) => {
      if (event?.key && event.key !== key) {
        return
      }

      if (event?.detail?.value !== undefined) {
        setStoredValue(event.detail.value)
        return
      }

      setStoredValue(readStoredValue(key, initialValueRef.current))
    }

    window.addEventListener('storage', syncValue)
    window.addEventListener(`local-storage:${key}`, syncValue)

    return () => {
      window.removeEventListener('storage', syncValue)
      window.removeEventListener(`local-storage:${key}`, syncValue)
    }
  }, [key])

  const setValue = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const valueToStore = value instanceof Function ? value(currentValue) : value

        try {
          localStorage.setItem(key, JSON.stringify(valueToStore))
          window.dispatchEvent(
            new CustomEvent(`local-storage:${key}`, {
              detail: { value: valueToStore },
            })
          )
        } catch {
          // Ignore storage synchronization failures and keep in-memory state updated.
        }

        return valueToStore
      })
    },
    [key]
  )

  return [storedValue, setValue]
}
