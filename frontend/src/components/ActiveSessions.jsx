import { Link } from 'react-router'
import { ArrowRight, Code2, Users, Wifi, Lock, Globe } from 'lucide-react'
import { getDifficultyBadgeClass } from '../lib/utils'

const ActiveSessions = ({ sessions = [], isLoading, isUserInSession }) => {
  return (
    <div className='bg-base-100 border border-base-content/5 rounded-3xl overflow-hidden flex flex-col h-full shadow-sm'>
      {/* HEADER */}
      <div className='p-6 border-b border-base-content/5 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Wifi className='size-5 text-primary' />
          </div>
          <div>
            <h2 className='font-bold text-lg'>Live Sessions</h2>
            <p className='text-xs text-base-content/50'>
              Join a room to start coding
            </p>
          </div>
        </div>
        <div className='text-xs font-mono bg-base-200 px-3 py-1 rounded-full text-base-content/60'>
          {sessions.length} Online
        </div>
      </div>

      {/* LIST */}
      <div className='flex-1 p-4 space-y-3 min-h-[300px]'>
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className='h-20 bg-base-200/50 rounded-xl animate-pulse'
            />
          ))
        ) : sessions.length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center text-center py-12'>
            <div className='size-16 bg-base-200 rounded-2xl flex items-center justify-center mb-4'>
              <Globe className='size-8 text-base-content/20' />
            </div>
            <h3 className='font-bold text-base-content/70'>No Active Rooms</h3>
            <p className='text-sm text-base-content/40 max-w-xs'>
              The server is quiet. Be the first to start a session!
            </p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session._id}
              className='group bg-base-200/30 hover:bg-base-100 border border-transparent hover:border-primary/20 rounded-xl p-4 transition-all duration-300 flex items-center justify-between gap-4'
            >
              <div className='flex items-center gap-4 overflow-hidden'>
                {/* Avatar/Icon */}
                <div className='size-12 rounded-xl bg-base-200 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors'>
                  <Code2 className='size-6 text-base-content/40 group-hover:text-primary' />
                </div>

                {/* Info */}
                <div className='min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h3 className='font-bold truncate'>{session.problem}</h3>
                    <span
                      className={`badge badge-xs font-medium py-2 ${getDifficultyBadgeClass(
                        session.difficulty
                      )}`}
                    >
                      {session.difficulty}
                    </span>
                  </div>
                  <div className='flex items-center gap-3 text-xs text-base-content/50'>
                    <span className='flex items-center gap-1'>
                      <div className='size-1.5 rounded-full bg-current' />
                      Host: {session.host?.name || 'Unknown'}
                    </span>
                    <span className='flex items-center gap-1'>
                      <Users className='size-3' />
                      {session.participant ? '2/2' : '1/2'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className='shrink-0'>
                {session.participant && !isUserInSession(session) ? (
                  <button
                    disabled
                    className='btn btn-sm btn-ghost gap-2 opacity-50'
                  >
                    <Lock className='size-3.5' />
                    Full
                  </button>
                ) : (
                  <Link
                    to={`/session/${session._id}`}
                    className={`btn btn-sm ${
                      isUserInSession(session) ? 'btn-neutral' : 'btn-primary'
                    } gap-2`}
                  >
                    {isUserInSession(session) ? 'Rejoin' : 'Join'}
                    <ArrowRight className='size-3.5' />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ActiveSessions
