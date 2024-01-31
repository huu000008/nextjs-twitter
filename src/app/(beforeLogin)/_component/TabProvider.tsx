'use client';

import React, { ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const TabContext = createContext({
  activeTab: 0,
  setActiveTab: (value: number) => {},
});

export default function TabProvider({ children }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}
