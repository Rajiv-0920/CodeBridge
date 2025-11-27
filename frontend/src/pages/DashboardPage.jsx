import { useNavigate } from 'react-router'
import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from '../hooks/useSessions'

import Navbar from '../components/Navbar'
import StatsCards from '../components/StatsCards'
import ActiveSessions from '../components/ActiveSessions'
import RecentSessions from '../components/RecentSessions'
import CreateSessionModal from '../components/CreateSessionModal'
import WelcomeSection from '../components/WelcomeSection'
import { Loader2 } from 'lucide-react'

const DashboardPage = () => {
  const navigate = useNavigate()
  const { user, isLoaded } = useUser()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [roomConfig, setRoomConfig] = useState({ problem: '', difficulty: '' })

  const createSessionMutation = useCreateSession()

  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions()
  const { data: recentSessionsData, isLoading: loadingRecentSessions } =
    useMyRecentSessions()

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false)
          navigate(`/session/${data.session._id}`)
        },
      }
    )
  }

  const activeSessions = activeSessionsData?.sessions || []
  const recentSessions = recentSessionsData?.sessions || []

  const isUserInSession = (session) => {
    if (!user?.id) return false
    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    )
  }

  if (!isLoaded) {
    return (
      <div className='min-h-screen bg-base-100 flex items-center justify-center'>
        <Loader2 className='size-10 animate-spin text-primary' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-100 relative selection:bg-primary/20 selection:text-primary'>
      {/* Background decoration */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0 bg-grid-pattern opacity-5' />
        <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2' />
      </div>

      <Navbar />

      <div className='relative pt-28 pb-16 px-6 max-w-7xl mx-auto space-y-8'>
        {/* WELCOME HEADER */}
        <WelcomeSection
          onCreateSession={() => setShowCreateModal(true)}
          user={user}
        />

        {/* STATS HUD */}
        <StatsCards
          activeSessionsCount={activeSessions.length}
          recentSessionsCount={recentSessions.length}
        />

        {/* MAIN CONTENT GRID */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left: Active Lobbies (2/3 width) */}
          <div className='lg:col-span-2 space-y-6'>
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>

          {/* Right: History (1/3 width) */}
          <div className='lg:col-span-1'>
            <RecentSessions
              sessions={recentSessions}
              isLoading={loadingRecentSessions}
            />
          </div>
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </div>
  )
}

export default DashboardPage
