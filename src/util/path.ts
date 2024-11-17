const basePath = process.env.NODE_ENV === 'production' ? '/EcoMap_Web2' : ''

export const getImagePath = (path: string) => `${basePath}${path}`
