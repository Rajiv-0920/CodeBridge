import { Link } from 'react-router'
import { ArrowRight, Brain, Code2, Terminal, Zap } from 'lucide-react'
import { PROBLEMS } from '../data/problems' // Ensure this path matches your file structure
import Navbar from '../components/Navbar'
import { getDifficultyBadgeClass } from '../lib/utils' // Ensure you have this utility or I can provide it

const ProblemsPage = () => {
  // 1. Logic for stats (computed from PROBLEMS object)
  const problems = Object.values(PROBLEMS)

  const stats = [
    {
      label: 'Total',
      count: problems.length,
      color: 'text-base-content',
      bg: 'bg-base-content/5',
      icon: Terminal,
    },
    {
      label: 'Easy',
      count: problems.filter((p) => p.difficulty === 'Easy').length,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      icon: Zap,
    },
    {
      label: 'Medium',
      count: problems.filter((p) => p.difficulty === 'Medium').length,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      icon: Brain,
    },
    {
      label: 'Hard',
      count: problems.filter((p) => p.difficulty === 'Hard').length,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      icon: Code2,
    },
  ]

  return (
    <div className='min-h-screen bg-base-100 relative selection:bg-primary/20 selection:text-primary pb-20'>
      {/* BACKGROUND EFFECTS */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0 bg-grid-pattern opacity-10' />
        <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3' />
        <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3' />
      </div>

      <Navbar />

      <div className='relative pt-32 pb-10 px-6 max-w-7xl mx-auto'>
        {/* HERO HEADER */}
        <div className='flex flex-col md:flex-row items-end justify-between gap-8 mb-16'>
          <div className='space-y-4 max-w-2xl'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20'>
              <div className='size-2 rounded-full bg-primary animate-pulse' />
              <span className='text-xs font-bold text-primary tracking-wide uppercase'>
                Challenge Arena
              </span>
            </div>

            <h1 className='text-4xl md:text-6xl font-black tracking-tight text-base-content'>
              Master the <br />
              <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                Algorithms
              </span>
            </h1>

            <p className='text-lg text-base-content/60 leading-relaxed'>
              Sharpen your skills with our curated collection of coding
              challenges. From easy warm-ups to mind-bending hard problems.
            </p>
          </div>

          {/* STATS CARDS */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto'>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className='bg-base-100/50 backdrop-blur-md border border-base-content/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm hover:border-base-content/20 transition-all'
              >
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
                <div className='text-center'>
                  <span className={`block text-xl font-bold ${stat.color}`}>
                    {stat.count}
                  </span>
                  <span className='text-[10px] font-bold text-base-content/40 uppercase tracking-wider'>
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROBLEMS GRID */}
        {/* We switched from a list to a Grid to fill the space left by the sidebar */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className='group relative flex flex-col h-full'
            >
              {/* Card Background & Border */}
              <div className='absolute -inset-[1px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm' />

              <div className='relative flex flex-col h-full bg-base-100 rounded-3xl border border-base-content/5 p-6 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden'>
                {/* Decoration Circle */}
                <div className='absolute top-0 right-0 size-32 bg-primary/5 rounded-full blur-2xl translate-x-10 -translate-y-10 group-hover:bg-primary/10 transition-colors' />

                {/* Header: Difficulty & Category */}
                <div className='flex items-center justify-between mb-4'>
                  <div
                    className={`badge badge-md font-bold border-0 gap-1.5 ${getDifficultyBadgeClass(
                      problem.difficulty
                    )}`}
                  >
                    {/* Tiny dot for visual interest */}
                    <div className='size-1.5 rounded-full bg-current opacity-50' />
                    {problem.difficulty}
                  </div>
                  <span className='text-xs font-bold text-base-content/40 uppercase tracking-wider'>
                    {problem.category.split('•')[0]}
                  </span>
                </div>

                {/* Title */}
                <h3 className='text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors line-clamp-1'>
                  {problem.title}
                </h3>

                {/* Description Snippet */}
                <p className='text-sm text-base-content/60 leading-relaxed mb-6 line-clamp-3 flex-grow'>
                  {problem.description.text}
                </p>

                {/* Footer Action */}
                <div className='flex items-center justify-between pt-4 border-t border-base-content/5 mt-auto'>
                  <div className='flex -space-x-2'>
                    {/* Fake Avatars to suggest "People solving this" - adds social proof vibe */}
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className='size-6 rounded-full bg-base-300 border border-base-100 flex items-center justify-center text-[8px] text-base-content/50'
                      ></div>
                    ))}
                  </div>

                  <div className='flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all'>
                    Solve Challenge
                    <ArrowRight className='size-4' />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProblemsPage
