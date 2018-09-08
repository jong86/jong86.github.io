import React from 'react'
import uuidv4 from 'uuid/v4'

const educationData = [
  {
    school: 'Lighthouse Labs',
    description: 'Blockchain for Developers',
    date: '2018',
  },
  {
    school: 'Lighthouse Labs',
    description: 'Diploma of Web Development',
    date: '2017',
  },
  {
    school: 'University of British Columbia',
    description: `Took a calculus course in my spare time`,
    date: '2016',
  },
  {
    school: 'Piping Industry Apprenticeship Board',
    description: 'Red Seal Steamfitter-Pipefitter skilled trade certification',
    date: '2013 - 2015',
  },
  {
    school: 'University of Alberta',
    description: `Took courses in political science, psychology and statistics`,
    date: '2009',
  },
  {
    school: 'University of British Columbia',
    description: `Took courses in political science, psychology, history, economics, earth science`,
    date: '2005 - 2007',
  },
]

export const renderEducation = () => {
  return educationData.map(item =>
    <div className="education-item" key={uuidv4()}>
      <div className="school subtitle" key={uuidv4()}>
        { item.school }
      </div>
      <div className="date" key={uuidv4()}>
        { item.date }
      </div>
      <div className="description" key={uuidv4()}>
        { item.description }
      </div>
    </div>
  )
}
