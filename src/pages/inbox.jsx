import React from 'react';
import axios from 'axios';

import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Grid, GridEl } from '../components/Grid';
import { useAuth } from '../hooks/useAuth';

export const Inbox = () => {
  const [employees, setEmployees] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const { onLogout, user, isManager } = useAuth();

  // Temporary example of communication with API
  const getEmployees = () => {
    axios.get(`http://127.0.0.1:8000/api/employees`)
      .then(({ data }) => {
        setEmployees(data || []);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <Container>
      <Grid>
        <GridEl size="12">
          <Text size="h2">Hi {user.name} {user.surname}! ({isManager ? 'manager' : 'employee'})</Text>
        </GridEl>
        <GridEl size="12">
          <Button to="/ui">
            UI components
          </Button>
        </GridEl>
        <GridEl size="12">
          <Button onClick={onLogout}>
            Log out
          </Button>
        </GridEl>
        {/* Temporary example of communication with API */}
        {isManager && (
          <GridEl size="12">
            <Grid>
              {!employees && (
                <GridEl size="12">
                  <Button onClick={getEmployees}>
                    Get employees
                  </Button>
                </GridEl>
              )}
              {employees && !employees.length && (
                <GridEl size="12">
                  No employees in your local database
                </GridEl>
              )}
              {employees && (
                <GridEl size="12">
                  <Grid>
                    {employees.map(({ firstName, lastName, age, optional }) => (
                      <GridEl size="12">
                        <Text size="h3">{firstName} {lastName}</Text>
                        <Text>{age} y.o.</Text>
                        <Text>Info: {optional}</Text>
                      </GridEl>
                    ))}
                  </Grid>
                </GridEl>
              )}
              {isError && (
                <GridEl size="12">
                  Check if local API is running on http://127.0.0.1:8000/api<br />
                  And also check if API_URL=http://127.0.0.1:8000/api is not missing in your .env.local file
                </GridEl>
              )}
            </Grid>
          </GridEl>
        )}
      </Grid>
    </Container>
  );
};
