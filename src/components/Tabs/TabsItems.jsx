import React from 'react';

export const TabsItemsContext = React.createContext({
  active: 0,
});

export const TabsItems = ({ children, active }) => {
  return (
    <TabsItemsContext.Provider value={{ active }}>
      {children}
    </TabsItemsContext.Provider>
  );
};
