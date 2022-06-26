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
import { OrderCardActions } from './OrderCardActions';
import { AssignForm } from './AssignForm';
import { ScheduleForm } from './ScheduleForm';
import styles from './OrderCard.module.scss';

export const OrderCard = (props) => {

  const { name, surname, type, creationDate, address, phone, email, message, priority, assignedEmployee, completionDate } = props;

  const { isManager } = useAuth();
  
  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);

  const handleClick = React.useCallback((e) => {
    if (props.onClick) {
      props.onClick();
    }
  }, [props]);

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

  const { code, city, street, house, flat } = address;

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <OrderCardPriority id={props._id} priority={priority} />
        {isManager && <OrderCardActions order={props} />}
        <div className={styles.date}>{formatDistanceToNow(new Date(creationDate))} ago</div>
      </div>
      <div onClick={handleClick}>
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
            <Button href={`mailto:${email}`} icon={MailIcon} width="full"></Button>
          </GridEl>
          {message && (
            <GridEl size="12">
              <Text>{message}</Text>
            </GridEl>
          )}
        </Grid>
        <div className={styles.footer}>
          <Grid space={SPACES.S}>
            <GridEl size="6">
              <Button 
                icon={assignedEmployee ? undefined : UserIcon} 
                width="full" 
                disabled={assignedEmployee && !isManager}
                onClick={openAssignModal}
              >
                {assignedEmployee ? `${assignedEmployee.name} ${assignedEmployee.surname}` : 'Assignee'}
              </Button>
            </GridEl>
            <GridEl size="6">
              <Button 
                icon={completionDate ? undefined : CalendarIcon} 
                width="full"
                onClick={openScheduleModal}
              >
                {completionDate ? format(new Date(completionDate), 'dd.MM.yy  HH:mm') : 'Schedule'}
              </Button>
            </GridEl>
          </Grid>
        </div>
      </div>
      {isManager && (
        <Modal 
          title="Assign employee to measurement"
          isOpen={isAssignModalOpen} 
          onClose={onAssignModalClose}
        >
          <AssignForm order={props} onSuccess={onAssignModalClose} />
        </Modal>
      )}
      <Modal 
        title="Schedule an appointment for measurement"
        isOpen={isScheduleModalOpen} 
        onClose={onScheduleModalClose}
      >
        <ScheduleForm order={props} onSuccess={onScheduleModalClose} />
      </Modal>
    </Card>
  );
};
