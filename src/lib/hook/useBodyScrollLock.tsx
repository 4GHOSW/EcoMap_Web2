import { useEffect } from 'react'

const useBodyScrollLock = (isEffectOn: boolean) => {
  useEffect(() => {
    if (isEffectOn) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      const originalStyleHTML = window.getComputedStyle(document.getElementsByTagName('html')[0]).overflow

      if (originalStyle === 'clip' && originalStyleHTML === 'clip') return undefined

      document.body.style.overflow = 'clip'
      document.getElementsByTagName('html')[0].style.overflow = 'clip'

      return () => {
        document.body.style.overflow = originalStyle
        document.getElementsByTagName('html')[0].style.overflow = originalStyle
      }
    }
    return undefined
  }, [isEffectOn])
}
export default useBodyScrollLock
