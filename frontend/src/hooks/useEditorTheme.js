import { useEffect, useState } from 'react'

export const useEditorTheme = () => {
  const [editorTheme, setEditorTheme] = useState(() => {
    const storedTheme = localStorage.getItem('editor-theme')
    return storedTheme || 'vs-dark'
  })

  useEffect(() => {
    localStorage.setItem('editor-theme', editorTheme)
  }, [editorTheme])

  return { editorTheme, setEditorTheme }
}
