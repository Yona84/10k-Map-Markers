import React, { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from '../utils/utils';
import useSupercluster from 'use-supercluster';
import { useGetUpdatedData } from '../hooks/hooks';
import CarComponent from './CarComponent';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const propTypes = {
  data: PropTypes.array,
  lat: PropTypes.number,
  lng: PropTypes.number,
  setData: PropTypes.func,
};

const Marker = ({ children }) => children;

const MapContainer = ({ data, lat, lng, setData }) => {

  const mapRef = useRef();
  const [ bounds, setBounds ] = useState(null);
  const [ zoom, setZoom ] = useState(10);

  const updatedData = useGetUpdatedData();
  const dataIsValid = updatedData && updatedData.length > 0;

  React.useEffect(() => {
    if (dataIsValid) {
      setData(updatedData);
    }
  });

  const points = data.map(car => ( {
    type: 'Feature',
    label: car.label,
    properties: { cluster: false, carId: car.label },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(car.location.lng),
        parseFloat(car.location.lat)
      ]
    }
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        defaultCenter={{ lat: lat, lng: lng }}
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat
          ]);
        }}>
        {
          clusters.map(cluster => {
            const [ longitude, latitude ] = cluster.geometry.coordinates;
            const {
              cluster: isCluster,
              point_count: pointCount
            } = cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <div
                    className={styles.cluster({ pointCount, points })}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            }

            return (
              <CarComponent
                lat={latitude}
                text={cluster.id}
                lng={longitude}/>
            );
          })}
      </GoogleMapReact>
    </div>
  );
};

const styles = {
  cluster: ({ pointCount, points }) => css({
    width: `${10 + ( pointCount / points.length ) * 20}px`,
    height: `${10 + ( pointCount / points.length ) * 20}px`,
    backgroundColor: '#1d1d1d',
    color: 'white',
    padding: 5,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 8
  })
};

MapContainer.propTypes = propTypes;

export default MapContainer;
