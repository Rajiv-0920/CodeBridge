import { Code2, Clock, Users, Calendar, Loader, ArrowRight } from 'lucide-react'
import { getDifficultyBadgeClass } from '../lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router'

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-base-200 rounded-lg'>
            <Clock className='w-5 h-5 text-base-content/70' />
          </div>
          <h2 className='text-2xl font-bold'>History</h2>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {isLoading ? (
          <div className='col-span-full flex flex-col items-center justify-center py-20'>
            <Loader className='w-10 h-10 animate-spin text-primary' />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className='card bg-base-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 border border-base-200 hover:border-primary/20 transition-all duration-300 group'
            >
              <div className='card-body p-5'>
                {/* Status Badge */}
                <div className='flex items-start justify-between mb-4'>
                  <div
                    className={`badge ${
                      session.status === 'active'
                        ? 'badge-success badge-outline'
                        : 'badge-neutral badge-outline'
                    }`}
                  >
                    {session.status === 'active' ? 'In Progress' : 'Completed'}
                  </div>
                  {session.status === 'active' && (
                    <div className='w-2 h-2 rounded-full bg-success animate-pulse' />
                  )}
                </div>

                <div className='flex items-center gap-3 mb-2'>
                  <div className='p-2 bg-base-200 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors'>
                    <Code2 className='w-5 h-5' />
                  </div>
                  <h3 className='font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors'>
                    {session.problem}
                  </h3>
                </div>

                <div className='flex flex-wrap gap-2 mb-4'>
                  <span
                    className={`badge badge-sm ${getDifficultyBadgeClass(
                      session.difficulty
                    )}`}
                  >
                    {session.difficulty}
                  </span>
                  <div className='flex items-center gap-1 text-xs text-base-content/60 bg-base-200 px-2 py-1 rounded-full'>
                    <Users className='w-3 h-3' />
                    {session.participant ? '2' : '1'} Devs
                  </div>
                </div>

                <div className='flex items-center justify-between pt-4 border-t border-base-200 mt-auto'>
                  <div className='flex items-center gap-1.5 text-xs text-base-content/50 font-medium'>
                    <Calendar className='w-3.5 h-3.5' />
                    <span>
                      {formatDistanceToNow(new Date(session.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  {session.status === 'active' && (
                    <Link
                      to={`/session/${session._id}`}
                      className='btn btn-xs btn-ghost gap-1'
                    >
                      Join
                      <ArrowRight className='w-3 h-3' />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-full card bg-base-100 border border-dashed border-base-300 p-12 flex flex-col items-center justify-center text-center'>
            <div className='w-20 h-20 bg-base-200/50 rounded-full flex items-center justify-center mb-4'>
              <Clock className='w-10 h-10 text-base-content/20' />
            </div>
            <h3 className='text-lg font-bold opacity-70'>No session history</h3>
            <p className='text-sm opacity-50 max-w-sm mt-1'>
              Your recent coding sessions will appear here once you start
              solving problems.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentSessions
