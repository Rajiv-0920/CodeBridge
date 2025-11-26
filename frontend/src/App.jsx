import { useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import ProblemsPage from './pages/ProblemsPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import SessionPage from './pages/SessionPage'
import ProblemPage from './pages/ProblemPage'

function App() {
  const { isSignedIn } = useUser()
  return (
    <div>
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
      <Toaster theme='dark' />
    </div>
  )
}

export default App
