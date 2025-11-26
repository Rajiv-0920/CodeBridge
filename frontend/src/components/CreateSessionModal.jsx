import { Code2Icon, LoaderIcon, PlusIcon, XIcon, Wand2Icon } from 'lucide-react'
import { PROBLEMS } from '../data/problems'

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
    <div className='modal modal-open modal-bottom sm:modal-middle backdrop-blur-sm'>
      <div className='modal-box relative border border-base-content/10 shadow-2xl overflow-visible'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
        >
          <XIcon className='w-4 h-4' />
        </button>

        {/* Header */}
        <div className='flex items-center gap-3 mb-6'>
          <div className='p-3 bg-primary/10 rounded-xl'>
            <Wand2Icon className='w-6 h-6 text-primary' />
          </div>
          <div>
            <h3 className='font-bold text-xl'>Create Session</h3>
            <p className='text-xs text-base-content/60'>
              Configure your coding room
            </p>
          </div>
        </div>

        <div className='space-y-6'>
          {/* PROBLEM SELECTION */}
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>Select Problem</span>
              <span className='label-text-alt text-base-content/50'>
                Required
              </span>
            </label>

            <select
              className='select select-bordered w-full h-12 text-base focus:border-primary focus:ring-2 ring-primary/20 transition-all'
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find(
                  (p) => p.title === e.target.value
                )
                if (!selectedProblem) return
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                })
              }}
            >
              <option value='' disabled>
                Select a challenge...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} &mdash; {problem.difficulty}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              roomConfig.problem ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className='bg-base-200/50 rounded-xl p-4 border border-base-300'>
              <div className='flex items-start gap-3'>
                <div className='mt-1'>
                  <Code2Icon className='size-5 text-primary' />
                </div>
                <div className='flex-1 space-y-2'>
                  <h4 className='font-semibold text-sm uppercase tracking-wider text-base-content/60'>
                    Room Preview
                  </h4>
                  <div className='flex justify-between text-sm'>
                    <span>Problem:</span>
                    <span className='font-bold'>{roomConfig.problem}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Difficulty:</span>
                    <span
                      className={`badge badge-sm uppercase ${
                        roomConfig.difficulty === 'hard'
                          ? 'badge-error'
                          : roomConfig.difficulty === 'medium'
                          ? 'badge-warning'
                          : 'badge-success'
                      }`}
                    >
                      {roomConfig.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='modal-action pt-4'>
          <button className='btn btn-ghost' onClick={onClose}>
            Cancel
          </button>

          <button
            className='btn btn-primary px-8 min-w-[140px]'
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <>
                <LoaderIcon className='size-4 animate-spin' />
                Creating...
              </>
            ) : (
              <>
                <PlusIcon className='size-4' />
                Create Room
              </>
            )}
          </button>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button onClick={onClose}>close</button>
      </form>
    </div>
  )
}
export default CreateSessionModal
