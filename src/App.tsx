import React, { useEffect } from 'react';
// import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';

import { EuiButton, EuiProvider, EuiText } from '@elastic/eui';
import { Page } from './components/Page';
import { useDispatch } from 'react-redux';
import { actions } from './redux/breadcrumbs-reducer';
import { BrowserRouter } from 'react-router-dom';

export const App: React.FC<PropsType> = () => {

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <EuiProvider colorMode="light">
          <Page />
        </EuiProvider>
      </BrowserRouter>
    </>
  );
}

type PropsType = {}
