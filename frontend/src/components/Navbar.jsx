import { Link, NavLink } from 'react-router'
import { ArrowRight, Code2, Palette, Terminal } from 'lucide-react'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { THEMES } from '../data/themes'
import { useTheme } from '../context/themeContext'

const Navbar = () => {
  const { isSignedIn } = useUser()
  const { theme, setTheme } = useTheme()

  return (
    <nav className='fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1200px]'>
      <div className='bg-base-100/80 backdrop-blur-md border border-base-content/10 rounded-full px-6 py-3 shadow-lg'>
        <div className='flex items-center justify-between'>
          {/* LOGO */}
          <Link to='/' className='flex items-center gap-2 group'>
            <div className='size-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
              <Terminal className='size-5 text-primary' />
            </div>
            <span className='font-bold text-lg tracking-tight hidden sm:block'>
              CodeBridge
            </span>
          </Link>

          {/* CENTER NAV (Hidden on mobile) */}
          {isSignedIn && (
            <div className='hidden md:flex items-center gap-1 bg-base-200/50 p-1 rounded-full border border-base-content/5'>
              <NavLink
                to='/problems'
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-sm'
                      : 'hover:bg-base-200 hover:text-base-content'
                  }`
                }
              >
                Problems
              </NavLink>
              <NavLink
                to='/dashboard'
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-sm'
                      : 'hover:bg-base-200 hover:text-base-content'
                  }`
                }
              >
                Dashboard
              </NavLink>
            </div>
          )}

          {/* RIGHT ACTIONS */}
          <div className='flex items-center gap-4'>
            {/* THEME SELECTOR - REDESIGNED */}
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle btn-sm'
              >
                <Palette className='size-5 opacity-70' />
              </div>

              {/* 1. We keep 'dropdown-content' here for the open/close logic */}
              <div
                tabIndex={0}
                className='dropdown-content z-[1] mt-8 p-2 shadow-2xl bg-base-200 rounded-2xl w-64 border border-base-content/10 max-h-[60vh] overflow-y-auto'
              >
                {/* 2. We put the 'grid' inside. This prevents the "Ghost Click" bug. */}
                <div className='grid grid-cols-2 gap-2'>
                  {THEMES.map((t) => (
                    <button
                      key={t}
                      className={`btn btn-sm w-full justify-start text-xs ${
                        theme === t ? 'btn-primary' : 'btn-ghost'
                      }`}
                      onClick={(e) => {
                        setTheme(t)
                        // 3. This forces the dropdown to close after clicking
                        e.currentTarget.blur()
                        // Also blur the dropdown container to be safe
                        e.currentTarget.parentElement?.parentElement?.blur()
                      }}
                    >
                      <span
                        className={`size-2 rounded-full ${
                          theme === t ? 'bg-current' : 'bg-base-content/30'
                        }`}
                      ></span>
                      <span className='capitalize truncate'>{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {!isSignedIn ? (
              <SignInButton mode='modal'>
                <button className='btn btn-primary btn-sm rounded-full px-5'>
                  Sign In <ArrowRight className='size-4 ml-1' />
                </button>
              </SignInButton>
            ) : (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'size-9 border-2 border-base-200',
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
