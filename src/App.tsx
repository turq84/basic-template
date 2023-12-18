import { ThemeProvider } from '@emotion/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import theme from './constants/theme';
import { AriaLiveContextProvider } from './components/AriaLive';
import Home from './pages/Home';

// TODO: ADD ROUTES HERE
const router = createBrowserRouter([{ path: '/', element: <Home /> }]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AriaLiveContextProvider>
        <RouterProvider router={router} />
      </AriaLiveContextProvider>
    </ThemeProvider>
  );
}
