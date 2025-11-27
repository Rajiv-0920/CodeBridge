import { ArrowRight, Play, Terminal } from 'lucide-react'

const WelcomeSection = ({ onCreateSession, user }) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between gap-6 p-1'>
      <div className='space-y-2'>
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-200/50 border border-base-content/5 text-xs font-mono mb-2'>
          <span className='size-2 bg-success rounded-full animate-pulse'></span>
          System Online
        </div>
        <h1 className='text-3xl md:text-4xl font-black tracking-tight'>
          Welcome back, {user?.firstName}
        </h1>
        <p className='text-base-content/60 max-w-md'>
          Ready to collaborate? Join an active session or start a new room to
          challenge your peers.
        </p>
      </div>

      <button
        onClick={onCreateSession}
        className='group btn btn-primary btn-lg rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all'
      >
        <div className='p-1.5 bg-white/20 rounded-lg'>
          <Play className='size-4 fill-current' />
        </div>
        <span>Start New Session</span>
        <ArrowRight className='size-4 group-hover:translate-x-1 transition-transform' />
      </button>
    </div>
  )
}

export default WelcomeSection
