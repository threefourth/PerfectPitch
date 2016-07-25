# Project Name

> Pithy project description

## Team

  - __Product Owner__: Frank Lee
  - __Scrum Master__: Jae Shin
  - __Development Team Members__: Jeff Leu, Joann Im

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
  Perfect Pitch is a vocal training app that will graph the user's vocals and compare it against their favorite singer's vocals.
  On the far left of our app, there is a library of songs that the user can train their vocals. Once a song is clicked there will be
  four main features. The top left box in the main page is the pitch detector and it will tell you what note you are singing. In the
  top center is the audio controls which has the Play, Pause, and Stop buttons. It also has two volume controls. The top controls: controls
  the volume of the instrumental. The bottom one: controls the volume of the vocals. The bottom box will have the selected song's singer's
  vocals already graphed out and it will graph the user's vocals in real time. 

  For authentication, we incorporated a login, sign up, and logout feature. Once the user's logged in, they can track the user's progress. 

## Requirements

- Node v6.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
bower install
mongod
npm start
npm run compile
```
Npm start will start the server and connect to mongodb. Npm run compile will compile all jsx files to js files. 

### Roadmap

Our intent was to have the scoreboard constantly updating throughout the duration of the song, so the user can see how well they are singing. 
We were unable to incorporate this feature because we have the score as a state inside the top-level App component, which re-renders everytime we update the state.
If you want to incorporate the scoreboard, the score should not be living as a state inside App component. 

View the project roadmap [here](https://github.com/threefourth/threefourth/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
