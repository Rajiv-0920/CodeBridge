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

const DashboardPage = () => {
  const navigate = useNavigate()
  const { user } = useUser()
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
    if (!user.id) return false
    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    )
  }

  return (
    <>
      {/* Background decoration */}
      <div className='min-h-screen bg-base-300 relative selection:bg-primary selection:text-primary-content'>
        {/* Subtle grid background */}
        <div className='absolute inset-0 h-full w-full bg-base-300 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none' />

        <Navbar />

        <div className='relative z-10 pt-10'>
          <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

          <div className='container mx-auto px-6 pb-16 space-y-8'>
            {/* Upper Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <StatsCards
                activeSessionsCount={activeSessions.length}
                recentSessionsCount={recentSessions.length}
              />
              <ActiveSessions
                sessions={activeSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
              />
            </div>

            {/* Lower Grid */}
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
    </>
  )
}

export default DashboardPage
