export const freqExp = (direction, breakPt1, breakPt2, maxFreq, minFreq, scrollPos) => {
  const x = scrollPos - breakPt1
  const bPtDiff = Math.abs(breakPt1 - breakPt2) // Where we require y = 0

  const d = (bPtDiff ** 2) / maxFreq

  // h translates exp function to begin at maxFreq, is sound is required to go down
  const h = direction === 'up' ? 0 : bPtDiff

  const cleanFreq = ((x - h) ** 2) / d

  const drift = Math.sin(scrollPos / 10) * 50 // Adds slight randomness
  const freq = cleanFreq + drift

  console.log("freq:", freq, "scrollPos", scrollPos, "breakPt1", breakPt1, "breakPt2", breakPt2, "direction", direction)
  return freq
}
