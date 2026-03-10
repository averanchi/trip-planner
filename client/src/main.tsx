import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App';
import Store from './store/store';
import React from 'react';

interface State {
  store: Store

}

const store = new Store();

export const Context = React.createContext<State>({
  store
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </StrictMode>,
)
