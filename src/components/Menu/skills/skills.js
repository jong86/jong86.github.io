import React from 'react'
import uuidv4 from 'uuid/v4'

const skillsData = [
  {
    label: 'Languages',
    items: [
      'Javascript',
      'Python',
      'Ruby',
      'SQL',
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
      'Google Maps API',
      'Web Audio API',
      'Photoshop',
    ],
  },
  {
    label: 'Back-End',
    items: [
      'Node.js',
      'Express',
      'Ruby on Rails',
      'PostgreSQL',
      'MongoDB',
      'Web Sockets',
      'Docker',
    ],
  },
]

export const renderSkills = () => {
  return skillsData.map(section =>
    <div className='skills-content' key={uuidv4()}>
      <div className="label subtitle" key={uuidv4()}>
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
