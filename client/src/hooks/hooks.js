import React from 'react';

export const useGetData = () => {

  const [ data, setData ] = React.useState([]);

  const getCars = async () => {
    const rawResponse = await fetch('/api/carsBig/', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const content = await rawResponse.json();
    setData(content.cars);
  };
  React.useEffect(() => {
    getCars();
  }, []);

  return [ data, setData ];
};

export const useGetUpdatedData = () => {

  const [ data, setData ] = React.useState([]);

  const updateCars = async () => {
    const rawResponse = await fetch('/api/carsBig/updateLocation', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const content = await rawResponse.json();
    setData(content.cars);
  };
  React.useEffect(() => {
    setTimeout(() => setInterval(() => updateCars(), 3000), 3000);
  }, []);

  return data;
};

export const useGetLocation = () => {
  const [ coords, setCoords ] = React.useState({
    lat: void 0,
    long: void 0
  });

  React.useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = (pos) => {
      const crd = pos.coords;
      setCoords(prevState => ( {
        ...prevState,
        lat: crd.latitude,
        long: crd.longitude
      } ));
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }, []);
  return coords;
};
