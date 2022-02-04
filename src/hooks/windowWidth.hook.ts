import { useCallback, useEffect, useState } from 'react'

const useWindowsWidth = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false)

  let checkScreenSize = useCallback(() => {
    setIsScreenSmall(window.innerWidth < 600)
  }, [])

  useEffect(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [checkScreenSize])

  return isScreenSmall
}

export default useWindowsWidth
