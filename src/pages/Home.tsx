import { useState } from 'react';

import ReactLogo from '../assets/react.svg';
import ViteLogo from '../assets/vite.svg';
import { Stack, Content, Text } from '../components/common';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <Content axis='y' spacing='medium' align='center'>
      <Stack axis='x' spacing='medium'>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={ViteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={ReactLogo} className='logo react' alt='React logo' />
        </a>
      </Stack>
      <Text variant='heading-1' color='primary'>
        Vite + React
      </Text>
      <Stack className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Text variant='body' color='secondary'>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Text>
      </Stack>
      <Text variant='body' color='secondary'>
        Click on the Vite and React logos to learn more
      </Text>
    </Content>
  );
};

export default Home;
