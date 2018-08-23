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
    description: 'Red Seal Steamfitter-Pipefitter skilled trade certification',
    date: '2012 - 2016',
  },
  {
    school: 'University of British Columbia',
    description: `General studies`,
    date: '2004 - 2007',
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
