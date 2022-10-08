import React from 'react';
import { useDispatch } from 'react-redux';

import { updateOrder } from '../../services/updateOrder';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { Modal } from '../Modal';
import { OrderActions } from '../OrderActions';
import { Textarea } from '../Textarea';
import { Field } from '../Field';
import { Button } from '../Button';
import { Grid, GridEl, SPACES } from '../Grid';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { setOrder } from '../../store';

export const MessageModal = ({ orderId }) => {
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const { isVisible, hideAllModals } = useModalVisibility('ManagerMessageModal');

  const getConfig = () => ({
    employeeMessage: {
      value: OrderActions.employeeMessage,
    },
    managerMessage: {
      value: OrderActions.managerMessage,
    },
  });

  const {
    fields,
    isTouched,
    isLoading,
    setIsLoading,
    onValueChange,
    onSubmit,
  } = useForm(getConfig);

  const handleSubmit = React.useCallback(() => {
    onSubmit();

    if (!isTouched) {
      hideAllModals();

      return;
    }

    setIsLoading(true);

    updateOrder(orderId, fields)
      .then((data) => {
        dispatch(setOrder(data));

        pushNotification({
          theme: 'success',
          content: 'Message successfully updated!',
        });
      })
      .catch(() => {
        pushNotification({ theme: 'error', content: 'Something went wrong! Try again..' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, fields, hideAllModals, isTouched, onSubmit, orderId, pushNotification, setIsLoading]);

  return (
    <Modal>
      <form
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid space={SPACES.XL}>
          <GridEl size="12">
            <Field label={isVisible ? 'lol' : 'kek'}>
              {isVisible ? (
                <Textarea
                  value={fields.managerMessage}
                  placeholder="lol"
                  size="medium"
                  onChange={(e) => onValueChange(e, 'managerMessage')}
                />
              ) : (
                <Textarea
                  value={fields.employeeMessage}
                  placeholder="lol"
                  size="medium"
                  onChange={(e) => onValueChange(e, 'employeeMessage')}
                />
              )}
            </Field>
          </GridEl>
          <GridEl size="12">
            <Button type="submit" loading={isLoading}>Confirm</Button>
          </GridEl>
        </Grid>
      </form>
    </Modal>
  );
};
