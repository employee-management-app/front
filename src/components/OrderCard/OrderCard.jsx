import cx from 'classnames';
import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';

import { useAuth } from '../../hooks/useAuth';

import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';
import { ReactComponent as DirectionIcon } from '../../assets/icons/direction.svg';

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
  const {
    _id,
    address,
    assignedEmployee,
    startDate,
    creationDate,
    disabled,
    email,
    message,
    name,
    onClick,
    phone,
    priority,
    surname,
    type,
  } = props;

  const { isManager } = useAuth();

  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);

  const handleClick = React.useCallback((e) => {
    if (onClick) {
      onClick(e);
    }
  }, [onClick]);

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

  const { code, city, street, house, flat, lat, lng } = address;

  return (
    <Card className={cx(styles.card, { [styles.disabled]: disabled })}>
      <div className={styles.header}>
        <OrderCardPriority id={_id} priority={priority} />
        {!disabled && <OrderCardActions order={props} />}
        <div className={styles.date}>{formatDistanceToNow(new Date(creationDate))} ago</div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus */}
      <div className={styles.body} role="link" onClick={handleClick}>
        <div className={styles.type}>{type}</div>
        <Text className={styles.address}>
          {street} {house}{flat ? `, lokal ${flat}` : ''}<br />
          {code} {city}
        </Text>
        <a
          href={`https://maps.google.com/?q=${lat},${lng}`}
          target="_blank"
          rel="noreferrer"
          className={styles.routeLink}
        >
          <span>Show route</span>
          <DirectionIcon />
        </a>
        <hr className={styles.hr} />
        <Grid space={SPACES.S}>
          <GridEl size="12">
            <Text>{name} {surname}</Text>
          </GridEl>
          <GridEl size={{ md: 12, xl: 8 }}>
            <Button href={`tel:${phone}`} icon={PhoneIcon} width="full">{phone}</Button>
          </GridEl>
          <GridEl size={{ md: 6, xl: 2 }}>
            <Button href={`sms:${phone}`} icon={CommentIcon} width="full" />
          </GridEl>
          <GridEl size={{ md: 6, xl: 2 }}>
            <Button href={`mailto:${email}`} icon={MailIcon} width="full" />
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
                disabled={((assignedEmployee && !isManager) || disabled)}
                onClick={openAssignModal}
              >
                {assignedEmployee ? `${assignedEmployee.name} ${assignedEmployee.surname}` : 'Assignee'}
              </Button>
            </GridEl>
            <GridEl size="6">
              <Button
                icon={startDate ? undefined : CalendarIcon}
                width="full"
                disabled={disabled}
                onClick={openScheduleModal}
              >
                {startDate ? format(new Date(startDate), 'dd.MM.yy  HH:mm') : 'Schedule'}
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
