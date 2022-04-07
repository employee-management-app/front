import cx from 'classnames';

import styles from './Grid.module.scss';

export const GridEl = (props) => {
  const sizes = typeof props.size === 'object' ? props.size : { xs: props.size };
  const classNames = props.size 
    ? Object.keys(sizes).map((key) => styles[`${key}${sizes[key]}`])
    : [];

  return (
    <div className={cx(classNames, { [styles.filled]: props.filled })}>
      {props.children}
    </div>
  );
};
