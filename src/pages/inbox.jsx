import { Button } from '../components/Button';

import { Container } from '../components/Container';
import { Grid, GridEl } from '../components/Grid';
import { useAuth } from '../hooks/useAuth';

export const Inbox = () => {
  const { onLogout } = useAuth();

  return (
    <Container>
      <Grid>
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
      </Grid>
    </Container>
  );
};
