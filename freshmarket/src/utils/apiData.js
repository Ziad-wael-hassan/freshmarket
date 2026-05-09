const isAxiosResponse = (value) =>
  Boolean(value) && typeof value === 'object' && 'data' in value && 'status' in value

export const getApiPayload = (value) => {
  if (isAxiosResponse(value)) {
    return value.data
  }

  return value
}

export const unwrapApiData = (value) => {
  const payload = getApiPayload(value)

  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data
  }

  return payload ?? null
}

export const unwrapApiCollection = (value) => {
  const collection = unwrapApiData(value)
  return Array.isArray(collection) ? collection : []
}

export const normalizeProduct = (value) => {
  const product = unwrapApiData(value)

  if (!product || typeof product !== 'object') {
    return null
  }

  return {
    ...product,
    _id: product._id || product.id || product.productId || null,
    title: product.title || product.name || 'Untitled Product',
    imageCover: product.imageCover || product.image || product.images?.[0] || '',
    price: Number(product.price ?? product.priceAfterDiscount ?? 0) || 0,
    priceAfterDiscount:
      product.priceAfterDiscount !== undefined ? Number(product.priceAfterDiscount) || 0 : null,
    ratingsAverage: Number(product.ratingsAverage ?? product.rating ?? 0) || 0,
    ratingsQuantity: Number(product.ratingsQuantity ?? product.reviewCount ?? 0) || 0,
  }
}

const normalizeName = (value) => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.replace(/\s+/g, ' ').trim()
}

export const normalizeUser = (value) => {
  const user = unwrapApiData(value)

  if (!user || typeof user !== 'object') {
    return null
  }

  const email = user.email || ''
  const fallbackName = email.includes('@') ? email.split('@')[0] : ''
  const normalizedName = normalizeName(user.name || user.username || user.fullName || fallbackName)

  return {
    ...user,
    _id: user._id || user.id || null,
    id: user.id || user._id || null,
    name: normalizedName,
    email,
    phone: user.phone || '',
    role: user.role || 'user',
    createdAt:
      user.createdAt || user.created_at || user.created || user.dateCreated || user.updatedAt || null,
    image: user.image || user.photo || user.avatar || '',
  }
}
