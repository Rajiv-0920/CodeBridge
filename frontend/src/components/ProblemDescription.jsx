import { useState, useMemo } from 'react'
import {
  ChevronDown,
  Copy,
  Check,
  AlignLeft,
  Terminal,
  AlertTriangle,
  Layers,
} from 'lucide-react'
import { getDifficultyBadgeClass } from '../lib/utils'

function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    examples: true,
    constraints: true,
  })
  const [copiedExample, setCopiedExample] = useState(null)

  const sortedProblems = useMemo(() => {
    if (!allProblems) return []
    return [...allProblems].sort((a, b) => {
      const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    })
  }, [allProblems])

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const copyExample = (idx) => {
    setCopiedExample(idx)
    const text = `Input: ${problem.examples[idx].input}\nOutput: ${problem.examples[idx].output}`
    navigator.clipboard.writeText(text)
    setTimeout(() => setCopiedExample(null), 2000)
  }

  return (
    <div className='h-screen overflow-y-auto bg-base-200 custom-scrollbar'>
      {/* Sticky Header */}
      <div className='sticky top-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-base-300 pb-4 pt-6 px-6'>
        <div className='flex flex-col gap-4'>
          {/* Top Row: Title & Metadata */}
          <div className='flex items-start justify-between gap-4'>
            <div>
              <div className='flex items-center gap-2 text-xs font-bold text-base-content/50 uppercase tracking-wider mb-2'>
                <Layers className='size-3' />
                <span>{problem.category}</span>
              </div>
              <h1 className='text-2xl font-bold text-base-content leading-tight'>
                {problem.title}
              </h1>
            </div>

            <div className='flex flex-col items-end gap-2'>
              <span
                className={`badge badge-lg font-semibold ${getDifficultyBadgeClass(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </span>
            </div>
          </div>

          {/* Bottom Row: Selector */}
          <select
            className='select select-bordered select-sm w-full max-w-full font-medium focus:outline-none focus:border-primary'
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {sortedProblems.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className='p-6 space-y-4 max-w-4xl mx-auto'>
        {/* 1. Description Section (DaisyUI Collapse) */}
        <div
          className={`collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm ${
            expandedSections.description ? 'collapse-open' : 'collapse-close'
          }`}
        >
          <div
            className='collapse-title text-lg font-medium flex items-center gap-3 cursor-pointer hover:bg-base-200/50 transition-colors'
            onClick={() => toggleSection('description')}
          >
            <AlignLeft className='size-5 text-primary' />
            <span>Description</span>
          </div>
          <div className='collapse-content'>
            <div className='prose prose-sm max-w-none text-base-content/90 pt-2'>
              <p>{problem.description.text}</p>

              {problem.description.notes?.length > 0 && (
                <div className='not-prose mt-4 flex flex-col gap-2'>
                  {problem.description.notes.map((note, idx) => (
                    <div
                      key={idx}
                      className='alert alert-info py-2 rounded-lg text-sm shadow-none bg-info/10 text-base-content border-info/20'
                    >
                      <span className='italic'>{note}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Examples Section */}
        <div
          className={`collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm ${
            expandedSections.examples ? 'collapse-open' : 'collapse-close'
          }`}
        >
          <div
            className='collapse-title text-lg font-medium flex items-center gap-3 cursor-pointer hover:bg-base-200/50 transition-colors'
            onClick={() => toggleSection('examples')}
          >
            <div className='indicator'>
              <span className='indicator-item badge badge-secondary badge-xs scale-75'></span>
              <Terminal className='size-5 text-secondary' />
            </div>
            <span>Examples</span>
          </div>

          <div className='collapse-content'>
            <div className='space-y-4 pt-2'>
              {problem.examples.map((example, idx) => (
                <div
                  key={idx}
                  className='card bg-base-200/60 border border-base-300 rounded-xl overflow-hidden'
                >
                  {/* Example Header */}
                  <div className='flex items-center justify-between px-4 py-2 bg-base-200 border-b border-base-300/50'>
                    <span className='text-xs font-bold text-base-content/60 uppercase tracking-wider'>
                      Case {idx + 1}
                    </span>
                    <button
                      className='btn btn-ghost btn-xs btn-square text-base-content/50 hover:text-primary'
                      onClick={() => copyExample(idx)}
                      title='Copy Input/Output'
                    >
                      {copiedExample === idx ? (
                        <Check className='size-3.5' />
                      ) : (
                        <Copy className='size-3.5' />
                      )}
                    </button>
                  </div>

                  {/* Example Body */}
                  <div className='p-4 space-y-3 font-mono text-sm'>
                    <div className='flex gap-4'>
                      <span className='text-base-content/50 select-none w-12'>
                        In:
                      </span>
                      <span className='text-base-content break-all bg-base-100 px-2 rounded border border-base-300/50'>
                        {example.input}
                      </span>
                    </div>
                    <div className='flex gap-4'>
                      <span className='text-base-content/50 select-none w-12'>
                        Out:
                      </span>
                      <span className='text-base-content break-all bg-base-100 px-2 rounded border border-base-300/50'>
                        {example.output}
                      </span>
                    </div>
                    {example.explanation && (
                      <div className='pt-2 mt-1 border-t border-base-content/5 text-base-content/70 text-xs font-sans italic flex gap-2'>
                        <span className='font-bold not-italic text-base-content/40'>
                          Note:
                        </span>
                        {example.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Constraints Section */}
        <div
          className={`collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm ${
            expandedSections.constraints ? 'collapse-open' : 'collapse-close'
          }`}
        >
          <div
            className='collapse-title text-lg font-medium flex items-center gap-3 cursor-pointer hover:bg-base-200/50 transition-colors'
            onClick={() => toggleSection('constraints')}
          >
            <AlertTriangle className='size-5 text-warning' />
            <span>Constraints</span>
          </div>
          <div className='collapse-content'>
            <ul className='menu menu-sm bg-base-200/50 rounded-box mt-2'>
              {problem.constraints.map((constraint, idx) => (
                <li key={idx}>
                  <a className='cursor-default hover:bg-transparent'>
                    <span className='badge badge-ghost badge-xs mr-2'>●</span>
                    <span className='font-mono text-base-content/80'>
                      {constraint}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Spacer for bottom scrolling */}
        <div className='h-12'></div>
      </div>
    </div>
  )
}

export default ProblemDescription
