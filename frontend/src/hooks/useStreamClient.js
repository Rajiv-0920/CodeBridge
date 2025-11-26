import { useState, useEffect } from 'react'
import { StreamChat } from 'stream-chat'
import { toast } from 'sonner'
import { initializeStreamClient, disconnectStreamClient } from '../lib/stream'
import { sessionAPI } from '../api/sessions'

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null)
  const [call, setCall] = useState(null)
  const [chatClient, setChatClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [isInitializingCall, setIsInitializingCall] = useState(true)

  useEffect(() => {
    let videoCall = null
    let chatClientInstance = null
    let isCancelled = false

    const initCall = async () => {
      // Validation
      if (!session?.callId) {
        setIsInitializingCall(false)
        return
      }
      if (!isHost && !isParticipant) {
        setIsInitializingCall(false)
        return
      }
      if (session.status === 'completed') {
        setIsInitializingCall(false)
        return
      }

      // Validate environment variables
      const apiKey = import.meta.env.VITE_STREAM_API_KEY
      if (!apiKey) {
        console.error('VITE_STREAM_API_KEY is not defined')
        toast.error('Stream configuration error')
        setIsInitializingCall(false)
        return
      }

      try {
        // Get token from backend
        const { token, userId, userName, userImage } =
          await sessionAPI.getStreamToken()

        if (isCancelled) return

        // Validate token response
        if (!token || !userId) {
          throw new Error('Invalid token response from server')
        }

        console.log('Initializing Stream with userId:', userId)

        // Initialize video client
        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        )

        if (isCancelled) {
          await client.disconnectUser()
          return
        }

        setStreamClient(client)

        // Join video call
        videoCall = client.call('default', session.callId)
        await videoCall.join({ create: true })

        if (isCancelled) {
          await videoCall.leave()
          return
        }

        setCall(videoCall)
        console.log('Video call joined successfully')

        // Initialize chat client
        chatClientInstance = StreamChat.getInstance(apiKey)
        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        )

        if (isCancelled) {
          await chatClientInstance.disconnectUser()
          return
        }

        setChatClient(chatClientInstance)

        // Join chat channel
        const chatChannel = chatClientInstance.channel(
          'messaging',
          session.callId,
          {
            name: `Session ${session.callId}`,
          }
        )
        await chatChannel.watch()

        if (isCancelled) return

        setChannel(chatChannel)
        console.log('Chat channel initialized successfully')
      } catch (error) {
        if (!isCancelled) {
          console.error('Error initializing Stream:', error)

          // More specific error messages
          if (
            error.message?.includes('AccessKeyError') ||
            error.message?.includes('initial WS connection')
          ) {
            toast.error(
              'Authentication failed. Please check your Stream credentials.'
            )
          } else if (error.message?.includes('token')) {
            toast.error('Invalid authentication token. Please try again.')
          } else {
            toast.error('Failed to join video call')
          }
        }
      } finally {
        if (!isCancelled) {
          setIsInitializingCall(false)
        }
      }
    }

    if (session && !loadingSession) {
      initCall()
    } else {
      setIsInitializingCall(false)
    }

    // Cleanup
    return () => {
      isCancelled = true

      // Reset states
      setStreamClient(null)
      setCall(null)
      setChatClient(null)
      setChannel(null)

      // Async cleanup
      Promise.all([
        videoCall
          ?.leave()
          .catch((e) => console.error('Error leaving call:', e)),
        chatClientInstance
          ?.disconnectUser()
          .catch((e) => console.error('Error disconnecting chat:', e)),
        disconnectStreamClient().catch((e) =>
          console.error('Error disconnecting stream:', e)
        ),
      ]).catch((error) => {
        console.error('Cleanup error:', error)
      })
    }
  }, [session?.callId, session?.status, loadingSession, isHost, isParticipant])

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  }
}

export default useStreamClient
