import React from 'react';

import styles from './Tabs.module.scss';

export const TabsContext = React.createContext({
  active: 0,
  setActive: () => {},
});

export const Tabs = ({ children, onChange, ...props }) => {
  const [active, setActive] = React.useState(props.active);

  React.useEffect(() => {
    onChange(active);
  }, [active]);

  return (
    <div className={styles.tabs}>
      <TabsContext.Provider value={{ active, setActive }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
};
