import { Activity, History, Zap } from 'lucide-react'

const StatsCards = ({ activeSessionsCount, recentSessionsCount }) => {
  const stats = [
    {
      label: 'Active Rooms',
      value: activeSessionsCount,
      icon: Activity,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Total Sessions',
      value: recentSessionsCount,
      icon: History,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Streak', // Placeholder for future feature
      value: '3 Days',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
  ]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className='bg-base-100 border border-base-content/5 rounded-2xl p-5 flex items-center gap-4 hover:border-base-content/10 transition-colors shadow-sm'
        >
          <div className={`p-3 rounded-xl ${stat.bg}`}>
            <stat.icon className={`size-6 ${stat.color}`} />
          </div>
          <div>
            <p className='text-sm font-medium text-base-content/50 uppercase tracking-wider'>
              {stat.label}
            </p>
            <p className='text-2xl font-bold font-mono'>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
