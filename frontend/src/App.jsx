import { useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import ProblemsPage from './pages/ProblemsPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import SessionPage from './pages/SessionPage'
import ProblemPage from './pages/ProblemPage'

function App() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-base-100'>
        <span className='loading loading-spinner loading-lg text-primary'></span>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-100 text-base-content transition-colors duration-300'>
      <Routes>
        <Route
          path='/'
          element={
            !isSignedIn ? <HomePage /> : <Navigate to='/dashboard' replace />
          }
        />
        <Route path='/problems' element={<ProblemsPage />} />
        <Route path='/problem/:id' element={<ProblemPage />} />
        <Route
          path='/dashboard'
          element={isSignedIn ? <DashboardPage /> : <Navigate to='/' replace />}
        />
        <Route
          path='/session/:id'
          element={isSignedIn ? <SessionPage /> : <Navigate to='/' replace />}
        />
      </Routes>
      <Toaster theme='dark' position='top-center' />
    </div>
  )
}

export default App
