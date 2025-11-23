import { useUser } from '@clerk/clerk-react'
import {
  Code2Icon,
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  TrophyIcon,
  VideoIcon,
  MoreVerticalIcon,
  SearchIcon,
  LayoutDashboardIcon,
} from 'lucide-react'
import { Link } from 'react-router'

// Mock data for previous interviews
const RECENT_ACTIVITY = [
  {
    id: 1,
    title: 'Frontend React Interview',
    date: '2024-03-15',
    duration: '45 mins',
    language: 'JavaScript',
    score: 92,
    status: 'Completed',
  },
  {
    id: 2,
    title: 'System Design Practice',
    date: '2024-03-12',
    duration: '60 mins',
    language: 'Python',
    score: 85,
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Algorithms & Data Structures',
    date: '2024-03-10',
    duration: '30 mins',
    language: 'C++',
    score: 78,
    status: 'Review',
  },
]

function DashboardPage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-base-200'>
        <span className='loading loading-spinner loading-lg text-primary'></span>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200 p-6'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* HEADER */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold'>
              Welcome back,{' '}
              <span className='text-primary'>
                {user?.firstName || 'Developer'}
              </span>
              ! 👋
            </h1>
            <p className='text-base-content/60 mt-1'>
              Ready to ace your next technical interview?
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Link to='/' className='btn btn-outline btn-sm'>
              Back to Home
            </Link>
            <button className='btn btn-primary btn-sm gap-2'>
              <PlusIcon className='size-4' />
              New Interview
            </button>
          </div>
        </div>

        {/* STATS GRID */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Stat 1 */}
          <div className='card bg-base-100 shadow-xl border border-base-300'>
            <div className='card-body flex-row items-center gap-4'>
              <div className='p-3 bg-primary/10 rounded-xl'>
                <TrophyIcon className='size-6 text-primary' />
              </div>
              <div>
                <div className='stat-value text-2xl font-bold'>12</div>
                <div className='stat-desc text-sm font-medium'>
                  Interviews Passed
                </div>
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className='card bg-base-100 shadow-xl border border-base-300'>
            <div className='card-body flex-row items-center gap-4'>
              <div className='p-3 bg-secondary/10 rounded-xl'>
                <ClockIcon className='size-6 text-secondary' />
              </div>
              <div>
                <div className='stat-value text-2xl font-bold'>24h</div>
                <div className='stat-desc text-sm font-medium'>
                  Practice Time
                </div>
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className='card bg-base-100 shadow-xl border border-base-300'>
            <div className='card-body flex-row items-center gap-4'>
              <div className='p-3 bg-accent/10 rounded-xl'>
                <Code2Icon className='size-6 text-accent' />
              </div>
              <div>
                <div className='stat-value text-2xl font-bold'>85%</div>
                <div className='stat-desc text-sm font-medium'>
                  Average Score
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN ACTION & HISTORY */}
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* LEFT COLUMN: START NEW */}
          <div className='lg:col-span-2 space-y-6'>
            {/* QUICK START CARD */}
            <div className='card bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title text-xl mb-4'>Start New Session</h2>
                <div className='grid md:grid-cols-2 gap-4'>
                  <button className='btn h-auto py-6 flex flex-col items-center gap-3 bg-base-100 hover:border-primary border-base-300'>
                    <div className='p-3 bg-primary/10 rounded-full'>
                      <PlusIcon className='size-6 text-primary' />
                    </div>
                    <div>
                      <div className='font-bold'>Start New Meeting</div>
                      <div className='text-xs text-base-content/60 font-normal'>
                        Create a new room
                      </div>
                    </div>
                  </button>

                  <button className='btn h-auto py-6 flex flex-col items-center gap-3 bg-base-100 hover:border-secondary border-base-300'>
                    <div className='p-3 bg-secondary/10 rounded-full'>
                      <VideoIcon className='size-6 text-secondary' />
                    </div>
                    <div>
                      <div className='font-bold'>Join Meeting</div>
                      <div className='text-xs text-base-content/60 font-normal'>
                        Enter existing ID
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* RECENT ACTIVITY TABLE */}
            <div className='card bg-base-100 shadow-xl border border-base-300'>
              <div className='card-body p-0'>
                <div className='flex items-center justify-between p-6 border-b border-base-200'>
                  <h2 className='font-bold text-lg'>Recent Activity</h2>
                  <button className='btn btn-ghost btn-sm text-primary'>
                    View All
                  </button>
                </div>
                <div className='overflow-x-auto'>
                  <table className='table'>
                    <thead>
                      <tr className='bg-base-200/50'>
                        <th>Interview Title</th>
                        <th>Language</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_ACTIVITY.map((item) => (
                        <tr key={item.id} className='hover:bg-base-200/30'>
                          <td>
                            <div className='flex items-center gap-3'>
                              <div className='avatar placeholder'>
                                <div className='bg-base-300 text-base-content rounded-lg w-10'>
                                  <Code2Icon className='size-5' />
                                </div>
                              </div>
                              <div>
                                <div className='font-bold'>{item.title}</div>
                                <div className='text-xs opacity-50'>
                                  {item.duration}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='badge badge-outline gap-1'>
                              <div
                                className={`size-1.5 rounded-full ${
                                  item.language === 'Python'
                                    ? 'bg-yellow-400'
                                    : item.language === 'JavaScript'
                                    ? 'bg-yellow-300'
                                    : 'bg-blue-500'
                                }`}
                              ></div>
                              {item.language}
                            </div>
                          </td>
                          <td>
                            <div className='flex items-center gap-2 text-sm'>
                              <CalendarIcon className='size-3 opacity-70' />
                              {item.date}
                            </div>
                          </td>
                          <td>
                            <div
                              className={`badge ${
                                item.score >= 90
                                  ? 'badge-success badge-soft'
                                  : item.score >= 80
                                  ? 'badge-warning badge-soft'
                                  : 'badge-error badge-soft'
                              } gap-1`}
                            >
                              {item.score}%
                            </div>
                          </td>
                          <th>
                            <button className='btn btn-ghost btn-xs'>
                              <MoreVerticalIcon className='size-4' />
                            </button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PROFILE & UPCOMING */}
          <div className='space-y-6'>
            {/* PROFILE CARD */}
            <div className='card bg-base-100 shadow-xl border border-base-300 text-center'>
              <div className='card-body items-center'>
                <div className='avatar'>
                  <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                    <img src={user?.imageUrl} alt={user?.fullName} />
                  </div>
                </div>
                <h2 className='card-title mt-2'>{user?.fullName}</h2>
                <p className='text-sm text-base-content/60'>
                  Software Engineer
                </p>

                <div className='divider my-2'></div>

                <div className='w-full space-y-2 text-left text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-base-content/60'>Member since</span>
                    <span className='font-medium'>March 2024</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-base-content/60'>Plan</span>
                    <span className='text-primary font-medium'>Pro Tier</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LEARNING RESOURCES */}
            <div className='card bg-base-100 shadow-xl border border-base-300'>
              <div className='card-body'>
                <h3 className='font-bold text-lg mb-2'>Recommended Practice</h3>
                <ul className='menu bg-base-200 rounded-box w-full'>
                  <li>
                    <a>
                      <Code2Icon className='size-4' />
                      Arrays & Hashing
                      <span className='badge badge-sm badge-primary ml-auto'>
                        New
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <LayoutDashboardIcon className='size-4' />
                      System Design Basics
                    </a>
                  </li>
                  <li>
                    <a>
                      <VideoIcon className='size-4' />
                      Mock Interview Prep
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
