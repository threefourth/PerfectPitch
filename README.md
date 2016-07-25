# Project Name

> Pithy project description

## Team

  - __Product Owner__: teamMember
  - __Scrum Master__: teamMember
  - __Development Team Members__: teamMember, teamMember

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
  Perfect Pitch is a vocal training app, that will graph the user's vocals and compare it against their favorite singer's vocals.
  On the far left of our app, there is a library of songs that the user can train their vocals. Once a song is clicked there will be
  four main features. The top left box in the main page is the pitch detector and it will tell you what note you are singing. In the
  top center is the audio controls. There is a play button which will play the instrumental, vocal track, and start live input of the user's vocals.
  The pause button will pause the instrumental, vocal track, and the live input of the user's vocals. 

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

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

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
