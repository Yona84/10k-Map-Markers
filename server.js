const express = require('express');
const bodyParser = require('body-parser');

const newArray = [ ...new Array(10000) ];

newArray.forEach((item, key) => {
  let mar = { label: '', location: {} };
  mar.content = `Car${key}`;
  mar.location.lat = 32.057199699999996 + ( Math.random() * 0.01 );
  mar.location.lng = 34.7650957 + ( Math.random() * 0.01 );

  newArray[ key ] = mar;
});

const mockDatasmall = [
  {
    label: 'Car1',
    imgSrc: 'https://img.icons8.com/color/48/000000/car.png',
    location: {
      lat: 32.053199699999996,
      lng: 34.7650957,
    }
  },
  {
    label: 'Car2',
    imgSrc: 'https://img.icons8.com/cotton/64/000000/car.png',
    location: {
      lat: 32.055199699999996,
      lng: 34.7620957,
    }
  },
  {
    label: 'Car3',
    imgSrc: 'https://img.icons8.com/color/48/000000/f1-race-car-side-view.png',
    location: {
      lat: 32.055899699999996,
      lng: 34.7690957,
    }
  }
];

const app = express();
const port = 5000;

app.use(bodyParser.json());

// api calls for 3 cars
app.get('/api/carsSmall', (req, res) => {
  res.send({ cars: mockDatasmall });
});

app.get('/api/carsSmall/updateLocation', (req, res) => {
  const updatedData = [ ...mockDatasmall ].map(car => {
    return {
      ...car,
      location: {
        lat: car.location.lat + ( Math.random() * 0.0005 ),
        lng: car.location.lng + ( Math.random() * 0.0005 )
      }
    };
  });
  res.send({ cars: updatedData });
});

// api calls for 10k cars
app.get('/api/carsBig', (req, res) => {
  res.send({ cars: newArray });
});

app.get('/api/carsBig/updateLocation', (req, res) => {
  const updatedData = [ ...newArray ].map(car => {
    return {
      ...car,
      location: {
        lat: car.location.lat + ( Math.random() * 0.0005 ),
        lng: car.location.lng + ( Math.random() * 0.0005 )
      }
    };
  });
  res.send({ cars: updatedData });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
