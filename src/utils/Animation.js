export const fadeOpacity = (direction, breakPt1, breakPt2, scrollPos) => {
  // Fades opacity in/out towards specified scrollPosition breakpoint
  switch (direction) {
    case 'out':
      return 1 - ((((scrollPos - breakPt1) / (breakPt2 - breakPt1))) ** 2)
    case 'in':
      return (scrollPos - breakPt1) / (breakPt2 - breakPt1)
    default:
      return
  }
}


export const moveComponentVerticallyUp = (startPct, endPct, breakPt1, breakPt2, scrollPos) => {
  const startInt = parseInt(startPct, 10)
  const endInt = parseInt(endPct, 10)
  const output = startInt - ((scrollPos - breakPt1) / (breakPt2 - breakPt1)) * (Math.abs(startInt - endInt))
  return output + '%'
}


export const moveComponentVerticallyDown = (startPct, endPct, breakPt1, breakPt2, scrollPos) => {
  const startInt = parseInt(startPct, 10)
  const endInt = parseInt(endPct, 10)
  const output = startInt + ((scrollPos - breakPt1) / (breakPt2 - breakPt1)) * (Math.abs(startInt - endInt))
  return output + '%'
}


export const scrambleText = (origText, type, breakPt1, breakPt2, scrollPos) => {
  const allChars = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`
  let scrambledText = ''
  origText.split('').forEach(char => {
    // Keep all spaces and new-lines
    if (char === ' ' || char === '\n') {
      scrambledText += char
    }

    // Text scrambling
    else if (type === 'scramble' && Math.random() < ((scrollPos - breakPt1) / (breakPt2 - breakPt1))) {
      // The 'if' evaluates as true more often as scrollPos increases,
      scrambledText += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // Text de-scrambling
    else if (type === 'descramble' && Math.random() > ((scrollPos - breakPt1) / (breakPt2 - breakPt1))) {
      // The 'if' evaluates as true less often as scrollPos increases, so causes scramble amount to 'fade-out'
      scrambledText += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // If the previous 'ifs' don't catch, concat original character
    else {
      scrambledText += char
    }
  })
  return scrambledText
}



export const incHeightWithScrollPosition = (maxHeight, breakPt1, breakPt2, scrollPos) => {
  const current = scrollPos - breakPt1
  const total = breakPt2 - breakPt1

  const output = (current / total) * parseInt(maxHeight, 10)
  return output < 1 ? '1px' : output + 'px'
}



export const decHeightWithScrollPosition = (minHeight, breakPt1, breakPt2, scrollPos) => {
  const current = scrollPos - breakPt1
  const total = breakPt2 - breakPt1

  const output = (1 - (current / total)) * parseInt(minHeight, 10)
  return output < 1 ? '1px' : output + 'px'
}



export const incWidthWithScrollPosition = (breakPt1, breakPt2, scrollPos) => {
  return (((scrollPos - breakPt1) / (breakPt2 - breakPt1)) * 100) + '%'
}



export const decWidthWithScrollPosition = (breakPt1, breakPt2, scrollPos) => {
  const output = 100 - (((scrollPos - breakPt1) / (breakPt2 - breakPt1)) * 100)
  return output + '%'
}