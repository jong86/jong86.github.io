import React from 'react'
import uuidv4 from 'uuid/v4'

const educationData = [
  {
    school: 'Lighthouse Labs',
    description: 'Diploma of Web Development',
    date: '2017',
  },
  {
    school: 'Industry Training Authority',
    description: 'Red Seal Steamfitter-Pipefitter',
    date: '2012 - 2016',
  },
  {
    school: 'University of British Columbia, University of Alberta',
    description: 'Completed 2.5 years in a wide variety of subjects, but left to find something I was more passionate about',
    date: '2005 - 2008',
  },
]

export const renderEducation = () => {
  return educationData.map(item =>
    <div key={uuidv4()}>
      { item.school } { item.description } { item.date }
    </div>
  )
}
