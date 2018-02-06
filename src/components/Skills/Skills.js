import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
import Menu from '../Menu/Menu.js'

const Skills = () => (
  <Menu
    title='Skills'
    renderContent={renderSkills}
    scrollToBreakPoint={this.props.scrollToBreakPoint}
    sectionColor='red'
    breakPtPrev={0}
    breakPtNext={5}
  />
)

export default Skills
