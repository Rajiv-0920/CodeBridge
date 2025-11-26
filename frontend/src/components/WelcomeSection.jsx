import { useUser } from '@clerk/clerk-react'
import { ArrowRightIcon, Code2Icon, SparklesIcon, ZapIcon } from 'lucide-react'

const WelcomeSection = ({ onCreateSession }) => {
  const { user } = useUser()

  return (
    <div className='relative pt-24 pb-12 overflow-hidden'>
      {/* Background glow effects */}
      <div className='absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse' />
      <div className='absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700' />

      <div className='relative max-w-7xl mx-auto px-6'>
        <div className='card bg-base-100/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden'>
          <div className='card-body p-10 relative'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-8'>
              {/* Text Content */}
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-3 bg-gradient-to-br from-primary to-primary-focus rounded-xl shadow-lg shadow-primary/30'>
                    <Code2Icon className='w-8 h-8 text-white' />
                  </div>
                  <div className='badge badge-primary badge-outline font-bold'>
                    Beta v1.0
                  </div>
                </div>

                <h1 className='text-4xl md:text-5xl font-black text-base-content tracking-tight'>
                  Hello,{' '}
                  <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-x'>
                    {user?.firstName || 'Coder'}
                  </span>
                  <span className='ml-2 inline-block animate-wave'>👋</span>
                </h1>

                <p className='text-xl text-base-content/70 max-w-lg leading-relaxed'>
                  Ready to solve some problems? Start a collaborative coding
                  session and invite a friend.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={onCreateSession}
                className='group relative px-8 py-4 bg-base-content text-base-100 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300'
              >
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity' />
                <div className='flex items-center gap-3'>
                  <div className='p-1 bg-base-100/10 rounded-lg'>
                    <ZapIcon className='w-5 h-5' />
                  </div>
                  <span>Start Coding</span>
                  <ArrowRightIcon className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeSection
