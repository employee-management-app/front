import { Link } from 'react-router-dom';
import cx from 'classnames';

import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg';

import styles from './Button.module.scss';

export const Button = (props) => {
  const classNames = cx(styles.button, { 
    [styles[props.width]]: props.width,
    [styles[props.theme]]: props.theme,
    [styles[props.size]]: props.size,
    [styles.loading]: props.loading,
    [styles.disabled]: props.disabled,
  });

  const content = () => (
    <>
      {props.loading ? <SpinnerIcon /> : (props.icon && <props.icon />)}
      {props.children && <span className={styles.text}>{props.children}</span>}
    </>
  );

  if (props.href) {
    return (
      <a href={props.href} target={props.target} className={classNames}>
        {content()}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link to={props.to} target={props.target} className={classNames}>
        {content()}
      </Link>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      disabled={props.loading || props.disabled}
      className={classNames}
      onClick={props.onClick}
    >
      {content()}
    </button>
  );
};
