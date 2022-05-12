import { Container } from '../components/Container';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';

export const Completed = () => {
  return (
    <Container>
      <EmptyState 
        title="Nothing here yet"
        text="Completed measurements will be displayed here. If you think this is an error - contact the administrator."
        action={
          <Button>Contact the administrator</Button>
        }
      />
    </Container>
  );
};
