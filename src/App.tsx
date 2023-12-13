import { ThemeProvider } from '@emotion/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import theme from './constants/theme';
import { AriaLiveContextProvider } from './components/common';
import Home from './pages/Home';
import './App.css';

type Props = {
  children: React.ReactNode;
};

// TODO: ADD ROUTES HERE
const router = createBrowserRouter([{ path: '/', element: <Home /> }]);

export default function App() {
  return (
    <Document>
      <ThemeProvider theme={theme}>
        <AriaLiveContextProvider>
          <RouterProvider router={router} />
        </AriaLiveContextProvider>
      </ThemeProvider>
    </Document>
  );
}

const Document = ({ children }: Props) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <title>Vite + React</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
