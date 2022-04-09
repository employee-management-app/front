import React from 'react';
import GoogleMapReact from 'google-map-react';

import { Container } from '../Container';
import { Card } from '../Card';

import styles from './OrdersMap.module.scss';

export const OrdersMap = ({ orders }) => {
  const [height, setHeight] = React.useState(0);
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    const handleResize = () => {
      setHeight(document.body.clientHeight - ref.current.offsetTop);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  const style = height ? { height } : undefined;

  return (
    <div className={styles.wrapper} ref={ref} style={style}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: 51.10768387181116, 
          lng: 17.062368712823876,
        }}
        defaultZoom={15}
      />
      <div className={styles.container}>
        <Container className={styles.containerInner}>
          <div className={styles.cards}>
            {orders.map(({ id }) => (
              <div className={styles.card} key={id}>
                <Card />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};
