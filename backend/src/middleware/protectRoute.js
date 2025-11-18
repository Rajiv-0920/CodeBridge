import { getAuth } from '@clerk/express'
import User from '../models/User.js'

/**
 * Middleware function to protect routes and attach the full database User object
 * to the request if the user is authenticated via Clerk.
 */
export const protectRoute = async (req, res, next) => {
  try {
    // 1. Retrieve the Clerk authentication state attached by the global clerkMiddleware.
    const auth = getAuth(req)
    const clerkId = auth.userId

    // 2. Check if the Clerk session is valid (i.e., if a userId is present).
    if (!clerkId) {
      // If no ID, the user is not authenticated. Block access.
      return res.status(401).json({ message: 'Unauthorized - Invalid token' })
    }

    // 3. Find the corresponding user in the local database using the Clerk ID.
    const user = await User.findOne({ clerkId })
    if (!user) {
      // If the authenticated user (via Clerk) doesn't exist in the database.
      return res.status(404).json({ message: 'User not found' })
    }

    // 4. Attach the full User document from the database to the request object.
    // This allows subsequent route handlers to easily access req.user.
    req.user = user

    // 5. Authentication and authorization checks passed; proceed to the next handler/route.
    return next()
  } catch (error) {
    // Handle any unexpected errors (e.g., database connection issues).
    console.error('Error in protectRoute.js middleware', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
