import { Link, NavLink } from 'react-router'
import {
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  BookOpenText,
  Palette,
} from 'lucide-react'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { THEMES } from '../data/themes'
import { useTheme } from '../context/themeContext'

const Logo = () => {
  return (
    <Link to={'/'} className='flex items-center gap-3 group'>
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity'></div>
        <div className='relative size-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center'>
          <Sparkles className='size-6 text-white' />
        </div>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
          CodeBridge
        </span>
        <span className='text-xs text-base-content/60 -mt-0.5'>
          Code. Connect. Conquer.
        </span>
      </div>
    </Link>
  )
}

const Navbar = () => {
  const { isSignedIn } = useUser()
  // const { theme, setTheme } = useTheme()
  const { theme, setTheme } = useTheme()
  console.log(theme)

  return (
    <nav className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl'>
      <div className='bg-base-100/70 backdrop-blur-xl rounded-2xl border border-base-300 shadow-2xl'>
        <div className='px-6 py-4 flex items-center justify-between'>
          {/* LOGO */}
          <Logo />

          {/* NAV ACTIONS */}
          <div className='flex items-center gap-3'>
            {/* THEME DROPDOWN */}
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle btn-sm'
              >
                <Palette className='size-5' />
              </div>
              <ul
                tabIndex={0}
                className='dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 max-h-96 overflow-y-auto'
              >
                {THEMES.map((t) => (
                  <li key={t}>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg hover:bg-base-100 ${
                        theme === t ? 'bg-primary text-primary-content' : ''
                      }`}
                      onClick={() => setTheme(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONDITIONAL NAVBAR BUTTONS */}
            {!isSignedIn ? (
              <SignInButton mode='modal'>
                <button className='btn btn-primary btn-sm gap-2'>
                  Get Started
                  <ArrowRight className='size-4' />
                </button>
              </SignInButton>
            ) : (
              <>
                <NavLink
                  to='/problems'
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-primary text-primary-content'
                        : 'hover:bg-base-200 text-base-content/70 hover:text-base-content'
                    }`
                  }
                >
                  <div className='flex items-center gax-x-2 5'>
                    <span className='font-medium hidden sm:inline pr-3'>
                      Problems
                    </span>
                    <BookOpenText className='size-4' />
                  </div>
                </NavLink>

                <NavLink
                  to='/dashboard'
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-primary text-primary-content'
                        : 'hover:bg-base-200 text-base-content/70 hover:text-base-content'
                    }`
                  }
                >
                  <div className='flex items-center gax-x-2 5'>
                    <span className='font-medium hidden sm:inline pr-3'>
                      Dashboard
                    </span>
                    <LayoutDashboard className='size-4' />
                  </div>
                </NavLink>

                {/* CLERK USER PROFILE BUTTON */}
                <div className='ml-2 flex items-center'>
                  <UserButton />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
