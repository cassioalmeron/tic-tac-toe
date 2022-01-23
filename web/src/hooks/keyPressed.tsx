import React, { createContext, useCallback, useContext, useState } from 'react';

type KeyPressedState = {
  keyPressed: string;
};

interface KeyPressedContextData {
  keyPressed: string;
  setKeyPressed: (key: string) => void;
}

const KeyPressedContext = createContext<KeyPressedContextData>(
  {} as KeyPressedContextData,
);

const localStorageTokenKey = '@tictactoe:keyPressed';

export const KeyPressedProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<KeyPressedState>(() => {
    const keyPressed = localStorage.getItem(localStorageTokenKey);

    return { keyPressed } as KeyPressedState;
  });

  const setKeyPressed = useCallback(
    async (keyPressed: string): Promise<void> => {
      localStorage.setItem(localStorageTokenKey, keyPressed);

      setData({ keyPressed });
    },
    [],
  );

  return (
    <KeyPressedContext.Provider
      value={{ keyPressed: data.keyPressed, setKeyPressed }}
    >
      {children}
    </KeyPressedContext.Provider>
  );
};

export function useKeyPressed(): KeyPressedContextData {
  const context = useContext(KeyPressedContext);

  if (!context) throw new Error('useKey must be used within an KeyProvider');

  return context;
}
