import { chatClient } from '../lib/stream.js'

export const getStreamToken = (req, res) => {
  try {
    // use clerkId for stream (not mongodb _id) => It should match the ID we have in the stream dashboard
    const token = chatClient.createToken(req.user.clerkId)

    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.image,
    })
  } catch (error) {
    console.error(
      `Error in getStreamToken in chatController.js middleware ${error.message}`
    )
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
