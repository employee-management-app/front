import cx from 'classnames';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';

import { ReactComponent as MeasurementIcon } from '../../assets/icons/measurement.svg';

import styles from './GoogleMap.module.scss';

const DEFAULT_CENTER = {
  lat: 51.107883, 
  lng: 17.038538,
};

const MapMarker = ({ className, onClick }) => {
  return (
    <div className={cx(styles.marker, className)} onClick={onClick}>
      <MeasurementIcon />
    </div>
  );
};

const MapCluster = ({ children, onClick }) => (
  <div className={styles.marker} onClick={onClick}>{children}</div>
);

export const GoogleMap = ({ markers, selected, onSelect }) => {
  const [map, setMap] = React.useState(null);
  const [zoom, setZoom] = React.useState(11);
  const [bounds, setBounds] = React.useState([]);

  const [selectedMarker, setSelectedMarker] = React.useState(selected);

  React.useEffect(() => {
    setSelectedMarker(selected);
    setZoom(13);
  }, [selected]);

  const onGoogleApiLoaded = React.useCallback((api) => {
    setMap(api.map);
  }, []);

  const onChange = React.useCallback((e) => {
    setZoom(e.zoom);
    setBounds([
      e.bounds.nw.lng,
      e.bounds.se.lat,
      e.bounds.se.lng,
      e.bounds.nw.lat,
    ]);
  }, []);

  const onMarkerClick = React.useCallback((marker) => {
    setSelectedMarker(marker);
    onSelect(marker);
  }, [onSelect]);

  const center = React.useMemo(() => {
    if (selectedMarker) {
      const { lng, lat } = markers.find((marker) => marker.id === selectedMarker);

      return {
        lng: lng,
        lat: lat,
      };
    }

    return DEFAULT_CENTER;
  }, [markers, selectedMarker]);

  const { clusters, supercluster } = useSupercluster({
    points: markers.map(({ id, lat, lng }) => ({
      type: 'Feature',
      properties: { id },
      geometry: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    })),
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <GoogleMapReact 
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
      center={center}
      zoom={zoom}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={onGoogleApiLoaded}
      onChange={onChange}
    >
      {clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount, id } = cluster.properties;

        const onClusterClick = () => {
          map.setZoom(Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20));
          map.panTo({ lat, lng });
        };

        if (isCluster) {
          return (
            <MapCluster 
              key={cluster.id} 
              lat={lat} 
              lng={lng} 
              onClick={onClusterClick}
            >
              {pointCount}
            </MapCluster>
          );
        }

        return (
          <MapMarker
            key={id}
            lat={lat}
            lng={lng}
            className={cx({ [styles.selected]: id === selectedMarker })}
            onClick={() => onMarkerClick(id)}
          />
        );
      })}
    </GoogleMapReact>
  );
};
