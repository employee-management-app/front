import React from 'react';

import { fetchEmployeeOrders } from '../services/fetchEmployeeOrders';
import { Container } from '../components/Container';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { Tabs, Tab, TabsItems, TabsItem } from '../components/Tabs';
import { Input } from '../components/Input';
import { Grid, GridEl } from '../components/Grid';
import { Spinner } from '../components/Spinner';
import { OrdersMap } from '../components/OrdersMap';
import { OrdersList } from '../components/OrdersList';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';
import { filterOrdersByQuery } from '../utils/filterOrdersByQuery';

import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as ListIcon } from '../assets/icons/list.svg';
import { ReactComponent as MapMarkerIcon } from '../assets/icons/map-marker.svg';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { ReactComponent as TimelineIcon } from '../assets/icons/timeline.svg';

export const Anytime = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const { pushNotification } = useNotification();
  const { user } = useAuth();

  React.useEffect(() => {
    setIsLoading(true);

    fetchEmployeeOrders(user._id, { startDate: false, sortBy: 'priority' })
      .then((data) => {
        setOrders(data);
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = React.useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // Temporary solution on front part for the search
  const filteredOrders = React.useMemo(() => (
    filterOrdersByQuery(orders, search)
  ), [orders, search]);

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
            </Grid>
          </Container>
        </GridEl>
        <GridEl />
      </Grid>
      <TabsItems active={activeTab}>
        <TabsItem for={0}>
          {isLoading ? <Spinner /> : <OrdersList orders={filteredOrders} />}
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
    </Container>
  );
};
