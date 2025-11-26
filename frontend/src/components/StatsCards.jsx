import { TrophyIcon, UsersIcon, ActivityIcon } from 'lucide-react'

const StatsCards = ({ activeSessionsCount, recentSessionsCount }) => {
  return (
    <div className='lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6'>
      {/* Active Count Card */}
      <div className='card bg-base-100 shadow-xl shadow-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1'>
        <div className='card-body relative overflow-hidden'>
          {/* Decorative background icon */}
          <ActivityIcon className='absolute -right-4 -bottom-4 w-32 h-32 text-primary/5 rotate-12' />

          <div className='flex items-start justify-between'>
            <div>
              <p className='text-sm font-medium text-base-content/60 mb-1'>
                Live Now
              </p>
              <h3 className='text-4xl font-black text-base-content'>
                {activeSessionsCount}
              </h3>
            </div>
            <div className='p-3 bg-primary/10 rounded-xl text-primary'>
              <UsersIcon className='w-6 h-6' />
            </div>
          </div>

          <div className='mt-4 flex items-center gap-2'>
            <span className='relative flex h-3 w-3'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
              <span className='relative inline-flex rounded-full h-3 w-3 bg-primary'></span>
            </span>
            <span className='text-xs font-semibold text-primary'>
              Active Sessions
            </span>
          </div>
        </div>
      </div>

      {/* Total Sessions Card */}
      <div className='card bg-base-100 shadow-xl shadow-secondary/5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1'>
        <div className='card-body relative overflow-hidden'>
          <TrophyIcon className='absolute -right-4 -bottom-4 w-32 h-32 text-secondary/5 rotate-12' />

          <div className='flex items-start justify-between'>
            <div>
              <p className='text-sm font-medium text-base-content/60 mb-1'>
                Total Sessions
              </p>
              <h3 className='text-4xl font-black text-base-content'>
                {recentSessionsCount}
              </h3>
            </div>
            <div className='p-3 bg-secondary/10 rounded-xl text-secondary'>
              <TrophyIcon className='w-6 h-6' />
            </div>
          </div>

          <div className='mt-4 flex items-center gap-2'>
            <div className='badge badge-secondary badge-sm badge-outline'>
              Lifetime
            </div>
            <span className='text-xs text-base-content/50'>Keep grinding!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsCards
