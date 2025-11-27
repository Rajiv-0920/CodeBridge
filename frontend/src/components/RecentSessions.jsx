import { Link } from 'react-router'
import { Clock, CheckCircle2, Calendar, ArrowRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { getDifficultyBadgeClass } from '../lib/utils'

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className='bg-base-100 border border-base-content/5 rounded-3xl overflow-hidden flex flex-col h-full shadow-sm'>
      <div className='p-6 border-b border-base-content/5 flex items-center gap-3'>
        <div className='p-2 bg-secondary/10 rounded-lg'>
          <Clock className='size-5 text-secondary' />
        </div>
        <h2 className='font-bold text-lg'>History</h2>
      </div>

      <div className='flex-1 p-4 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar'>
        {isLoading ? (
          <div className='flex justify-center py-10'>
            <span className='loading loading-spinner text-secondary'></span>
          </div>
        ) : sessions.length === 0 ? (
          <div className='text-center py-10 opacity-50'>
            <p>No recent activity.</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session._id}
              className='relative p-4 rounded-xl bg-base-200/30 border border-base-content/5 hover:bg-base-200/80 transition-colors'
            >
              <div className='flex items-start justify-between mb-2'>
                <div className='flex flex-col'>
                  <h3 className='font-bold text-sm line-clamp-1'>
                    {session.problem}
                  </h3>
                  <span className='text-xs text-base-content/50 flex items-center gap-1 mt-1'>
                    <Calendar className='size-3' />
                    {formatDistanceToNow(new Date(session.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div
                  className={`badge badge-xs font-mono py-2 ${getDifficultyBadgeClass(
                    session.difficulty
                  )}`}
                >
                  {session.difficulty}
                </div>
              </div>

              <div className='flex items-center justify-between mt-3 pt-3 border-t border-base-content/5'>
                <div className='flex items-center gap-2 text-xs'>
                  {session.status === 'completed' ? (
                    <span className='text-emerald-500 flex items-center gap-1'>
                      <CheckCircle2 className='size-3' /> Completed
                    </span>
                  ) : (
                    <span className='text-base-content/50'>In Progress</span>
                  )}
                </div>

                {session.status === 'active' && (
                  <Link
                    to={`/session/${session._id}`}
                    className='text-xs font-bold text-primary hover:underline flex items-center gap-1'
                  >
                    Resume <ArrowRight className='size-3' />
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

export default RecentSessions
