import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as ListIcon } from '../assets/icons/list.svg';
import { ReactComponent as MapMarkerIcon } from '../assets/icons/map-marker.svg';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { ReactComponent as TimelineIcon } from '../assets/icons/timeline.svg';

import { setOrders, getOrders, setEmployees } from '../store';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { filterOrdersByQuery } from '../utils/filterOrdersByQuery';
import { fetchOrders } from '../services/fetchOrders';
import { fetchEmployees } from '../services/fetchEmployees';
import { Container } from '../components/Container';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { Grid, GridEl, SPACES } from '../components/Grid';
import { Tabs, Tab, TabsItems, TabsItem } from '../components/Tabs';
import { OrdersMap } from '../components/OrdersMap';
import { OrdersList } from '../components/OrdersList';
import { CreateOrderButton } from '../components/CreateOrderButton';
import { Input } from '../components/Input';
import { Filters } from '../components/Filters';
import { Timeline } from '../components/Timeline';

const URL_TABS = {
  '/list': 0,
  '/': 1,
  '/timeline': 2,
  '/calendar': 3,
};

const TAB_URLS = {
  0: '/list',
  1: '/',
  2: '/timeline',
  3: '/calendar',
};

export const Inbox = () => {
  const dispatch = useDispatch();

  const orders = useSelector(getOrders);

  const { isEmployee } = useAuth();
  const { pushNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = `${location.pathname}/`.slice(0, `${location.pathname}/`.lastIndexOf('/'));

  const [activeTab, setActiveTab] = React.useState(URL_TABS[pathname]);
  const [search, setSearch] = React.useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    setActiveTab(URL_TABS[pathname]);
  }, [pathname]);

  React.useEffect(() => {
    if (isEmployee) {
      navigate('/anytime');
      return;
    }

    fetchEmployees()
      .then((data) => {
        dispatch(setEmployees(data));
      });
  }, []);

  React.useEffect(() => {
    if (isEmployee || activeTab === 2) {
      return;
    }

    const filterKeys = Object.keys(Object.fromEntries([...searchParams]));

    const filters = filterKeys.reduce((acc, key) => {
      const values = searchParams.getAll(key);

      return {
        ...acc,
        [key]: values.length === 1 ? values[0] : values,
      };
    }, { unassigned: true, unscheduled: true });

    fetchOrders(filters)
      .then((data) => {
        dispatch(setOrders(data));
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong.. Please reload the page.' });
      });
  }, [searchParams]);

  const handleSearchChange = React.useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleSearchClear = () => {
    setSearch('');
  };

  // Temporary solution on front part for the search
  const filteredOrders = React.useMemo(() => (
    filterOrdersByQuery(orders, search)
  ), [orders, search]);

  const handleTabChange = React.useCallback((tabIndex) => {
    if (activeTab + tabIndex !== 1) {
      setSearchParams([]);
    }
    navigate(`${TAB_URLS[tabIndex]}${location.search}`, { replace: true });
  }, [activeTab, location.search, navigate, setSearchParams]);

  if (isEmployee) {
    return null;
  }

  return (
    <Container {...(activeTab === 1 && { width: 'full' })}>
      <Grid>
        <GridEl size="12">
          <Container withoutPaddings>
            <Grid space={SPACES.S} alignItems="flex-end">
              <GridEl size={{ xs: 'fluid', md: 5, lg: 3 }}>
                <Input
                  value={search}
                  icon={SearchIcon}
                  clearable
                  placeholder="Search"
                  onClear={handleSearchClear}
                  onChange={handleSearchChange}
                />
              </GridEl>
              {activeTab !== 2 && (
                <GridEl size={{ xs: 'auto', md: 0 }}>
                  <Filters />
                </GridEl>
              )}
              <GridEl size={{ xs: 12, md: 'fluid' }}>
                <Tabs active={activeTab} onChange={handleTabChange}>
                  <Tab id={0} icon={ListIcon}>List</Tab>
                  <Tab id={1} icon={MapMarkerIcon}>Map</Tab>
                  <Tab id={2} icon={TimelineIcon}>Timeline</Tab>
                  <Tab id={3} icon={CalendarIcon}>Calendar</Tab>
                </Tabs>
              </GridEl>
              {activeTab < 2 && (
                <GridEl size={{ xs: 0, md: 'auto' }}>
                  <Filters />
                </GridEl>
              )}
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
          <Timeline />
        </TabsItem>
        <TabsItem for={3}>
          <EmptyState
            title="Nothing here yet"
            text="Calendar will be displayed here. If you think this is an error - contact the administrator."
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
