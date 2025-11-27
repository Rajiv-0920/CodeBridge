import { useState, useMemo } from 'react'
import {
  Copy,
  Check,
  AlignLeft,
  Terminal,
  AlertTriangle,
  FileText,
  List,
  ChevronDown,
} from 'lucide-react'
import { getDifficultyBadgeClass } from '../lib/utils'

function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  const [copiedExample, setCopiedExample] = useState(null)

  const sortedProblems = useMemo(() => {
    if (!allProblems) return []
    return [...allProblems].sort((a, b) => {
      const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    })
  }, [allProblems])

  const copyExample = (idx, text) => {
    setCopiedExample(idx)
    navigator.clipboard.writeText(text)
    setTimeout(() => setCopiedExample(null), 2000)
  }

  return (
    <div className='h-full flex flex-col bg-base-200/50'>
      {/* HEADER BAR */}
      <div className='flex items-center justify-between p-4 border-b border-base-content/10 bg-base-100/50 backdrop-blur'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <FileText className='size-5 text-primary' />
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-bold text-base-content/40 uppercase tracking-wider'>
              Problem Description
            </span>
            <span className='font-bold text-sm'>Read carefully</span>
          </div>
        </div>

        {/* PROBLEM NAVIGATOR */}
        <div className='relative group'>
          <select
            className='appearance-none pl-3 pr-8 py-1.5 bg-base-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer border border-transparent hover:border-base-content/10 transition-colors'
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {sortedProblems.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          <ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 size-4 text-base-content/50 pointer-events-none' />
        </div>
      </div>

      {/* CONTENT SCROLL AREA */}
      <div className='flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar'>
        {/* TITLE BLOCK */}
        <div className='space-y-4'>
          <div className='flex items-start justify-between'>
            <h1 className='text-3xl font-black text-base-content tracking-tight'>
              {problem.title}
            </h1>
            <span
              className={`badge badge-lg border-0 font-bold ${getDifficultyBadgeClass(
                problem.difficulty
              )}`}
            >
              {problem.difficulty}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <span className='px-2 py-1 rounded-md bg-base-content/5 text-xs font-mono text-base-content/60'>
              {problem.category}
            </span>
          </div>
        </div>

        {/* DESCRIPTION TEXT */}
        <div className='prose prose-sm prose-p:text-base-content/80 prose-headings:text-base-content max-w-none'>
          <div
            dangerouslySetInnerHTML={{
              // Simple converting newlines to paragraphs if raw text,
              // or just rendering text. Adjust if description is HTML.
              __html: problem.description.text.replace(/\n/g, '<br />'),
            }}
          />
        </div>

        {/* EXAMPLES */}
        <div className='space-y-4'>
          <h3 className='flex items-center gap-2 text-sm font-bold text-base-content uppercase tracking-wider'>
            <Terminal className='size-4 text-secondary' />
            Examples
          </h3>

          {problem.examples.map((example, idx) => (
            <div
              key={idx}
              className='group relative bg-base-300/30 rounded-xl overflow-hidden border border-base-content/5'
            >
              <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <button
                  onClick={() =>
                    copyExample(
                      idx,
                      `Input: ${example.input}\nOutput: ${example.output}`
                    )
                  }
                  className='p-1.5 hover:bg-base-content/10 rounded-md transition-colors'
                >
                  {copiedExample === idx ? (
                    <Check className='size-4 text-success' />
                  ) : (
                    <Copy className='size-4 text-base-content/60' />
                  )}
                </button>
              </div>

              <div className='p-4 space-y-3 font-mono text-sm'>
                <div>
                  <span className='text-base-content/40 select-none'>
                    Input:{' '}
                  </span>
                  <span className='text-base-content'>{example.input}</span>
                </div>
                <div>
                  <span className='text-base-content/40 select-none'>
                    Output:{' '}
                  </span>
                  <span className='text-base-content'>{example.output}</span>
                </div>
                {example.explanation && (
                  <div className='pt-2 mt-2 border-t border-base-content/5 text-base-content/60 italic font-sans'>
                    {example.explanation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CONSTRAINTS */}
        <div className='space-y-3'>
          <h3 className='flex items-center gap-2 text-sm font-bold text-base-content uppercase tracking-wider'>
            <AlertTriangle className='size-4 text-warning' />
            Constraints
          </h3>
          <ul className='grid gap-2'>
            {problem.constraints.map((constraint, idx) => (
              <li
                key={idx}
                className='flex items-start gap-2 text-sm text-base-content/70 bg-base-100 p-3 rounded-lg border border-base-content/5'
              >
                <div className='size-1.5 rounded-full bg-base-content/30 mt-1.5 shrink-0' />
                <span className='font-mono text-xs md:text-sm'>
                  {constraint}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProblemDescription
