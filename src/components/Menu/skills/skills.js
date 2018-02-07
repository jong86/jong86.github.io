import React from 'react'
import uuidv4 from 'uuid/v4'

const skillsData = [
  {
    label: 'Languages',
    items: [
      'Javascript',
      'Python',
      'Ruby',
    ],
  },
  {
    label: 'Front-End',
    items: [
      'React',
      'React Native',
      'Redux',
      'Vue.js',
      'JQuery',
      'CSS/SCSS',
      'Photoshop',
      'Google Maps API',
      'Web Audio API',
    ],
  },
  {
    label: 'Back-End',
    items: [
      'Node.js',
      'Express',
      'Ruby on Rails',
      'SQL',
      'MongoDB',
      'Web Sockets',
    ],
  },
]

export const renderSkills = () => {
  return skillsData.map(section =>
    <div className='skills-content' key={uuidv4()}>
      <div className="label" key={uuidv4()}>
        { section.label }
      </div>
      <ul className="list" key={uuidv4()}>
        { section.items.map(item =>
          <li key={uuidv4()}>{ item }</li>
        )}
      </ul>
    </div>
  )
}
