import React from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react'
import { Link } from 'react-router'
import { toast } from 'sonner'

const HomePage = () => {
  return (
    <div>
      <Link to={'/problems'}>Go to Problems</Link>
      <button onClick={() => toast.success('Toast')}>Render Toast</button>;
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default HomePage
