export function getDifficultyBadgeClass(difficulty) {
  switch (difficulty) {
    case 'Easy':
      return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
    case 'Medium':
      return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
    case 'Hard':
      return 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
    default:
      return 'bg-base-content/10 text-base-content'
  }
}
