import React from 'react'
import uuidv4 from 'uuid/v4'

import Envelope from 'react-icons/lib/fa/envelope'
import Github from 'react-icons/lib/fa/github'
import LinkedIn from 'react-icons/lib/fa/linkedin'
import Facebook from 'react-icons/lib/fa/facebook'
import Soundcloud from 'react-icons/lib/fa/soundcloud'

const iconSize = 48

const otherData = [
  {
    name: 'jongaspar@gmail.com',
    url: 'mailto:jongaspar@gmail.com',
    icon: (<Envelope size={iconSize} color='white'/>),
  },
  {
    name: 'Github',
    url: 'https://github.com/jong86',
    icon: (<Github size={iconSize} color='white'/>),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jon-gaspar/',
    icon: (<LinkedIn size={iconSize} color='white'/>),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/jon.gaspar2',
    icon: (<Facebook size={iconSize} color='white'/>),
  },
  {
    name: 'Soundcloud',
    url: 'https://soundcloud.com/mcpable',
    icon: (<Soundcloud size={iconSize} color='white'/>),
  },
]

export const renderOther = () => {
  return otherData.map(item =>
    <a className="other-item" href={item.url} target={item.name !== 'jongaspar@gmail.com' && '_blank'} key={uuidv4()}>
      <div className="icon" key={uuidv4()}>
        { item.icon }
      </div>
      <div className="name" key={uuidv4()}>
        { item.name }
      </div>
    </a>
  )
}
