import { Link } from 'react-router'
import {
  Code2,
  Users,
  Zap,
  Terminal,
  Trophy,
  PlayCircle,
  Rocket,
  CheckCircle2,
  Cpu,
  Globe,
  ArrowRight,
} from 'lucide-react'
import { SignInButton, useUser } from '@clerk/clerk-react'
import Navbar from '../components/Navbar'

function HomePage() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) return null

  return (
    <div className='min-h-screen bg-base-100 relative'>
      {/* BACKGROUND DECORATION */}
      <div className='absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none' />
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none' />

      <Navbar />

      {/* HERO SECTION */}
      <section className='relative pt-40 pb-20 px-4'>
        <div className='max-w-5xl mx-auto text-center space-y-8 relative z-10'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-200 border border-base-content/10 text-sm animate-fade-in-up'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-success'></span>
            </span>
            Live Collaborative Coding
          </div>

          {/* Heading */}
          <h1 className='text-5xl md:text-7xl font-black tracking-tight leading-tight'>
            Built for <span className='text-primary'>Developers</span>, <br />
            Designed for{' '}
            <span className='bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent'>
              Excellence
            </span>
          </h1>

          <p className='text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed'>
            The ultimate platform to conduct technical interviews, practice
            coding problems, and collaborate in real-time with zero latency.
          </p>

          {/* Buttons */}
          <div className='flex flex-wrap items-center justify-center gap-4 pt-4'>
            {!isSignedIn ? (
              <SignInButton mode='modal'>
                <button className='btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform'>
                  Start Coding Free
                  <Rocket className='size-5' />
                </button>
              </SignInButton>
            ) : (
              <Link
                to='/dashboard'
                className='btn btn-primary btn-lg rounded-full px-8 hover:scale-105 transition-transform'
              >
                Go to Dashboard
                <Rocket className='size-5' />
              </Link>
            )}
            <button className='btn btn-ghost btn-lg rounded-full px-8 border border-base-content/10 hover:bg-base-200'>
              <PlayCircle className='size-5' />
              How it works
            </button>
          </div>

          {/* Hero Image Mockup with Glass Effect */}
          <div className='pt-16 relative mx-auto max-w-5xl'>
            <div className='mockup-browser bg-base-300 border border-base-content/10 shadow-2xl'>
              <div className='mockup-browser-toolbar'>
                <div className='input text-sm opacity-60'>
                  https://codebridge.dev/session/live
                </div>
              </div>
              <div className='bg-base-200 flex justify-center p-4 relative'>
                <div className='absolute inset-0 bg-gradient-to-t from-base-100 to-transparent z-10 h-20 bottom-0' />
                <img
                  src='/hero.png'
                  alt='Dashboard'
                  className='rounded-lg shadow-inner w-full opacity-90'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section className='py-24 px-4 bg-base-200/50 relative'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold mb-4'>
              More than just an editor
            </h2>
            <p className='text-base-content/60'>
              Powering the next generation of technical hiring.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]'>
            {/* Feature 1: Main Large Card */}
            <div className='col-span-1 md:col-span-2 row-span-2 bg-base-100 rounded-3xl p-8 border border-base-content/5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group'>
              <div className='absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity'>
                <Code2 className='size-48' />
              </div>
              <div className='h-full flex flex-col justify-between relative z-10'>
                <div className='bg-primary/10 w-fit p-3 rounded-2xl'>
                  <Terminal className='size-6 text-primary' />
                </div>
                <div>
                  <h3 className='text-2xl font-bold mb-2'>Polyglot Editor</h3>
                  <p className='text-base-content/70'>
                    Run code in 20+ languages instantly. Full syntax
                    highlighting, autocomplete, and vim mode support.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2: Tall Card */}
            <div className='col-span-1 row-span-2 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 border border-base-content/5 flex flex-col items-center text-center justify-center gap-6 group hover:border-primary/20 transition-all'>
              <div className='relative'>
                <div className='absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity' />
                <Zap className='size-16 text-primary relative z-10' />
              </div>
              <div>
                <h3 className='text-xl font-bold mb-2'>Zero Latency</h3>
                <p className='text-sm text-base-content/60'>
                  Real-time sync via WebSocket ensures you never miss a
                  keystroke.
                </p>
              </div>
            </div>

            {/* Feature 3: Standard Card */}
            <div className='col-span-1 bg-base-100 rounded-3xl p-6 border border-base-content/5 hover:-translate-y-1 transition-transform'>
              <Users className='size-8 text-secondary mb-4' />
              <h3 className='font-bold text-lg'>Multiplayer</h3>
              <p className='text-sm text-base-content/60 mt-2'>
                Collaborate with infinite users in a single room.
              </p>
            </div>

            {/* Feature 4: Standard Card */}
            <div className='col-span-1 bg-base-100 rounded-3xl p-6 border border-base-content/5 hover:-translate-y-1 transition-transform'>
              <Cpu className='size-8 text-accent mb-4' />
              <h3 className='font-bold text-lg'>AI Powered</h3>
              <p className='text-sm text-base-content/60 mt-2'>
                Integrated hints and edge-case generation.
              </p>
            </div>

            {/* Feature 5: Wide Card */}
            <div className='col-span-1 md:col-span-2 bg-base-100 rounded-3xl p-8 border border-base-content/5 flex items-center justify-between gap-8 hover:bg-base-200/50 transition-colors'>
              <div>
                <h3 className='text-xl font-bold mb-2'>
                  Global Infrastructure
                </h3>
                <p className='text-base-content/60'>
                  Servers distributed worldwide for minimal lag.
                </p>
              </div>
              <Globe className='size-16 text-base-content/10' />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / STATS STRIP */}
      <section className='py-20 border-t border-base-content/5'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-base-content/5'>
            {[
              { label: 'Developers', value: '10k+' },
              { label: 'Interviews Passed', value: '500+' },
              { label: 'Uptime', value: '99.99%' },
              { label: 'Languages', value: '25+' },
            ].map((stat) => (
              <div key={stat.label} className='p-4'>
                <div className='text-4xl font-black text-primary mb-2'>
                  {stat.value}
                </div>
                <div className='text-sm font-medium opacity-60 uppercase tracking-wider'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='relative bg-primary rounded-[2.5rem] overflow-hidden px-8 py-16 text-center shadow-2xl shadow-primary/30'>
            {/* Decor */}
            <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]' />

            <div className='relative z-10'>
              <h2 className='text-3xl md:text-5xl font-black text-primary-content mb-6'>
                Ready to land your dream job?
              </h2>
              <p className='text-primary-content/80 text-lg mb-8 max-w-xl mx-auto'>
                Join the community of developers mastering their craft with
                CodeBridge.
              </p>

              {!isSignedIn ? (
                <SignInButton mode='modal'>
                  <button className='btn btn-lg bg-base-100 text-base-content hover:bg-base-200 border-none rounded-full gap-2 px-8'>
                    Get Started Now
                    <ArrowRight className='size-5' />
                  </button>
                </SignInButton>
              ) : (
                <Link
                  to='/dashboard'
                  className='btn btn-lg bg-base-100 text-base-content hover:bg-base-200 border-none rounded-full gap-2 px-8'
                >
                  Resume Session
                  <ArrowRight className='size-5' />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className='py-8 text-center text-base-content/40 text-sm'>
        <p>© {new Date().getFullYear()} CodeBridge. Built for developers.</p>
      </footer>
    </div>
  )
}

export default HomePage
