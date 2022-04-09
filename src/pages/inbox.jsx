import React from 'react';

import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Grid, GridEl } from '../components/Grid';
import { Tabs, Tab, TabsItems, TabsItem } from '../components/Tabs';
import { OrdersMap } from '../components/OrdersMap';
import { OrdersList } from '../components/OrdersList';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as ListIcon } from '../assets/icons/list.svg';
import { ReactComponent as MapMarkerIcon } from '../assets/icons/map-marker.svg';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { ReactComponent as TimelineIcon } from '../assets/icons/timeline.svg';

export const Inbox = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const { user, isManager } = useAuth();

  const orders = [{ id: '001' }, { id: '002' }, { id: '003' }, { id: '004' }, { id: '005' }, { id: '006' }];

  if (isManager) {
    return (
      <Container {...(activeTab === 1 && { width: 'full' })}>
        <Grid>
          <GridEl size="12">
            <Container withoutPaddings>
              <Grid alignItems="flex-end" justifyContent="space-between">
                <GridEl size={{ xs: 12, md: 5, lg: 3 }}>
                  <Input 
                    icon={SearchIcon}
                    placeholder="Search"
                  />
                </GridEl>
                <GridEl size={{ xs: 12, md: 'auto', lg: 9 }}>
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
            <OrdersList orders={orders} />
          </TabsItem>
          <TabsItem for={1}>
            <OrdersMap orders={orders} />
          </TabsItem>
          <TabsItem for={2}>
            Calendar
          </TabsItem>
          <TabsItem for={3}>
            Timeline
          </TabsItem>
        </TabsItems>
      </Container>
    );
  }

  return (
    <Container>
      <Grid>
        <GridEl size="12">
          <Text size="h2">Hi {user.name} {user.surname}! (employee)</Text>
        </GridEl>
        <GridEl size="12">
          <Button to="/ui">
            UI components
          </Button>
        </GridEl>
      </Grid>
    </Container>
  );
};
