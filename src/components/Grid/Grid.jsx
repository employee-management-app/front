import React from 'react';
import styles from './Grid.module.scss';

export const SPACES = {
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
};

const SPACES_VALUES = {
  S: '10px',
  M: '20px',
  L: '30px',
  XL: '40px',
};

const DEFAULT_SPACE = SPACES.M;

export const Grid = (props) => {
  const ref = React.useRef(null);

  const space = React.useMemo(() => (
    SPACES_VALUES[props.space || DEFAULT_SPACE]
  ), [props.space]);

  React.useEffect(() => {
    if (ref.current) {
      [...ref.current.children].forEach(child => {
        child.style.padding = `calc(${space} / 2)`;
      });
    }

  }, [space, props.children]);

  return (
    <div 
      ref={ref} 
      className={styles.grid} 
      style={{ 
        width: `calc(100% + ${space})`, 
        margin: `calc(${space} / -2)`,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
      }}>
      {props.children}
    </div>
  );
};
