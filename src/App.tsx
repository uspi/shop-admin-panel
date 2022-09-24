import React from 'react';
// import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';

import { EuiButton, EuiProvider, EuiText } from '@elastic/eui';
import { MainApp } from './components/MainApp';
import { Page } from './components/Page';

export const App: React.FC<PropsType> = () => {
  const flag: boolean = false
  return (
    <>
      {flag ? (
        <EuiProvider colorMode="light">
          <EuiText>
            <h1>This is Heading One</h1>
            <p>Hello man, i'm glad to seem you</p>
          </EuiText>
          <EuiButton>Кнопка</EuiButton>
        </EuiProvider>) 
        : 
        (
        <EuiProvider colorMode="light">
          <Page/>
        </EuiProvider>

      )
      }
    </>
  );
}

type PropsType = {}
