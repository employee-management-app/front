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

const orders = [
  {
    id: '001',
    name: 'Magorzata Walernrowicz',
    type: 'Pomiar rolety',
    date: new Date(),
    address: {
      code: '50-370',
      city: 'Wrocław',
      street: 'Wyb. Wyspiańskiego',
      house: '27',
      lat: 51.08764387181116, 
      lng: 17.062563712823876,
    },
    phone: '+48 607 210 922',
    mail: 'mail@mail.com',
    description: 'Potrzebne 7 moskiter do 2-skrzydłowych okien + jedna do drzwi balkonowych',
    priority: 'high',
    assigned: null,
    orderDate: null,
  },
  {
    id: '002',
    name: 'Magorzata Walernrowicz',
    type: 'Pomiar rolety',
    date: new Date(),
    address: {
      code: '50-370',
      city: 'Wrocław',
      street: 'Wyb. Wyspiańskiego',
      house: '27',
      lat: 51.10158387181116, 
      lng: 17.052368712823876,
    },
    phone: '+48 607 210 922',
    mail: 'mail@mail.com',
    description: 'Potrzebne 7 moskiter do 2-skrzydłowych okien + jedna do drzwi balkonowych',
    priority: 'very-low',
    assigned: 'Michał Wożnicki',
    orderDate: null,
  },
  {
    id: '003',
    name: 'Magorzata Walernrowicz',
    type: 'Pomiar rolety',
    date: new Date(),
    address: {
      code: '50-370',
      city: 'Wrocław',
      street: 'Wyb. Wyspiańskiego',
      house: '27',
      lat: 51.12768387181116, 
      lng: 17.042668712823876,
    },
    phone: '+48 607 210 922',
    mail: 'mail@mail.com',
    description: 'Potrzebne 7 moskiter do 2-skrzydłowych okien + jedna do drzwi balkonowych',
    priority: 'normal',
    assigned: null,
    orderDate: new Date(),
  },
  {
    id: '004',
    name: 'Magorzata Walernrowicz',
    type: 'Pomiar rolety',
    date: new Date(),
    address: {
      code: '50-370',
      city: 'Wrocław',
      street: 'Wyb. Wyspiańskiego',
      house: '27',
      lat: 51.12168387181116, 
      lng: 17.022168712823876,
    },
    phone: '+48 607 210 922',
    mail: 'mail@mail.com',
    description: 'Potrzebne 7 moskiter do 2-skrzydłowych okien + jedna do drzwi balkonowych',
    priority: 'very-high',
    assigned: null,
    orderDate: null,
  },
  {
    id: '005',
    name: 'Magorzata Walernrowicz',
    type: 'Pomiar rolety',
    date: new Date(),
    address: {
      code: '50-370',
      city: 'Wrocław',
      street: 'Wyb. Wyspiańskiego',
      house: '27',
      lat: 51.10788387181116, 
      lng: 17.062868712823876,
    },
    phone: '+48 607 210 922',
    mail: 'mail@mail.com',
    description: 'Potrzebne 7 moskiter do 2-skrzydłowych okien + jedna do drzwi balkonowych',
    priority: 'very-low',
    assigned: null,
    orderDate: null,
  },
];

export const Inbox = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  const { user, isManager } = useAuth();

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
