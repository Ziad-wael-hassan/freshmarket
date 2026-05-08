import { useLocalStorage } from './useLocalStorage'

const MAX_RECENT = 12

export const useRecentlyViewed = () => {
  const [recentIds, setRecentIds] = useLocalStorage('recentlyViewed', [])

  const addToRecentlyViewed = (productId) => {
    if (!productId) return
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== productId)
      return [productId, ...filtered].slice(0, MAX_RECENT)
    })
  }

  return { recentIds, addToRecentlyViewed }
}
