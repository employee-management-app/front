import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../components/Container';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Grid, GridEl } from '../components/Grid';
import { Tabs, Tab, TabsItems, TabsItem } from '../components/Tabs';
import { OrdersMap } from '../components/OrdersMap';
import { OrdersList } from '../components/OrdersList';
import { CreateOrderButton } from '../components/CreateOrderButton';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { fetchOrders } from '../services/fetchOrders';
import { fetchEmployees } from '../services/fetchEmployees';
import { setEmployees, setOrders, getOrders } from '../store';
import { filterOrdersByQuery } from '../utils/filterOrdersByQuery';

import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as ListIcon } from '../assets/icons/list.svg';
import { ReactComponent as MapMarkerIcon } from '../assets/icons/map-marker.svg';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { ReactComponent as TimelineIcon } from '../assets/icons/timeline.svg';

export const Inbox = () => {
  const dispatch = useDispatch();

  const orders = useSelector(getOrders);

  const { isEmployee } = useAuth();
  const { pushNotification } = useNotification();

  const [activeTab, setActiveTab] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [showAssigned, setShowAssigned] = React.useState(undefined);
  const [showScheduled, setShowScheduled] = React.useState(undefined);

  React.useEffect(() => {
    if (isEmployee) {
      return;
    }

    fetchEmployees()
      .then((data) => {
        dispatch(setEmployees(data));
      });
  }, []);

  React.useEffect(() => {
    if (isEmployee) {
      return;
    }

    fetchOrders({ assignedEmployee: showAssigned, completionDate: showScheduled })
      .then((data) => {
        dispatch(setOrders(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' })
      });
  }, [showAssigned, showScheduled]);

  const handleSearchChange = React.useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleAssignCheckbox = React.useCallback((e) => {
    setShowAssigned(e.target.checked || undefined)
  }, []);

  const handleScheduleCheckbox = React.useCallback((e) => {
    setShowScheduled(e.target.checked || undefined)
  }, []);

  // Temporary solution on front part for the search
  const filteredOrders = React.useMemo(() => (
    filterOrdersByQuery(orders, search)
  ), [orders, search]);

  if (isEmployee) {
    return (
      <Container>
        <Grid>
          <GridEl size="12">
            <Text size="h3">Here you can assign yourself to the measurements</Text>
          </GridEl>
          <GridEl size="12">
            <OrdersList orders={[]} />
          </GridEl>
        </Grid>
      </Container>
    )
  }

  return (
    <Container {...(activeTab === 1 && { width: 'full' })}>
      <Grid>
        <GridEl size="12">
          <Container withoutPaddings>
            <Grid alignItems="flex-end" justifyContent="space-between">
              <GridEl size={{ xs: 12, md: 5, lg: 3 }}>
                <Input
                  value={search}
                  icon={SearchIcon}
                  placeholder="Search"
                  onChange={handleSearchChange}
                />
              </GridEl>
              <GridEl size={{ xs: 12, md: 'auto', lg: 'fluid' }}>
                <Tabs active={activeTab} onChange={setActiveTab}>
                  <Tab id={0} icon={ListIcon}>List</Tab>
                  <Tab id={1} icon={MapMarkerIcon}>Map</Tab>
                  <Tab id={2} icon={CalendarIcon}>Calendar</Tab>
                  <Tab id={3} icon={TimelineIcon}>Timeline</Tab>
                </Tabs>
              </GridEl>
              <GridEl size={{ xs: 0, lg: 'auto' }}>
                <Checkbox value={showAssigned} onChange={handleAssignCheckbox}>
                  Show assigned
                </Checkbox>
              </GridEl>
              <GridEl size={{ xs: 0, lg: 'auto' }}>
                <Checkbox value={showScheduled} onChange={handleScheduleCheckbox}>
                  Show scheduled
                </Checkbox>
              </GridEl>
            </Grid>
          </Container>
        </GridEl>
        <GridEl />
      </Grid>
      <TabsItems active={activeTab}>
        <TabsItem for={0}>
          <OrdersList orders={filteredOrders} />
        </TabsItem>
        <TabsItem for={1}>
          <OrdersMap orders={filteredOrders} />
        </TabsItem>
        <TabsItem for={2}>
          <EmptyState 
            title="Nothing here yet"
            text="Calenar will be displayed here. If you think this is an error - contact the administrator."
            action={
              <Button>Contact the administrator</Button>
            }
          />
        </TabsItem>
        <TabsItem for={3}>
          <EmptyState 
            title="Nothing here yet"
            text="Timeline will be displayed here. If you think this is an error - contact the administrator."
            action={
              <Button>Contact the administrator</Button>
            }
          />
        </TabsItem>
      </TabsItems>
      <CreateOrderButton />
    </Container>
  );
};
