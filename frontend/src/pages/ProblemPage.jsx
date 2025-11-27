import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import { GripVertical, GripHorizontal } from 'lucide-react' // Added icons

import { PROBLEMS } from '../data/problems'
import { executeCode } from '../lib/piston'
import ProblemDescription from '../components/ProblemDescription'
import OutputPanel from '../components/OutputPanel'
import CodeEditorPanel from '../components/CodeEditorPanel'
import Navbar from '../components/Navbar' // Assuming you have this from previous steps

/* -------------------------------------------------------------------------- */
/* CONSTANTS & UTILS                                                          */
/* -------------------------------------------------------------------------- */
const DEFAULT_PROBLEM_ID = 'two-sum'
const DEFAULT_LANGUAGE = 'javascript'

const normalizeOutput = (output) => {
  if (!output) return ''
  return output
    .trim()
    .split('\n')
    .map((line) =>
      line
        .trim()
        .replace(/\[\s+/g, '[')
        .replace(/\s+\]/g, ']')
        .replace(/\s*,\s*/g, ',')
    )
    .filter((line) => line.length > 0)
    .join('\n')
}

const triggerSuccessConfetti = () => {
  const defaults = { spread: 250, particleCount: 80, decay: 0.94 }
  confetti({
    ...defaults,
    origin: { x: 0.2, y: 0.6 },
    colors: ['#10B981', '#34D399'],
  })
  confetti({
    ...defaults,
    origin: { x: 0.8, y: 0.6 },
    colors: ['#10B981', '#34D399'],
  })
}

/* -------------------------------------------------------------------------- */
/* CUSTOM RESIZE HANDLE                                                       */
/* -------------------------------------------------------------------------- */
const ResizeHandle = ({ direction = 'horizontal' }) => (
  <PanelResizeHandle
    className={`
      flex items-center justify-center transition-all duration-300
      bg-base-300/50 hover:bg-primary/20
      ${
        direction === 'horizontal'
          ? 'w-2 cursor-col-resize'
          : 'h-2 cursor-row-resize'
      }
    `}
  >
    <div
      className={`bg-base-content/20 rounded-full ${
        direction === 'horizontal' ? 'h-8 w-1' : 'w-8 h-1'
      }`}
    />
  </PanelResizeHandle>
)

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */
function ProblemPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const currentProblemId = id && PROBLEMS[id] ? id : DEFAULT_PROBLEM_ID
  const currentProblem = PROBLEMS[currentProblemId]

  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE)
  const [code, setCode] = useState(currentProblem.starterCode[DEFAULT_LANGUAGE])
  const [output, setOutput] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  // Reset code when problem/language changes
  useEffect(() => {
    setCode(currentProblem.starterCode[selectedLanguage])
    setOutput(null)
  }, [currentProblemId, selectedLanguage, currentProblem])

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput(null)
    try {
      const result = await executeCode(selectedLanguage, code)
      setOutput(result)

      if (result.success) {
        const expectedRaw = currentProblem.expectedOutput?.[selectedLanguage]
        if (!expectedRaw) {
          toast.warning(`No test cases defined for ${selectedLanguage}`)
          return
        }
        const passed =
          normalizeOutput(result.output) === normalizeOutput(expectedRaw)

        if (passed) {
          triggerSuccessConfetti()
          toast.success('Accepted! Logic is correct.')
        } else {
          toast.error('Wrong Answer. Check your logic.')
        }
      } else {
        toast.error('Runtime Error')
      }
    } catch (error) {
      toast.error('Execution Server Error')
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className='h-screen w-full bg-base-100 relative flex flex-col overflow-hidden'>
      {/* BACKGROUND TEXTURE */}
      <div className='absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none' />

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN WORKSPACE - Added padding top to account for floating navbar */}
      <div className='flex-1 pt-24 pb-4 px-4 h-full overflow-hidden'>
        <div className='h-full border border-base-content/10 rounded-2xl overflow-hidden shadow-2xl bg-base-100/40 backdrop-blur-sm'>
          <PanelGroup direction='horizontal'>
            {/* LEFT PANEL: DESCRIPTION */}
            <Panel defaultSize={40} minSize={25} maxSize={60}>
              <ProblemDescription
                problem={currentProblem}
                currentProblemId={currentProblemId}
                onProblemChange={(pid) => navigate(`/problem/${pid}`)}
                allProblems={Object.values(PROBLEMS)}
              />
            </Panel>

            <ResizeHandle direction='horizontal' />

            {/* RIGHT PANEL: EDITOR + OUTPUT */}
            <Panel defaultSize={60} minSize={30}>
              <PanelGroup direction='vertical'>
                {/* EDITOR */}
                <Panel defaultSize={65} minSize={30}>
                  <CodeEditorPanel
                    selectedLanguage={selectedLanguage}
                    code={code}
                    isRunning={isRunning}
                    onLanguageChange={(e) =>
                      setSelectedLanguage(e.target.value)
                    }
                    onCodeChange={setCode}
                    onRunCode={handleRunCode}
                  />
                </Panel>

                <ResizeHandle direction='vertical' />

                {/* OUTPUT */}
                <Panel defaultSize={35} minSize={10}>
                  <OutputPanel output={output} />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  )
}

export default ProblemPage
