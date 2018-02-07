import React from 'react'
import uuidv4 from 'uuid/v4'

const projectsData = [
  {
    photo: ``,
    title: `VanCleaning Service`,
    bulletPoints: [
      `Client-facing website and a larger internal one for employees and admin to manage jobs`,
      `Rails for the back-end and Vue for the front-end`,
      ``,
    ],
  },
  {
    photo: ``,
    title: `Tune Progresser`,
    bulletPoints: [
      `A mobile app that allows musicians to organize sections of songs visually on a map, by recording the parts inside individual recorder components that can be placed where desired on a 'map'`,
      `Uses React Native and Redux`,
      ``,
    ],
  },
  {
    photo: ``,
    title: `PayItForward`,
    bulletPoints: [
      `Volunteering platform with a token incentive`,
      `Lighthouse Labs group final project made in under 2 weeks`,
      `My contributions included: database, transaction logic, the contract page w/ chat, and homepage cards design`,
    ],
  },
  {
    photo: ``,
    title: `Triki Maps`,
    bulletPoints: [
      `Lighthouse Labs group midterm project`,
      `Collaborated with a team of four using Git to create a 'Wikimap'-style single-page website where users can create custom markers and make their own maps`,
      `My contributions included: Google Maps API, user interaction with the map`,
    ],
  },
  {
    photo: ``,
    title: `Chatty`,
    bulletPoints: [
      `Lighthouse Labs solo project`,
      `Simple real-time chat app using React, Express and Websockets`,
    ],
  },
  {
    photo: ``,
    title: `Tweeter`,
    bulletPoints: [
      `Lighthouse Labs solo project`,
      `Twitter clone made with JQuery, Express, and MongoDB`,
    ],
  },
  {
    photo: ``,
    title: `LoopFun`,
    bulletPoints: [
      `Personal project`,
      `Drum machine and note sequencer that uses Javascript and Web Audio API to synthesize sounds`,
    ],
  },
]

export const renderProjects = () => {
  return projectsData.map(project =>
    <div className="row" key={uuidv4()}>
      <div className="photo" key={uuidv4()}>
        this is the photo
      </div>
      <div className="description" key={uuidv4()}>
        <div className="title" key={uuidv4()}>
          { project.title }
        </div>
        <ul>
          { project.bulletPoints.map((bulletPoint, j) =>
            <li key={uuidv4()}>{ bulletPoint }</li>
          )}
        </ul>
      </div>
    </div>
  )
}