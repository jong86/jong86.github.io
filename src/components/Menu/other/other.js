import React from 'react'
import uuidv4 from 'uuid/v4'

import Github from 'react-icons/lib/fa/github'
import LinkedIn from 'react-icons/lib/fa/linkedin'
import Facebook from 'react-icons/lib/fa/facebook'
import Soundcloud from 'react-icons/lib/fa/soundcloud'

const iconSize = 48

const otherData = [
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
    <div>
      <div>
        { item.name }
      </div>
      <div>
        { item.url }
      </div>
      <div>
        { item.icon }
      </div>
    </div>
  )
}
