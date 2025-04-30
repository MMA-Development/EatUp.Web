import Fuse, { IFuseOptions } from 'fuse.js'
import { useMemo } from 'react'

export function useFuzzySearch<T>(
  items: T[],
  query?: string,
  fuseOptions: IFuseOptions<T> = { threshold: 0.3 }
): T[] {
  return useMemo(() => {
    const trimmedQuery = query ? query.trim() : ''
    if (!trimmedQuery) return items
    const fuse = new Fuse(items, fuseOptions)
    return fuse.search(trimmedQuery).map((result) => result.item)
  }, [items, query, fuseOptions])
}
