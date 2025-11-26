import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  GlobeIcon,
  LoaderIcon,
  TimerIcon,
  UsersIcon,
} from 'lucide-react'
import { Link } from 'react-router'
import { getDifficultyBadgeClass } from '../lib/utils'

const ActiveSessions = ({ sessions, isLoading, isUserInSession }) => {
  return (
    <div className='lg:col-span-2 card bg-base-100 shadow-xl border border-base-200'>
      <div className='card-body p-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <div className='p-2.5 bg-error/10 rounded-xl'>
              <GlobeIcon className='size-5 text-error animate-pulse' />
            </div>
            <div>
              <h2 className='text-lg font-bold'>Live Sessions</h2>
              <p className='text-xs text-base-content/50'>
                Join a room to start coding
              </p>
            </div>
          </div>

          <div className='badge badge-neutral gap-2 py-3 px-4'>
            <div className='size-2 bg-success rounded-full animate-pulse' />
            <span className='font-mono font-bold'>
              {sessions.length} Online
            </span>
          </div>
        </div>

        {/* List */}
        <div className='space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2'>
          {isLoading ? (
            <div className='flex flex-col items-center justify-center py-20 gap-4'>
              <LoaderIcon className='size-10 animate-spin text-primary' />
              <p className='text-sm text-base-content/50 animate-pulse'>
                Looking for active rooms...
              </p>
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className='group relative card bg-base-200/50 hover:bg-base-200 border border-base-300 hover:border-primary/30 transition-all duration-300'
              >
                <div className='card-body p-5 flex flex-row items-center justify-between gap-6'>
                  {/* Info Section */}
                  <div className='flex items-center gap-5 overflow-hidden'>
                    <div className='relative flex-shrink-0'>
                      <div className='w-14 h-14 rounded-2xl bg-base-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow'>
                        <Code2Icon className='size-7 text-primary' />
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-base-200 ${
                          session.participant ? 'bg-error' : 'bg-success'
                        }`}
                      />
                    </div>

                    <div className='flex-1 min-w-0 space-y-1.5'>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-bold text-lg truncate group-hover:text-primary transition-colors'>
                          {session.problem}
                        </h3>
                        <span
                          className={`badge badge-sm font-medium ${getDifficultyBadgeClass(
                            session.difficulty
                          )}`}
                        >
                          {session.difficulty}
                        </span>
                      </div>

                      <div className='flex items-center gap-4 text-xs font-medium text-base-content/60'>
                        <div className='flex items-center gap-1.5'>
                          <CrownIcon className='size-3.5 text-warning' />
                          <span>{session.host?.name}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <UsersIcon className='size-3.5' />
                          <span>{session.participant ? '2/2' : '1/2'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className='flex-shrink-0'>
                    {session.participant && !isUserInSession(session) ? (
                      <div className='px-4 py-2 rounded-xl bg-base-300 text-base-content/50 text-sm font-bold flex items-center gap-2 cursor-not-allowed'>
                        <span>Full</span>
                      </div>
                    ) : (
                      <Link
                        to={`/session/${session._id}`}
                        className={`btn btn-sm ${
                          isUserInSession(session)
                            ? 'btn-secondary'
                            : 'btn-primary'
                        } gap-2 px-6 rounded-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40`}
                      >
                        {isUserInSession(session) ? 'Rejoin' : 'Join'}
                        <ArrowRightIcon className='size-4 group-hover:translate-x-0.5 transition-transform' />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-base-300 rounded-3xl bg-base-100/50'>
              <div className='w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mb-4'>
                <TimerIcon className='w-8 h-8 text-base-content/30' />
              </div>
              <h3 className='text-lg font-bold text-base-content/80'>
                No active sessions
              </h3>
              <p className='text-sm text-base-content/50 max-w-xs mt-1'>
                There are no public coding rooms open right now. Be the first to
                start one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ActiveSessions
