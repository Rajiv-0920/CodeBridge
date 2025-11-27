import { Code2, Loader2, Plus, X, Laptop2 } from 'lucide-react'
import { PROBLEMS } from '../data/problems'
import { getDifficultyBadgeClass } from '../lib/utils'

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS)

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
      <div className='bg-base-100 rounded-3xl border border-base-content/10 shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200'>
        {/* HEADER */}
        <div className='p-6 border-b border-base-content/10 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-primary/10 rounded-xl'>
              <Laptop2 className='size-5 text-primary' />
            </div>
            <div>
              <h3 className='font-bold text-lg'>Deploy Session</h3>
              <p className='text-xs text-base-content/60'>
                Create a new coding environment
              </p>
            </div>
          </div>
          <button onClick={onClose} className='btn btn-sm btn-circle btn-ghost'>
            <X className='size-4' />
          </button>
        </div>

        {/* BODY */}
        <div className='p-6 space-y-6'>
          {/* PROBLEM SELECT */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-base-content/70'>
              Select Challenge
            </label>
            <select
              className='select select-bordered w-full bg-base-200/50 focus:border-primary font-medium'
              value={roomConfig.problem}
              onChange={(e) => {
                const p = problems.find((prob) => prob.title === e.target.value)
                if (p)
                  setRoomConfig({ problem: p.title, difficulty: p.difficulty })
              }}
            >
              <option value='' disabled>
                Choose a problem...
              </option>
              {problems.map((p) => (
                <option key={p.id} value={p.title}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* PREVIEW CARD */}
          {roomConfig.problem && (
            <div className='bg-base-200/50 p-4 rounded-xl border border-base-content/5 animate-in slide-in-from-top-2'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-xs font-bold text-base-content/50 uppercase tracking-wider'>
                  Selected
                </span>
                <span
                  className={`badge badge-sm font-bold ${getDifficultyBadgeClass(
                    roomConfig.difficulty
                  )}`}
                >
                  {roomConfig.difficulty}
                </span>
              </div>
              <div className='font-bold text-lg'>{roomConfig.problem}</div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className='p-6 border-t border-base-content/10 bg-base-100 flex justify-end gap-3'>
          <button onClick={onClose} className='btn btn-ghost'>
            Cancel
          </button>
          <button
            onClick={onCreateRoom}
            disabled={!roomConfig.problem || isCreating}
            className='btn btn-primary gap-2'
          >
            {isCreating ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <Plus className='size-4' />
            )}
            Create Session
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateSessionModal
