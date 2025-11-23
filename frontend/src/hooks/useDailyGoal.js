import { useState, useEffect } from 'react'

// The target number of problems to solve per day
const DAILY_TARGET = 3

export const useDailyGoal = () => {
  const [solvedCount, setSolvedCount] = useState(0)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    // 1. Get data from local storage
    const storedDate = localStorage.getItem('lastSolvedDate')
    const storedCount = parseInt(localStorage.getItem('dailyCount') || '0')
    const storedStreak = parseInt(localStorage.getItem('streak') || '0')

    const today = new Date().toDateString()

    // 2. Check if it's a new day
    if (storedDate !== today) {
      // It's a new day! Reset count to 0.
      // If last solved was NOT yesterday, reset streak (logic omitted for simplicity, usually requires date math)
      setSolvedCount(0)
      localStorage.setItem('dailyCount', '0')
      localStorage.setItem('lastSolvedDate', today)
    } else {
      // It's the same day, restore progress
      setSolvedCount(storedCount)
      setStreak(storedStreak)
    }
  }, [])

  const incrementSolved = () => {
    const today = new Date().toDateString()
    const newCount = solvedCount + 1

    setSolvedCount(newCount)
    localStorage.setItem('dailyCount', newCount.toString())
    localStorage.setItem('lastSolvedDate', today)

    // Simple streak logic: If we hit the target exactly, add to streak
    if (newCount === DAILY_TARGET) {
      const newStreak = streak + 1
      setStreak(newStreak)
      localStorage.setItem('streak', newStreak.toString())
    }
  }

  const progressPercentage = Math.min((solvedCount / DAILY_TARGET) * 100, 100)
  const isGoalMet = solvedCount >= DAILY_TARGET

  return {
    solvedCount,
    dailyTarget: DAILY_TARGET,
    progressPercentage,
    isGoalMet,
    streak,
    incrementSolved,
  }
}
