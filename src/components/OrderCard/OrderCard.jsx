import cx from 'classnames';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';

import { useAuth } from '../../hooks/useAuth';
import { OrderButtons } from '../OrderButtons';
import { Card } from '../Card';
import { Text } from '../Text';
import { Grid, GridEl, SPACES } from '../Grid';
import { Button } from '../Button';
import { RouteLink } from '../RouteLink';
import { OrderActions } from '../OrderActions';
import { OrderPriority } from '../OrderPriority';

import styles from './OrderCard.module.scss';

export const OrderCard = (props) => {
  const {
    _id,
    address,
    creationDate,
    disabled,
    email,
    message,
    employeeMessage,
    managerMessage,
    name,
    onClick,
    phone,
    priority,
    surname,
    stage,
    type,
  } = props;

  const { isManager, isEmployee } = useAuth();

  const handleClick = React.useCallback((e) => {
    onClick?.(e);
  }, [onClick]);

  const { code, city, street, house, flat, lat, lng } = address;

  const shortDescription = React.useMemo(() => (
    isManager
      ? managerMessage || message || employeeMessage
      : employeeMessage
  ), [employeeMessage, isManager, managerMessage, message]);

  return (
    <Card className={cx(styles.card, { [styles.disabled]: disabled })}>
      <div className={styles.header}>
        <OrderPriority id={_id} priority={priority} disabled={disabled} />
        <OrderActions order={props} className={styles.actions} />
        <div className={styles.date}>{formatDistanceToNow(new Date(creationDate))} ago</div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus */}
      <div className={styles.body} role="link" onClick={handleClick}>
        <Link to={`/orders/${_id}`} className={styles.type}>
          {type}
        </Link>
        <Text className={styles.address}>
          {street} {house}{flat ? `, lokal ${flat}` : ''}<br />
          {code} {city}
        </Text>
        <Grid space={SPACES.S}>
          <GridEl size="fluid">
            <RouteLink href={`https://maps.google.com/?q=${lat},${lng}`} />
          </GridEl>
          {isEmployee && (
            <>
              <GridEl size={{ xs: 'auto', md: 0 }}>
                <RouteLink href={`sms:${phone}`} label="Message" icon={CommentIcon} />
              </GridEl>
              <GridEl size={{ xs: 'auto', md: 0 }}>
                <RouteLink href={`tel:${phone}`} label="Phone" icon={PhoneIcon} />
              </GridEl>
            </>
          )}
        </Grid>
        <hr className={styles.hr} />
        <Grid space={SPACES.S}>
          <GridEl size="12">
            <Text>{stage}: {name} {surname}</Text>
          </GridEl>
          <GridEl size={{ md: 12, xl: 8 }}>
            <Button href={`tel:${phone}`} icon={PhoneIcon} width="full">{phone}</Button>
          </GridEl>
          <GridEl size={{ md: 6, xl: 2 }}>
            <Button href={`sms:${phone}`} icon={CommentIcon} width="full" />
          </GridEl>
          <GridEl size={{ md: 6, xl: 2 }}>
            <Button href={`mailto:${email}`} disabled={!email} icon={MailIcon} width="full" />
          </GridEl>
          {shortDescription && (
            <GridEl size="12">
              <Text nowrap>{shortDescription}</Text>
            </GridEl>
          )}
        </Grid>
        <div className={styles.footer}>
          <OrderButtons order={props} />
        </div>
      </div>
    </Card>
  );
};
