import React from 'react';

import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { Button } from '../Button';
import { Table } from '../Table';
import { Status } from '../Status';

import { Grid, GridEl } from '../Grid';

export const ManagersList = ({ managers }) => {
  const columns = [
    {
      title: 'Name',
      key: ['name', 'surname'],
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
          ? <Status status="success">Active</Status>
          : <Status status="error">Inactive</Status>
      ),
    },
    {
      title: 'Verified',
      key: 'isVerified',
      render: (isVerified) => (
        isVerified
          ? <Status status="success">Yes</Status>
          : <Status status="error">No</Status>
      ),
    },
  ];

  const { showModal } = useModalVisibility('AddManager');

  return (
    <Grid>
      {managers.length > 0 && (
        <GridEl size="12">
          <Table
            columns={columns}
            data={managers}
          />
        </GridEl>
      )}
      <GridEl size="12">
        <Button icon={PlusIcon} onClick={showModal}>Add manager</Button>
      </GridEl>
    </Grid>
  );
};
