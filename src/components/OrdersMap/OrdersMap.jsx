import cx from 'classnames';
import React from 'react';

import { Container } from '../Container';
import { GoogleMap } from '../GoogleMap';
import { OrderCard } from '../OrderCard';

import styles from './OrdersMap.module.scss';

export const OrdersMap = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [height, setHeight] = React.useState(0);
  const wrapperRef = React.useRef(null);
  const cardsRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      setHeight(document.body.clientHeight - wrapperRef.current.offsetTop);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapperRef]);

  const selectOrder = React.useCallback((id) => {
    const index = orders.findIndex((order) => order.id === id);
    const card = cardsRef.current.children[index];

    if (card) {
      card.scrollIntoView({ behavior: 'smooth' });
    }

    setSelectedOrder(id);
  }, [orders]);

  return (
    <div className={styles.wrapper} ref={wrapperRef} style={height ? { height } : undefined}>
      <GoogleMap 
        markers={orders.map(({ id, address }) => ({ id, lng: address.lng, lat: address.lat }))}
        selected={selectedOrder}
        onSelect={selectOrder}
      />
      <div className={styles.container}>
        <Container className={styles.containerInner}>
          <div ref={cardsRef} className={styles.cards}>
            {orders.map((order) => (
              <div 
                className={cx(styles.card, { [styles.selected]: order.id === selectedOrder })} 
                key={order.id}
                onClick={() => selectOrder(order.id)}
              >
                <OrderCard {...order} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};
