/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-one-expression-per-line */
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppProvider from './hooks';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <AppProvider>
            <Routes />
          </AppProvider>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
