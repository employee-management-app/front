import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ReactComponent as CommentIcon } from '../assets/icons/comment.svg';

export const UI = () => {
  return (
    <Container>
      <h2>Buttons</h2>
      <Button icon={CommentIcon} />
      <br /><br />
      <Button>
        Default button
      </Button>
      <br /><br />
      <Button icon={CommentIcon}>
        Button with icon
      </Button>
      <br /><br />
      <Button size="medium">
        Button size medium
      </Button>
      <br /><br />
      <Button width="full">
        Button full width
      </Button>
      <br /><br />
      <Button width="full" size="medium">
        Button full width size medium
      </Button>
      <br /><br />
      <Button theme="success">
        Success button
      </Button>
      <br /><br />
      <Button theme="danger">
        Danger button
      </Button>
      <h2>Inputs</h2>
      <Input placeholder="Default input" />
      <br /><br />
      <Input placeholder="Invalid input" invalid />
      <br /><br />
      <Input placeholder="Input with icon" icon={CommentIcon} />
      <br /><br />
      <Input placeholder="Input size medium" size="medium" />
      <br /><br />
      <Input placeholder="Invalid input size medium" size="medium" invalid />
      <br /><br />
      <Input placeholder="Input size medium with icon" size="medium" icon={CommentIcon} />
      <br /><br />
    </Container>
  );
};
