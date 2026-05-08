export const normalizeText = (text) => {
  return text.toLowerCase().trim().replace(/[^\w\s]/g, '')
}

export const productMatchesSearch = (product, query) => {
  if (!query?.trim()) return true

  const normalizedQuery = normalizeText(query)
  const title = normalizeText(product.title || '')
  const description = normalizeText(product.description || '')
  const tags = (product.tags || []).map(t => normalizeText(t)).join(' ')
  const searchableText = `${title} ${description} ${tags}`

  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean)

  return queryWords.every(word => searchableText.includes(word))
}
