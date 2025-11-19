import { StreamChat } from 'stream-chat'
import { StreamClient } from '@stream-io/node-sdk'

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

export let chatClient = null // Initialize as null
export let streamClient = null // Initialize as null

if (!apiKey || !apiSecret) {
  // If keys are missing, log the error and leave chatClient as null
  console.error(
    `STREAM_API_KEY or STREAM_API_SECRET is missing from .env. Stream Chat features will be disabled.`
  )
} else {
  // Only initialize the client if the keys are available
  streamClient = new StreamClient(apiKey, apiSecret)
  chatClient = StreamChat.getInstance(apiKey, apiSecret)
  console.log('Stream Client & Chat Client initialized.')
}

// All subsequent functions must check if chatClient is initialized

export const upsertStreamUser = async (userData) => {
  if (!chatClient) {
    console.error(
      `Stream Chat client not initialized. Cannot upsert user: ${userData.id}.`
    )
    return // Exit the function gracefully
  }

  try {
    await chatClient.upsertUser(userData)
    console.log(`Stream user upserted successfully: ${userData.id}`)
  } catch (error) {
    console.error(`Error upserting stream user: ${error}`)
  }
}

export const deleteStreamUser = async (userId) => {
  if (!chatClient) {
    console.error(
      `Stream Chat client not initialized. Cannot delete user: ${userId}.`
    )
    return // Exit the function gracefully
  }

  try {
    // You must pass an object for deleteUser
    await chatClient.deleteUser({ id: userId, mark_messages_deleted: true })
    console.log(`Stream user deleted successfully: ${userId}`)
  } catch (error) {
    console.error(`Error deleting stream user: ${error}`)
  }
}
