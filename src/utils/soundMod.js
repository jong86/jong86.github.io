export const freqExp = (breakPt1, breakPt2, scrollPos) => {
  const x = scrollPos
  const h = breakPt1

  const d = x < h ? 5 : 25 // Makes rise in freq slower on the way out
  const cleanFreq = (((x - h) ** 2) / d) + 20
  const drift = Math.ceil(Math.random() * cleanFreq / 100) // Adds slight randomness
  const freq = cleanFreq + drift
  return freq <= 22050 ? freq : 22050
}