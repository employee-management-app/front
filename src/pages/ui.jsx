import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
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
      <h2>Checkbox</h2>
      <Checkbox>
        Default checkbox
      </Checkbox>
      <br /><br />
      <Checkbox invalid>
        Invalid checkbox
      </Checkbox>
      <br /><br />
    </Container>
  );
};
