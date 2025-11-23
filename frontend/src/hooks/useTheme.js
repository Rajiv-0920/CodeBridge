import { useEffect, useState } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState((theme) => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme || theme
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return { theme, setTheme }
}
