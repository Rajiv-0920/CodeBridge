import { Link } from 'react-router'
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
  MoonIcon,
  SunIcon,
  PlayCircleIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  RocketIcon,
  LayoutDashboardIcon, // Added for the authenticated view
} from 'lucide-react'
import { SignInButton, useUser } from '@clerk/clerk-react'
import Navbar from '../components/Navbar'

const images = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
]

function HomePage() {
  const { isSignedIn, isLoaded } = useUser() // 1. Get auth state

  if (!isLoaded) return null

  return (
    <div className='min-h-screen bg-base-200 transition-colors duration-300'>
      {/* FLOATING NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <div className='pt-32 pb-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* LEFT CONTENT */}
            <div className='space-y-8'>
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20'>
                <div className='size-2 bg-primary rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-primary'>
                  Real-time Collaboration Platform
                </span>
              </div>

              <h1 className='text-6xl lg:text-7xl font-black leading-[1.1]'>
                <span className='inline-block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient'>
                  Code Together
                </span>
                <br />
                <span className='text-base-content'>Ace Interviews</span>
              </h1>

              <p className='text-xl text-base-content/70 leading-relaxed'>
                Transform your technical interviews with seamless video calls,
                real-time code collaboration, and multi-language support—all in
                one powerful platform.
              </p>

              {/* FEATURE TAGS */}
              <div className='flex flex-wrap gap-2'>
                {[
                  'Live Video',
                  'Code Editor',
                  '20+ Languages',
                  'Zero Setup',
                ].map((feature) => (
                  <div
                    key={feature}
                    className='badge badge-lg gap-2 bg-base-100 border-base-300'
                  >
                    <CheckIcon className='size-3 text-success' />
                    {feature}
                  </div>
                ))}
              </div>

              {/* 3. CONDITIONAL HERO BUTTONS */}
              <div className='flex flex-wrap gap-4 pt-4'>
                {!isSignedIn ? (
                  <SignInButton mode='modal'>
                    <button className='btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-primary/50'>
                      <RocketIcon className='size-5' />
                      Start Free Trial
                    </button>
                  </SignInButton>
                ) : (
                  <Link
                    to='/dashboard'
                    className='btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-primary/50'
                  >
                    <RocketIcon className='size-5' />
                    Go to Dashboard
                  </Link>
                )}

                <button className='btn btn-outline btn-lg gap-2'>
                  <PlayCircleIcon className='size-5' />
                  Watch Demo
                </button>
              </div>

              {/* TRUST INDICATORS */}
              <div className='flex items-center gap-6 pt-4'>
                <div className='flex -space-x-3'>
                  {images.map((img) => (
                    <div key={img} className='avatar placeholder'>
                      <div className='w-10 rounded-full bg-gradient-to-br from-primary to-secondary ring ring-base-100'>
                        <img src={img} alt='' />
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className='flex items-center gap-1'>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className='text-warning'>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className='text-sm text-base-content/60'>
                    Loved by 10,000+ developers
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE WITH DECORATIVE ELEMENTS */}
            <div className='relative'>
              <div className='absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl'></div>
              <div className='relative'>
                <img
                  src='/hero.png'
                  alt='Talent IQ Platform'
                  className='w-full h-auto rounded-2xl shadow-2xl border border-base-300'
                />
                {/* FLOATING STATS */}
                <div className='absolute -bottom-6 -left-6 bg-base-100 rounded-2xl shadow-xl p-4 border border-base-300'>
                  <div className='flex items-center gap-3'>
                    <div className='size-12 bg-success/10 rounded-xl flex items-center justify-center'>
                      <TrendingUpIcon className='size-6 text-success' />
                    </div>
                    <div>
                      <div className='text-2xl font-bold text-success'>
                        99.9%
                      </div>
                      <div className='text-xs text-base-content/60'>Uptime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className='py-16 px-4 bg-base-100'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {[
              { value: '10K+', label: 'Active Users', icon: UsersIcon },
              { value: '50K+', label: 'Sessions', icon: Code2Icon },
              { value: '20+', label: 'Languages', icon: ZapIcon },
              { value: '99.9%', label: 'Satisfaction', icon: ShieldCheckIcon },
            ].map((stat) => (
              <div key={stat.label} className='text-center group'>
                <div className='inline-flex items-center justify-center size-12 bg-primary/10 rounded-xl mb-3 group-hover:scale-110 transition-transform'>
                  <stat.icon className='size-6 text-primary' />
                </div>
                <div className='text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                  {stat.value}
                </div>
                <div className='text-sm text-base-content/60 mt-1'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className='py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <div className='inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4'>
              FEATURES
            </div>
            <h2 className='text-5xl font-bold mb-4'>
              Everything You Need to{' '}
              <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                Excel
              </span>
            </h2>
            <p className='text-lg text-base-content/70 max-w-2xl mx-auto'>
              Designed for developers, by developers. All the tools you need for
              successful technical interviews.
            </p>
          </div>

          {/* FEATURES GRID */}
          <div className='grid md:grid-cols-3 gap-6'>
            {[
              {
                icon: VideoIcon,
                title: 'HD Video Calls',
                description:
                  'Crystal clear video and audio with screen sharing capabilities for seamless communication.',
                color: 'primary',
              },
              {
                icon: Code2Icon,
                title: 'Live Code Editor',
                description:
                  'Real-time collaborative coding with syntax highlighting, autocomplete, and instant sync.',
                color: 'secondary',
              },
              {
                icon: UsersIcon,
                title: 'Team Collaboration',
                description:
                  'Multiple participants, shared cursors, and instant feedback for better learning.',
                color: 'accent',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className='group relative bg-base-100 rounded-2xl p-8 border border-base-300 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'
              >
                <div
                  className={`size-14 bg-${feature.color}/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`size-7 text-${feature.color}`} />
                </div>
                <h3 className='text-xl font-bold mb-3'>{feature.title}</h3>
                <p className='text-base-content/70 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 text-center overflow-hidden'>
            <div className='absolute inset-0 bg-grid-white/10'></div>
            <div className='relative z-10'>
              <h2 className='text-4xl font-bold text-white mb-4'>
                Ready to Transform Your Interviews?
              </h2>
              <p className='text-white/90 text-lg mb-8 max-w-2xl mx-auto'>
                Join thousands of developers who are already using Talent IQ to
                ace their technical interviews.
              </p>
              {/* 4. CONDITIONAL BOTTOM CTA */}
              {!isSignedIn ? (
                <SignInButton mode='modal'>
                  <button className='btn btn-lg bg-white text-primary hover:bg-base-100 border-0 gap-2 shadow-xl'>
                    <RocketIcon className='size-5' />
                    Get Started Free
                    <ArrowRightIcon className='size-5' />
                  </button>
                </SignInButton>
              ) : (
                <Link to='/dashboard'>
                  <button className='btn btn-lg bg-white text-primary hover:bg-base-100 border-0 gap-2 shadow-xl'>
                    <RocketIcon className='size-5' />
                    Start Interviewing
                    <ArrowRightIcon className='size-5' />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
