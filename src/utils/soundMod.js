export const freqExp = (direction, breakPt1, breakPt2, maxFreq, minFreq, scrollPos) => {
  const x = scrollPos - breakPt1
  const bPtDiff = Math.abs(breakPt1 - breakPt2) // Where we require y = 0

  const d = (bPtDiff ** 2) / maxFreq

  const h = direction === 'up' ? 0 : bPtDiff

  const cleanFreq = ((x - h) ** 2) / d

  const drift = Math.sin(scrollPos / 10) * 30 // Adds slight randomness
  const freq = cleanFreq + drift
  return freq <= 22050 ? freq : 22050
}

export const freqLowerMod = (scrollPos) => {
  return 5
}