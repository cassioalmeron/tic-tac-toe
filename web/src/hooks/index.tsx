import React from 'react';

import { KeyPressedProvider } from './keyPressed';

const AppProvider: React.FC = ({ children }) => (
  <KeyPressedProvider>{children}</KeyPressedProvider>
);

export default AppProvider;
