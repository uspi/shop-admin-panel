import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';

import { EuiButton, EuiProvider, EuiText } from '@elastic/eui';

const App = () => {
  return (
    <EuiProvider colorMode="light">
     
      <EuiText>
        <h1>This is Heading One</h1>
        <p>Hello man, i'm glad to seem you</p>
      </EuiText>
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and safffve to reload.
        </p>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <EuiButton>Кнопка</EuiButton>
          Learn React
        </a>
      </header>
    </div>
    </EuiProvider>
  );
}

export default App;
