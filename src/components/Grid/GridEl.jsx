import cx from 'classnames';

import styles from './Grid.module.scss';

export const GridEl = (props) => {
  const style = {};

  if (props.size) {
    if (props.size === 'fluid') {
      style.flex = 'auto';
    } else {
      style.width = `${props.size / 12 * 100}%`;
    }
  }

  return (
    <div className={cx({ [styles.filled]: props.filled })} style={style}>
      {props.children}
    </div>
  );
};
