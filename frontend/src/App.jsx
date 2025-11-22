import { useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import ProblemsPage from './pages/ProblemsPage'
import HomePage from './pages/HomePage'

function App() {
  const { isSignedIn } = useUser()
  console.log(isSignedIn)
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/problems'
          element={isSignedIn ? <ProblemsPage /> : <Navigate to='/' />}
        />
      </Routes>
      <Toaster theme='dark' />
    </div>
  )
}

export default App
