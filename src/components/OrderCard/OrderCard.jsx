import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';

import { useAuth } from '../../hooks/useAuth';

import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';

import { Card } from '../Card';
import { Text } from '../Text';
import { Grid, GridEl, SPACES } from '../Grid';
import { Button } from '../Button';
import { Modal } from '../Modal';

import { OrderCardPriority } from './OrderCardPriority';
import { AssignForm } from './AssignForm';
import { ScheduleForm } from './ScheduleForm';
import styles from './OrderCard.module.scss';

export const OrderCard = (props) => {
  const { id, name, surname, type, date, address, phone, mail, description, priority, assigned, orderDate } = props;
  const { code, city, street, house, flat } = address;

  const { isManager } = useAuth();

  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);

  const openAssignModal = React.useCallback(() => {
    setIsAssignModalOpen(true);
  }, []);

  const openScheduleModal = React.useCallback(() => {
    setIsScheduleModalOpen(true);
  }, []);

  const onAssignModalClose = React.useCallback(() => {
    setIsAssignModalOpen(false);
  }, []);

  const onScheduleModalClose = React.useCallback(() => {
    setIsScheduleModalOpen(false);
  }, []);

  return (
    <Card>
      <div className={styles.header}>
        <OrderCardPriority priority={priority} />
        <div className={styles.date}>{formatDistanceToNow(date)} ago</div>
      </div>
      <div className={styles.type}>{type}</div>
      <Text className={styles.address}>
        {street} {house}{flat ? `, lokal ${flat}` : ''}<br />
        {code} {city}
      </Text>
      <hr className={styles.hr} />
      <Grid space={SPACES.S}>
        <GridEl size="12">
          <Text>{name} {surname}</Text>
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
        {description && (
          <GridEl size="12">
            <Text>{description}</Text>
          </GridEl>
        )}
      </Grid>
      <div className={styles.footer}>
        <Grid space={SPACES.S}>
          <GridEl size="6">
            <Button 
              icon={assigned ? undefined : UserIcon} 
              width="full" 
              disabled={assigned}
              onClick={openAssignModal}
            >
              {assigned ? `${assigned.name} ${assigned.surname}` : 'Assignee'}
            </Button>
          </GridEl>
          <GridEl size="6">
            <Button 
              icon={orderDate ? undefined : CalendarIcon} 
              width="full" 
              disabled={orderDate}
              onClick={openScheduleModal}
            >
              {orderDate ? format(orderDate, 'dd.MM.yy  HH:mm') : 'Schedule'}
            </Button>
          </GridEl>
        </Grid>
      </div>
      {isManager && (
        <Modal 
          title={`Assign employee to measurement #${id}`}
          isOpen={isAssignModalOpen} 
          onClose={onAssignModalClose}
        >
          <AssignForm order={props} onSuccess={onAssignModalClose} />
        </Modal>
      )}
      <Modal 
        title={`Schedule an appointment for measurement #${id}`}
        isOpen={isScheduleModalOpen} 
        onClose={onScheduleModalClose}
      >
        <ScheduleForm order={props} onSuccess={onScheduleModalClose} />
      </Modal>
    </Card>
  );
};
