import { useMemo } from 'react'
import Editor from '@monaco-editor/react'
import { Loader2Icon, PlayIcon, TypeIcon } from 'lucide-react'

import { LANGUAGE_CONFIG } from '../data/problems'
import {
  atomOneLightTheme,
  ayuLightTheme,
  cobalt2Theme,
  draculaTheme,
  githubDarkTheme,
  githubLightTheme,
  gruvboxDarkTheme,
  gruvboxLightTheme,
  lightOwlTheme,
  lightPlusTheme,
  materialTheme,
  monokaiTheme,
  nightOwlTheme,
  oneDarkProTheme,
  quietLightTheme,
  solarizedLightTheme,
  synthwave84Theme,
  THEME_OPTIONS,
  tokyoNightLightTheme,
  tokyoNightTheme,
  winterIsComingLightTheme,
} from '../data/themes'
import { useEditorTheme } from '../hooks/useEditorTheme'

const EDITOR_OPTIONS = {
  fontSize: 16,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  minimap: { enabled: false },
  padding: { top: 16, bottom: 16 },
  fontFamily:
    '"Spline Sans Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
  fontLigatures: true,
  cursorBlinking: 'smooth',
  smoothScrolling: true,
  contextmenu: true,
  formatOnType: true,
  formatOnPaste: true,
  lineHeight: 1.6,
  letterSpacing: 0.5,
  renderLineHighlight: 'all',
  scrollbar: {
    useShadows: true,
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
  },
}

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  const { editorTheme, setEditorTheme } = useEditorTheme()

  const languageEntries = useMemo(() => Object.entries(LANGUAGE_CONFIG), [])
  const currentLanguage = LANGUAGE_CONFIG[selectedLanguage]

  const handleThemeChange = (e) => {
    setEditorTheme(e.target.value)
  }

  // 3. Register the custom themes before the editor mounts
  const handleEditorWillMount = (monaco) => {
    // Dark themes
    monaco.editor.defineTheme('monokai', monokaiTheme)
    monaco.editor.defineTheme('dracula', draculaTheme)
    monaco.editor.defineTheme('github-dark', githubDarkTheme)
    monaco.editor.defineTheme('one-dark-pro', oneDarkProTheme)
    monaco.editor.defineTheme('night-owl', nightOwlTheme)
    monaco.editor.defineTheme('tokyo-night', tokyoNightTheme)
    monaco.editor.defineTheme('synthwave-84', synthwave84Theme)
    monaco.editor.defineTheme('cobalt2', cobalt2Theme)
    monaco.editor.defineTheme('material-theme', materialTheme)
    monaco.editor.defineTheme('gruvbox-dark', gruvboxDarkTheme)

    // Light themes
    monaco.editor.defineTheme('github-light', githubLightTheme)
    monaco.editor.defineTheme('light-plus', lightPlusTheme)
    monaco.editor.defineTheme('solarized-light', solarizedLightTheme)
    monaco.editor.defineTheme('quiet-light', quietLightTheme)
    monaco.editor.defineTheme('atom-one-light', atomOneLightTheme)
    monaco.editor.defineTheme(
      'winter-is-coming-light',
      winterIsComingLightTheme
    )
    monaco.editor.defineTheme('gruvbox-light', gruvboxLightTheme)
    monaco.editor.defineTheme('light-owl', lightOwlTheme)
    monaco.editor.defineTheme('tokyo-night-light', tokyoNightLightTheme)
    monaco.editor.defineTheme('ayu-light', ayuLightTheme)
  }

  return (
    <div className='h-full bg-base-200 flex flex-col'>
      {/* Header Bar */}
      <div className='flex items-center justify-between px-6 py-3 bg-base-100 border-b border-base-300 shadow-sm'>
        <div className='flex items-center gap-4'>
          {/* Language Selector */}
          <div className='flex items-center gap-2 px-3 py-1.5 bg-base-200 rounded-lg'>
            <img
              src={currentLanguage.icon}
              alt={currentLanguage.name}
              className='size-5'
            />
            <select
              className='select select-sm bg-transparent border-none focus:outline-none font-medium text-sm w-32'
              value={selectedLanguage}
              onChange={onLanguageChange}
            >
              {languageEntries.map(([key, lang]) => (
                <option key={key} value={key}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Selector */}
          <div className='flex items-center gap-2 px-3 py-1.5 bg-base-200 rounded-lg'>
            <TypeIcon className='size-4 text-base-content/60' />
            <select
              className='select select-sm bg-transparent border-none focus:outline-none font-medium text-sm w-36'
              value={editorTheme}
              onChange={handleThemeChange}
            >
              {THEME_OPTIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Run Button */}
        <button
          className='btn btn-primary btn-sm gap-2 shadow-md hover:shadow-lg transition-all duration-200'
          disabled={isRunning}
          onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <Loader2Icon className='size-4 animate-spin' />
              <span className='font-medium'>Running...</span>
            </>
          ) : (
            <>
              <PlayIcon className='size-4 fill-current' />
              <span className='font-medium'>Run Code</span>
            </>
          )}
        </button>
      </div>

      {/* Editor Container */}
      <div className='flex-1 overflow-hidden'>
        <Editor
          height='100%'
          language={currentLanguage.monacoLang}
          value={code}
          theme={editorTheme}
          onChange={onCodeChange}
          options={EDITOR_OPTIONS}
          beforeMount={handleEditorWillMount} // <--- THIS IS KEY
          loading={
            <div className='h-full flex items-center justify-center bg-base-200'>
              <div className='flex flex-col items-center gap-3'>
                <Loader2Icon className='size-8 animate-spin text-primary' />
                <span className='text-sm text-base-content/60'>
                  Loading editor...
                </span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default CodeEditorPanel
