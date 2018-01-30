export const freqExp = (breakPtMin, divisor, scrollPos) => {
  const x = scrollPos
  const h = breakPtMin // Absolute minimum (where it starts to rise again)
  const d = divisor // Adjusts speed of modulation (wideness of function)

  const cleanFreq = (((x - h) ** 2) / d) + 20
  const drift = Math.sin(scrollPos / 10) * 30 // Adds slight randomness
  const freq = cleanFreq + drift
  return freq <= 22050 ? freq : 22050
}

export const freqLowerMod = (scrollPos) => {
  return (Math.sin(Date.now() / 25) * 50) + 100
}