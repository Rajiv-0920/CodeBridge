import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'

import { PROBLEMS } from '../data/problems'
import { executeCode } from '../lib/piston'
import ProblemDescription from '../components/ProblemDescription'
import OutputPanel from '../components/OutputPanel'
import CodeEditorPanel from '../components/CodeEditorPanel'

/* -------------------------------------------------------------------------- */
/* CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const DEFAULT_PROBLEM_ID = 'two-sum'
const DEFAULT_LANGUAGE = 'javascript'

/* -------------------------------------------------------------------------- */
/* UTILITY LOGIC                               */
/* -------------------------------------------------------------------------- */

/**
 * Normalizes code output by trimming whitespace and standardizing array formatting.
 */
const normalizeOutput = (output) => {
  if (!output) return ''
  return output
    .trim()
    .split('\n')
    .map((line) =>
      line
        .trim()
        // Normalize array formatting: [ 1, 2 ] -> [1,2]
        .replace(/\[\s+/g, '[')
        .replace(/\s+\]/g, ']')
        .replace(/\s*,\s*/g, ',')
    )
    .filter((line) => line.length > 0)
    .join('\n')
}

const triggerSuccessConfetti = () => {
  const defaults = { spread: 250, particleCount: 80 }
  confetti({ ...defaults, origin: { x: 0.2, y: 0.6 } })
  confetti({ ...defaults, origin: { x: 0.8, y: 0.6 } })
}

/* -------------------------------------------------------------------------- */
/* SUB-COMPONENTS                                 */
/* -------------------------------------------------------------------------- */
const ResizeHandle = ({ direction = 'horizontal' }) => (
  <PanelResizeHandle
    className={`
      transition-colors bg-base-300 hover:bg-primary
      ${
        direction === 'horizontal'
          ? 'w-2 cursor-col-resize'
          : 'h-2 cursor-row-resize'
      }
    `}
  />
)

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

function ProblemPage() {
  // 1. Hooks and Routing
  const { id } = useParams()
  const navigate = useNavigate()

  // 2. Derived State (Source of Truth)
  const currentProblemId = id && PROBLEMS[id] ? id : DEFAULT_PROBLEM_ID
  const currentProblem = PROBLEMS[currentProblemId]

  // 3. Local State
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE)
  const [code, setCode] = useState(currentProblem.starterCode[DEFAULT_LANGUAGE])
  const [output, setOutput] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  // 4. Effects: Sync Code when Problem or Language changes
  useEffect(() => {
    const starterCode = currentProblem.starterCode[selectedLanguage]
    setCode(starterCode)
    setOutput(null)
  }, [currentProblemId, selectedLanguage, currentProblem])

  // 5. Handlers
  const handleProblemChange = (newProblemId) => {
    navigate(`/problem/${newProblemId}`)
  }

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value)
    // Note: The useEffect above handles the code reset automatically
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput(null)

    try {
      const result = await executeCode(selectedLanguage, code)
      setOutput(result)

      if (result.success) {
        // 2. Safety Check: Ensure expected output exists for this language
        const expectedRaw = currentProblem.expectedOutput?.[selectedLanguage]

        if (!expectedRaw) {
          toast.error(`No expected output defined for ${selectedLanguage}`)
          return
        }

        const actualNorm = normalizeOutput(result.output)
        const expectedNorm = normalizeOutput(expectedRaw)

        // 3. Comparison Logic
        const passed = actualNorm === expectedNorm

        if (passed) {
          triggerSuccessConfetti()
          toast.success('All tests passed! Great job!')
        } else {
          // Optional: specific hint if length matches but content doesn't
          toast.error('Tests failed. Check your output!')
        }
      } else {
        // Compilation/Runtime Error
        toast.error(result.error || 'Code execution failed!')
      }
    } catch (error) {
      console.error('Execution Error:', error)
      toast.error('Something went wrong with the execution server.')
    } finally {
      setIsRunning(false)
    }
  }

  // 6. Render
  return (
    <div className='h-screen flex flex-col bg-base-100'>
      <div className='flex-1 overflow-hidden'>
        <PanelGroup direction='horizontal'>
          {/* Left Panel: Problem Description */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          <ResizeHandle direction='horizontal' />

          {/* Right Panel: Editor & Output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction='vertical'>
              {/* Top: Code Editor */}
              <Panel defaultSize={60} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <ResizeHandle direction='vertical' />

              {/* Bottom: Output */}
              <Panel defaultSize={30} minSize={30}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}

export default ProblemPage
