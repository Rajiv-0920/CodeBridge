import { useMemo } from 'react'
import Editor from '@monaco-editor/react'
import { Loader2, Play, Settings, RefreshCw } from 'lucide-react'

import { LANGUAGE_CONFIG } from '../data/problems'
// ... (Keep all your theme imports here) ...
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
  fontSize: 14,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  minimap: { enabled: false },
  padding: { top: 16, bottom: 16 },
  fontFamily: '"JetBrains Mono", "Fira Code", monospace', // Use a nice coding font
  cursorBlinking: 'smooth',
  smoothScrolling: true,
  contextmenu: true,
  formatOnType: true,
  renderLineHighlight: 'all',
  scrollbar: {
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
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

  const handleEditorWillMount = (monaco) => {
    // ... (Keep your existing theme definitions here) ...
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
    <div className='h-full flex flex-col bg-base-100'>
      {/* TOOLBAR */}
      <div className='flex items-center justify-between px-4 py-2 border-b border-base-content/10 bg-base-100'>
        {/* LEFT: LANGUAGE & THEME */}
        <div className='flex items-center gap-3'>
          {/* Language Pill */}
          <div className='relative group'>
            <div className='flex items-center gap-2 px-3 py-1.5 bg-base-200/50 hover:bg-base-200 rounded-lg transition-colors cursor-pointer border border-base-content/5'>
              <img
                src={currentLanguage.icon}
                alt={currentLanguage.name}
                className='size-4'
              />
              <select
                className='appearance-none bg-transparent text-xs font-medium focus:outline-none cursor-pointer w-24'
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
          </div>

          {/* Theme Pill */}
          <div className='relative group'>
            <div className='flex items-center gap-2 px-3 py-1.5 bg-base-200/50 hover:bg-base-200 rounded-lg transition-colors cursor-pointer border border-base-content/5'>
              <Settings className='size-3.5 text-base-content/60' />
              <select
                className='appearance-none bg-transparent text-xs font-medium focus:outline-none cursor-pointer w-24'
                value={editorTheme}
                onChange={(e) => setEditorTheme(e.target.value)}
              >
                {THEME_OPTIONS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT: RUN BUTTON */}
        <div className='flex items-center gap-2'>
          <button
            onClick={() =>
              onCodeChange(LANGUAGE_CONFIG[selectedLanguage]?.starterCode || '')
            }
            className='btn btn-xs btn-ghost btn-square tooltip tooltip-left'
            data-tip='Reset Code'
          >
            <RefreshCw className='size-3.5' />
          </button>

          <button
            disabled={isRunning}
            onClick={onRunCode}
            className='btn btn-sm btn-primary gap-2 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95'
          >
            {isRunning ? (
              <Loader2 className='size-3.5 animate-spin' />
            ) : (
              <Play className='size-3.5 fill-current' />
            )}
            <span className='text-xs font-bold'>Run Code</span>
          </button>
        </div>
      </div>

      {/* MONACO EDITOR AREA */}
      <div className='flex-1 relative'>
        <Editor
          height='100%'
          language={currentLanguage.monacoLang}
          value={code}
          theme={editorTheme}
          onChange={onCodeChange}
          options={EDITOR_OPTIONS}
          beforeMount={handleEditorWillMount}
          loading={
            <div className='absolute inset-0 flex items-center justify-center bg-base-100'>
              <span className='loading loading-dots loading-lg text-primary'></span>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default CodeEditorPanel
