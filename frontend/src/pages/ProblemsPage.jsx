import { Link } from 'react-router'
import {
  ChevronRight,
  Code2,
  Trophy,
  Zap,
  Brain,
  Target,
  CheckCircle2,
} from 'lucide-react'
import { PROBLEMS } from '../data/problems'
import Navbar from '../components/Navbar'
import { useDailyGoal } from '../hooks/useDailyGoal'

// --- Helper Function for Dynamic Styling ---
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    case 'Medium':
      return 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    case 'Hard':
      return 'text-rose-500 bg-rose-500/10 border-rose-500/20'
    default:
      return 'text-base-content bg-base-content/10 border-base-content/20'
  }
}

const ProblemsPage = () => {
  const {
    solvedCount,
    dailyTarget,
    progressPercentage,
    isGoalMet,
    incrementSolved,
  } = useDailyGoal()

  const problems = Object.values(PROBLEMS)

  const easyProblemsCount = problems.filter(
    (p) => p.difficulty === 'Easy'
  ).length
  const mediumProblemsCount = problems.filter(
    (p) => p.difficulty === 'Medium'
  ).length
  const hardProblemsCount = problems.filter(
    (p) => p.difficulty === 'Hard'
  ).length

  return (
    <div className='min-h-screen bg-base-200 selection:bg-primary/20 selection:text-primary pb-20'>
      <Navbar />

      {/* HEADER SECTION */}
      <div className='pt-32 pb-10'>
        <div className='max-w-6xl mx-auto px-6'>
          {/* Title Area */}
          <div className='flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12'>
            <div>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4'>
                <Zap className='size-3.5 text-primary fill-primary/20' />
                <span className='text-xs font-bold text-primary tracking-wide uppercase'>
                  Coding Arena
                </span>
              </div>
              <h1 className='text-4xl md:text-5xl font-black tracking-tight text-base-content mb-3'>
                Challenge Yourself
              </h1>
              <p className='text-lg text-base-content/60 max-w-lg leading-relaxed'>
                Master algorithms and data structures with our curated
                collection of coding challenges.
              </p>
            </div>

            {/* Quick Stats Strip */}
            <div className='flex gap-3 bg-base-100 p-2 rounded-2xl shadow-sm border border-base-300'>
              <div className='px-4 py-2 text-center border-r border-base-200'>
                <span className='block text-2xl font-bold text-base-content'>
                  {problems.length}
                </span>
                <span className='text-xs font-medium text-base-content/50 uppercase tracking-wider'>
                  Total
                </span>
              </div>
              <div className='px-4 py-2 text-center border-r border-base-200'>
                <span className='block text-2xl font-bold text-emerald-500'>
                  {easyProblemsCount}
                </span>
                <span className='text-xs font-medium text-base-content/50 uppercase tracking-wider'>
                  Easy
                </span>
              </div>
              <div className='px-4 py-2 text-center border-r border-base-200'>
                <span className='block text-2xl font-bold text-amber-500'>
                  {mediumProblemsCount}
                </span>
                <span className='text-xs font-medium text-base-content/50 uppercase tracking-wider'>
                  Med
                </span>
              </div>
              <div className='px-4 py-2 text-center'>
                <span className='block text-2xl font-bold text-rose-500'>
                  {hardProblemsCount}
                </span>
                <span className='text-xs font-medium text-base-content/50 uppercase tracking-wider'>
                  Hard
                </span>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT GRID */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* LEFT COLUMN: PROBLEMS LIST */}
            <div className='lg:col-span-2 space-y-4'>
              <div className='flex items-center justify-between pb-2'>
                <h2 className='text-xl font-bold flex items-center gap-2 text-base-content'>
                  <Target className='size-5 text-primary' />
                  Latest Problems
                </h2>
              </div>

              {problems.map((problem) => (
                <Link
                  key={problem.id}
                  to={`/problem/${problem.id}`}
                  className='group block relative'
                >
                  {/* Hover Glow Effect */}
                  <div className='absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm' />

                  {/* Card Content */}
                  <div className='relative bg-base-100 rounded-3xl p-5 border border-base-200 hover:border-base-300 transition-all duration-300 shadow-sm hover:shadow-md'>
                    <div className='flex items-start gap-5'>
                      {/* Icon Box */}
                      <div
                        className={`shrink-0 size-12 rounded-2xl flex items-center justify-center border ${getDifficultyColor(
                          problem.difficulty
                        )} transition-colors duration-300`}
                      >
                        <Code2 className='size-6' />
                      </div>

                      {/* Text Details */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center justify-between mb-1'>
                          <h3 className='text-lg font-bold truncate pr-4 group-hover:text-primary transition-colors text-base-content'>
                            {problem.title}
                          </h3>
                          <span
                            className={`badge badge-sm font-medium border-0 ${getDifficultyColor(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>

                        <p className='text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2'>
                          {problem.category}
                        </p>

                        <p className='text-sm text-base-content/70 line-clamp-2'>
                          {problem.description.text}
                        </p>
                      </div>

                      {/* Action Arrow */}
                      <div className='self-center hidden sm:block'>
                        <div className='size-8 rounded-full bg-base-200 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-content transition-all duration-300'>
                          <ChevronRight className='size-4' />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* RIGHT COLUMN: SIDEBAR */}
            <div className='space-y-6'>
              {/* --- DAILY GOAL CARD --- */}
              <div className='bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-6 border border-primary/10 relative overflow-hidden'>
                {/* Confetti BG (Only shows when goal met) */}
                {isGoalMet && (
                  <div className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent pointer-events-none' />
                )}

                <div className='flex items-center justify-between mb-4 relative z-10'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        isGoalMet
                          ? 'bg-emerald-500/20 text-emerald-600'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {isGoalMet ? (
                        <CheckCircle2 className='size-5' />
                      ) : (
                        <Brain className='size-5' />
                      )}
                    </div>
                    <h3 className='font-bold text-base-content'>Daily Goal</h3>
                  </div>
                  <span className='text-xs font-bold text-base-content/50 uppercase tracking-wider'>
                    {solvedCount} / {dailyTarget}
                  </span>
                </div>

                <p className='text-sm text-base-content/70 mb-4 relative z-10 min-h-[40px]'>
                  {isGoalMet ? (
                    "You're on fire! 🔥 Come back tomorrow to keep the streak alive."
                  ) : (
                    <span>
                      Solve{' '}
                      <span className='font-bold text-primary'>
                        {dailyTarget - solvedCount}
                      </span>{' '}
                      more problems to hit your daily target.
                    </span>
                  )}
                </p>

                {/* Progress Bar */}
                <div className='w-full bg-base-100 rounded-full h-3 mb-2 overflow-hidden border border-base-200/50 relative z-10'>
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      isGoalMet ? 'bg-emerald-500' : 'bg-primary'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                <div className='flex justify-between text-xs text-base-content/50 relative z-10'>
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>

                {/* DEV BUTTON: Remove this in production! */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    incrementSolved()
                  }}
                  className='mt-4 btn btn-xs btn-ghost btn-block text-base-content/30 hover:text-primary font-normal'
                >
                  (Dev: Click to Simulate Solve)
                </button>
              </div>

              {/* --- LEADERBOARD CARD --- */}
              <div className='bg-base-100 rounded-3xl p-6 border border-base-200 shadow-sm'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-2 bg-amber-500/10 rounded-lg'>
                    <Trophy className='size-5 text-amber-500' />
                  </div>
                  <h3 className='font-bold text-base-content'>Top Solvers</h3>
                </div>

                <div className='space-y-4'>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <div className='avatar placeholder'>
                          <div className='bg-base-200 text-base-content/70 w-8 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-1'>
                            <span className='text-xs font-bold'>U{i}</span>
                          </div>
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-sm font-bold text-base-content'>
                            User {i}
                          </span>
                          <span className='text-[10px] text-base-content/50 font-medium'>
                            {120 - i * 10} Problems
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          i === 1 ? 'text-amber-500' : 'text-base-content/40'
                        }`}
                      >
                        #{i}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemsPage
