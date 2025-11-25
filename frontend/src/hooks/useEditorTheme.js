import { useEffect, useState } from 'react'

export const useEditorTheme = () => {
  const [editorTheme, setEditorTheme] = useState((theme) => {
    const storedTheme = localStorage.getItem('editor-theme')
    return storedTheme || theme
  })

  useEffect(() => {
    localStorage.setItem('editor-theme', editorTheme)
  }, [editorTheme])

  return { editorTheme, setEditorTheme }
}
