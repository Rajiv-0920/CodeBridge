export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-success/15 text-success hover:bg-success/25'
    case 'Medium':
      return 'bg-warning/15 text-warning hover:bg-warning/25'
    case 'Hard':
      return 'bg-error/15 text-error hover:bg-error/25'
    default:
      return 'bg-base-200 text-base-content/60'
  }
}
