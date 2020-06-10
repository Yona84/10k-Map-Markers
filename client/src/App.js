import React from 'react';
import { useGetData, useGetLocation } from './hooks/hooks';
import MapContainer from './components/MapContainer';
import { css } from 'emotion';
import { CircularProgress } from '@material-ui/core';
import MaterialTable from 'material-table';
import { tableIcons } from './tableIcons';

const columns = [
  { title: 'Label', field: 'content' },
  { title: 'Lat', field: 'location.lat' },
  { title: 'Long', field: 'location.lng' }
];

const App = () => {

  const [ data, setData ] = useGetData();
  const location = useGetLocation();
  const { lat, long } = location;

  if (lat && long && data && data.length > 0) {
    return (
      <div className={styles.root}>
        <div className={styles.info}>
          <MaterialTable
            options={{
              pageSize: 10
            }}
            title={'Cars'}
            style={{ width: '100%', padding: 20 }}
            icons={tableIcons}
            columns={columns}
            data={data}
          />
        </div>
        <MapContainer
          data={data}
          lat={lat}
          lng={long}
          setData={setData}/>
      </div>
    );
  } else return (
    <div className={styles.loader}>
      <CircularProgress size={50}/>
    </div>
  );
};

const styles = {
  root: css({
    height: '100vh',
    width: '100vw',
    display: 'flex',
  }),
  info: css({
    width: '100%',
    display: 'flex',
    backgroundColor: '#1d1d1d',
    justifyContent: 'center'
  }),
  loader: css({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(50%,50%)'
  }),
};

export default App;
