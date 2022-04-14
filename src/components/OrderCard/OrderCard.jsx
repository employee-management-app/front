import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';

import { Card } from '../Card';
import { Text } from '../Text';
import { Grid, GridEl, SPACES } from '../Grid';
import { Button } from '../Button';

import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';

import { OrderCardPriority } from './OrderCardPriority';
import styles from './OrderCard.module.scss';

export const OrderCard = (props) => {
  const { name, type, date, address, phone, mail, description, priority, assigned, orderDate } = props;
  const { code, city, street, house } = address;

  return (
    <Card>
      <div className={styles.header}>
        <OrderCardPriority priority={priority} />
        <div className={styles.date}>{formatDistanceToNow(date)} ago</div>
      </div>
      <div className={styles.type}>{type}</div>
      <Text className={styles.address}>
        {street} {house}<br />
        {code} {city}
      </Text>
      <hr className={styles.hr} />
      <Grid space={SPACES.S}>
        <GridEl size="12">
          <Text>{name}</Text>
        </GridEl>
        <GridEl size={{ md: 12, xl: 8 }}>
          <Button href={`tel:${phone}`} icon={PhoneIcon} width="full">{phone}</Button>
        </GridEl>
        <GridEl size={{ md: 6, xl: 2 }}>
          <Button href={`sms:${phone}`} icon={CommentIcon} width="full"></Button>
        </GridEl>
        <GridEl size={{ md: 6, xl: 2 }}>
          <Button href={`mailto:${mail}`} icon={MailIcon} width="full"></Button>
        </GridEl>
        <GridEl size="12">
          <Text>{description}</Text>
        </GridEl>
        <GridEl size="6">
          <Button icon={assigned ? undefined : UserIcon} width="full" disabled={assigned}>
            {assigned ? assigned : 'Assignee'}
          </Button>
        </GridEl>
        <GridEl size="6">
          <Button icon={orderDate ? undefined : CalendarIcon} width="full" disabled={orderDate}>
            {orderDate ? format(orderDate, 'dd.MM.yy HH:mm') : 'Schedule'}
          </Button>
        </GridEl>
      </Grid>
    </Card>
  );
};
