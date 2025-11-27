import { useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from '../hooks/useSessions'
import { PROBLEMS } from '../data/problems'
import { executeCode } from '../lib/piston'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import {
  Loader2,
  LogOut,
  Code2,
  CheckCircle2,
  Copy,
  Terminal,
  MousePointer2,
} from 'lucide-react'
import CodeEditorPanel from '../components/CodeEditorPanel'
import OutputPanel from '../components/OutputPanel'
import ProblemDescription from '../components/ProblemDescription' // Reusing the component we made
import useStreamClient from '../hooks/useStreamClient'
import { StreamCall, StreamVideo } from '@stream-io/video-react-sdk'
import VideoCallUI from '../components/VideoCallUI'
import { toast } from 'sonner'

/* -------------------------------------------------------------------------- */
/* CUSTOM RESIZE HANDLE                                                       */
/* -------------------------------------------------------------------------- */
const ResizeHandle = ({ direction = 'horizontal' }) => (
  <PanelResizeHandle
    className={`
      flex items-center justify-center transition-all duration-300 z-10
      bg-base-300 hover:bg-primary
      ${
        direction === 'horizontal'
          ? 'w-1.5 cursor-col-resize'
          : 'h-1.5 cursor-row-resize'
      }
    `}
  />
)

function SessionPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useUser()
  const [output, setOutput] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [copiedId, setCopiedId] = useState(false)

  const {
    data: sessionData,
    isLoading: loadingSession,
    refetch,
  } = useSessionById(id)

  const joinSessionMutation = useJoinSession()
  const endSessionMutation = useEndSession()

  const session = sessionData?.session
  const isHost = session?.host?.clerkId === user?.id
  const isParticipant = session?.participant?.clerkId === user?.id

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, isParticipant)

  // Find problem data
  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null

  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [code, setCode] = useState('')

  // Auto-join logic
  useEffect(() => {
    if (!session || !user || loadingSession) return
    if (isHost || isParticipant) return
    joinSessionMutation.mutate(id, { onSuccess: refetch })
  }, [session, user, loadingSession, isHost, isParticipant, id])

  // Redirect on completion
  useEffect(() => {
    if (!session || loadingSession) return
    if (session.status === 'completed') navigate('/dashboard')
  }, [session, loadingSession, navigate])

  // Sync code
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage])
    }
  }, [problemData, selectedLanguage])

  const handleLanguageChange = (e) => {
    const newLang = e.target.value
    setSelectedLanguage(newLang)
    setCode(problemData?.starterCode?.[newLang] || '')
    setOutput(null)
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput(null)
    const result = await executeCode(selectedLanguage, code)
    setOutput(result)
    setIsRunning(false)
  }

  const handleEndSession = () => {
    if (confirm('Are you sure you want to end this session?')) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate('/dashboard') })
    }
  }

  const copySessionId = () => {
    navigator.clipboard.writeText(id)
    setCopiedId(true)
    toast.success('Session ID copied to clipboard')
    setTimeout(() => setCopiedId(false), 2000)
  }

  if (loadingSession || !session) {
    return (
      <div className='h-screen flex flex-col items-center justify-center bg-base-100 space-y-4'>
        <Loader2 className='size-12 animate-spin text-primary' />
        <p className='text-base-content/60 font-medium'>
          Initializing Environment...
        </p>
      </div>
    )
  }

  return (
    <div className='h-screen w-full bg-base-100 flex flex-col overflow-hidden relative'>
      {/* BACKGROUND TEXTURE */}
      <div className='absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none' />

      {/* HEADER STRIP */}
      <header className='h-14 bg-base-200/50 backdrop-blur-md border-b border-base-content/10 flex items-center justify-between px-4 z-20'>
        {/* LEFT: INFO */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='size-8 bg-primary/10 rounded-lg flex items-center justify-center'>
              <Code2 className='size-5 text-primary' />
            </div>
            <div>
              <h1 className='font-bold text-sm leading-tight'>
                {session.problem}
              </h1>
              <div className='flex items-center gap-2 text-[10px] text-base-content/60 font-mono'>
                <span>ID: {id.slice(0, 8)}...</span>
                <button
                  onClick={copySessionId}
                  className='hover:text-primary transition-colors'
                >
                  {copiedId ? (
                    <CheckCircle2 className='size-3' />
                  ) : (
                    <Copy className='size-3' />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className='h-6 w-px bg-base-content/10' />
          <div className='badge badge-sm badge-ghost font-mono'>
            {session.difficulty}
          </div>
        </div>

        {/* RIGHT: CONTROLS */}
        <div className='flex items-center gap-3'>
          {isHost && session.status === 'active' && (
            <button
              onClick={handleEndSession}
              disabled={endSessionMutation.isPending}
              className='btn btn-xs btn-error hover:bg-error/90 text-white gap-2'
            >
              {endSessionMutation.isPending ? (
                <Loader2 className='size-3 animate-spin' />
              ) : (
                <LogOut className='size-3' />
              )}
              End Session
            </button>
          )}
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <div className='flex-1 overflow-hidden relative z-10'>
        <PanelGroup direction='horizontal'>
          {/* LEFT PANEL: DESCRIPTION */}
          <Panel
            defaultSize={25}
            minSize={20}
            maxSize={40}
            className='bg-base-100'
          >
            {/* We wrap the existing ProblemDescription to fit the session context */}
            {problemData ? (
              <ProblemDescription
                problem={problemData}
                currentProblemId={problemData.id}
                // Disable changing problems in active session
                onProblemChange={() => {}}
                allProblems={[problemData]}
              />
            ) : (
              <div className='h-full flex items-center justify-center p-4 text-center'>
                <p>Problem data not found.</p>
              </div>
            )}
          </Panel>

          <ResizeHandle direction='horizontal' />

          {/* MIDDLE PANEL: EDITOR + OUTPUT */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction='vertical'>
              <Panel defaultSize={70} minSize={30}>
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

              <Panel defaultSize={30} minSize={10}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>

          <ResizeHandle direction='horizontal' />

          {/* RIGHT PANEL: COMMUNICATION */}
          <Panel
            defaultSize={25}
            minSize={20}
            maxSize={35}
            className='bg-base-200'
          >
            {isInitializingCall ? (
              <div className='h-full flex flex-col items-center justify-center gap-3'>
                <Loader2 className='size-8 animate-spin text-primary' />
                <p className='text-sm text-base-content/60'>
                  Connecting to room...
                </p>
              </div>
            ) : !streamClient || !call ? (
              <div className='h-full flex flex-col items-center justify-center gap-3'>
                <p className='text-sm text-error'>Video connection failed.</p>
              </div>
            ) : (
              <StreamVideo client={streamClient}>
                <StreamCall call={call}>
                  <VideoCallUI chatClient={chatClient} channel={channel} />
                </StreamCall>
              </StreamVideo>
            )}
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}

export default SessionPage
