# 10k-Map-Markers
Showing real time movement of 10k markers on Google maps, using React and Node.js + Unit Tests.

# About
The application uses dead simple node.js mock server to render 10k markers (cars) with google maps api.


You will need the following things properly installed on your computer.

Git

Node.js 


# Installation
git clone https://github.com/Yona84/10k-Map-Markers.git

cd 10k-Map-Markers

 yarn install
 
./client yarn install

# Running / Development

 node --inspect server.js
 
./client yarn start

This should open a browser to http://localhost:3000.

# Testing

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# App Configuration
Grab API Google map key and replace the value in the ./utils/utils.js file.
