import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
  ParticipantView,
} from '@stream-io/video-react-sdk'
import {
  Loader2,
  MessageSquare,
  Users,
  X,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react'

import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'stream-chat-react/dist/css/v2/index.css'

/* Custom Call Controls 
   (Because the default Stream ones might not match our theme perfectly)
*/
const CustomCallControls = ({ onLeave }) => {
  const call = useCall()
  const { useMicrophoneState, useCameraState, useScreenShareState } =
    useCallStateHooks()

  const { microphone, isMute: isMicMuted } = useMicrophoneState()
  const { camera, isMute: isCamMuted } = useCameraState()
  const { isScreenSharing, toggleScreenShare } = useScreenShareState()

  return (
    <div className='flex items-center justify-center gap-2 p-3 bg-base-100/90 backdrop-blur border-t border-base-content/10'>
      <button
        onClick={() => microphone.toggle()}
        className={`btn btn-circle btn-sm ${
          isMicMuted ? 'btn-error' : 'btn-ghost bg-base-300'
        }`}
      >
        {isMicMuted ? (
          <MicOff className='size-4' />
        ) : (
          <Mic className='size-4' />
        )}
      </button>

      <button
        onClick={() => camera.toggle()}
        className={`btn btn-circle btn-sm ${
          isCamMuted ? 'btn-error' : 'btn-ghost bg-base-300'
        }`}
      >
        {isCamMuted ? (
          <VideoOff className='size-4' />
        ) : (
          <Video className='size-4' />
        )}
      </button>

      {/* Screen Share (Optional - remove if not needed) */}
      {/* <button 
            onClick={() => toggleScreenShare()}
            className={`btn btn-circle btn-sm ${isScreenSharing ? 'btn-success' : 'btn-ghost bg-base-300'}`}
        >
            <MonitorUp className="size-4" />
        </button> 
        */}

      <button
        onClick={onLeave}
        className='btn btn-circle btn-sm btn-error ml-2'
      >
        <PhoneOff className='size-4' />
      </button>
    </div>
  )
}

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate()
  const { useCallCallingState, useParticipantCount } = useCallStateHooks()
  const callingState = useCallCallingState()
  const participantCount = useParticipantCount()
  const [activeTab, setActiveTab] = useState('video') // 'video' | 'chat'

  // If we are still joining
  if (callingState === CallingState.JOINING) {
    return (
      <div className='h-full flex flex-col items-center justify-center bg-base-200'>
        <Loader2 className='size-10 animate-spin text-primary mb-2' />
        <p className='text-sm text-base-content/60'>Joining call...</p>
      </div>
    )
  }

  return (
    <div className='h-full flex flex-col bg-base-200 relative overflow-hidden'>
      {/* TABS HEADER */}
      <div className='flex items-center justify-between p-2 bg-base-100 border-b border-base-content/10'>
        <div className='join w-full grid grid-cols-2'>
          <button
            className={`join-item btn btn-sm ${
              activeTab === 'video' ? 'btn-neutral' : 'btn-ghost'
            }`}
            onClick={() => setActiveTab('video')}
          >
            <Users className='size-4 mr-2' />
            Video ({participantCount})
          </button>
          <button
            className={`join-item btn btn-sm ${
              activeTab === 'chat' ? 'btn-neutral' : 'btn-ghost'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare className='size-4 mr-2' />
            Chat
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className='flex-1 overflow-hidden relative'>
        {/* VIDEO LAYER */}
        <div
          className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${
            activeTab === 'video' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className='flex-1 p-2 overflow-y-auto custom-scrollbar'>
            {/* Stream's Layout Manager */}
            <SpeakerLayout participantsBarPosition='bottom' />
          </div>
          <CustomCallControls onLeave={() => navigate('/dashboard')} />
        </div>

        {/* CHAT LAYER */}
        {chatClient && channel && (
          <div
            className={`absolute inset-0 bg-base-100 flex flex-col transition-opacity duration-300 ${
              activeTab === 'chat'
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className='flex-1 overflow-hidden stream-chat-dark-custom'>
              <Chat client={chatClient} theme='str-chat__theme-dark'>
                <Channel channel={channel}>
                  <Window>
                    <MessageList />
                    <MessageInput />
                  </Window>
                </Channel>
              </Chat>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoCallUI
