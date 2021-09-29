# fitnesstrackr
an API for our new fitness empire, FitnessTrac.kr, using node, express, postgresql, and jQuery

## Getting Started
Install Packages

    npm i

Initialize Database

    createdb fitness-dev
    
Start Server

    npm run start:dev

## Automated Tests
Currently, test suites must be run separately.  I have not yet fixed this.

### DB Methods

    npm run test:watch db.spec

### API Routes (server must be running for these to pass)

    npm run test:watch api.spec

### Documentation

To edit the documentation, edit the `FitnessTrackr API Documentation.md` file, then copy the markdown content and use https://markdowntohtml.com/ to convert to html.  Paste the html into `public/index.html` in the `div` with `id="doc-html"`.