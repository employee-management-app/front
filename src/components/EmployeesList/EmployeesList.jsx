import cx from 'classnames';
import React from 'react';

import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Button } from '../Button';
import { Table } from '../Table';

import { ColorPopover } from './ColorPopover';
import styles from './EmployeesList.module.scss';
import { EmployeeActions } from './EmployeeActions';
import { Grid, GridEl } from '../Grid';

export const EmployeesList = ({ employees }) => {
  const columns = [
    {
      title: 'Name',
      key: ['name', 'surname'],
    },
    {
      title: 'Color',
      key: ['color', '_id'],
      render: ([color, _id]) => (
        <ColorPopover color={color} employeeId={_id} />
      ),
    },
    {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Phone',
      key: 'phone',
    },
    {
      title: 'Status',
      key: 'isActive',
      render: (isActive) => (
        isActive
          ? <span className={cx(styles.status, styles.active)}>Active</span>
          : <span className={cx(styles.status, styles.inactive)}>Inactive</span>
      ),
    },
    {
      title: 'Verified',
      key: 'isVerified',
      render: (isVerified) => (
        isVerified
          ? <span className={cx(styles.status, styles.active)}>Yes</span>
          : <span className={cx(styles.status, styles.inactive)}>No</span>
      ),
    },
    {
      title: 'Actions',
      key: ['phone', 'email'],
      render: ([phone, email], index) => (
        <div className={styles.actions}>
          <Button to={`tel:${phone}`} icon={PhoneIcon} />
          <Button to={`mailto:${email}`} icon={MailIcon} />
          <EmployeeActions employee={employees[index]} />
        </div>
      ),
    },
  ];

  const { showModal } = useModalVisibility('AddEmployee');

  return (
    <Grid>
      <GridEl size="12">
        <Table
          columns={columns}
          data={employees}
        />
      </GridEl>
      <GridEl size="12">
        <Button icon={PlusIcon} onClick={showModal}>Add employee</Button>
      </GridEl>
    </Grid>
  );
};
