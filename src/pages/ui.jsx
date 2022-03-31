import React from 'react';

import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { ReactComponent as CommentIcon } from '../assets/icons/comment.svg';

export const UI = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const openModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onModalClose = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
      <br /><br />
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
      <h2>Checkbox</h2>
      <Checkbox>
        Default checkbox
      </Checkbox>
      <br /><br />
      <Checkbox invalid>
        Invalid checkbox
      </Checkbox>
      <br /><br />
      <h2>Modal</h2>
      <Button onClick={openModal}>
        Open modal
      </Button>
      <Modal 
        title="Modal title"
        isOpen={isModalOpen} 
        onClose={onModalClose}
      >
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
      </Modal>
    </Container>
  );
};
