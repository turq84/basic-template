import { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import ReactLogo from '../assets/react.svg';
import ViteLogo from '../assets/vite.svg';
import { Stack, Content, Text } from '../components/uikit';
import Layout from '../components/Layout';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <ContentContainer axis='y' spacing='medium' align='center'>
        <Stack axis='x' spacing='medium'>
          <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
            <Logo name='vite' src={ViteLogo} alt='Vite logo' />
          </a>
          <a href='https://react.dev' target='_blank' rel='noreferrer'>
            <Logo name='react' src={ReactLogo} alt='React logo' />
          </a>
        </Stack>
        <Text variant='heading-1' color='primary'>
          Vite + React
        </Text>
        <CardStack>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <Text variant='body' color='secondary'>
            Edit <code>src/App.tsx</code> and save to test HMR
          </Text>
        </CardStack>
        <Text variant='body' color='secondary'>
          Click on the Vite and React logos to learn more
        </Text>
      </ContentContainer>
    </Layout>
  );
};

export default Home;

const LogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ContentContainer = styled(Content)`
  top: 20vh;
  width: 100%;

  @media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) {
      animation: ${LogoSpin} infinite 20s linear;
    }
  }
`;

const Logo = styled.img<{ name: string }>`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: ${(props) =>
      props.name === 'react'
        ? 'drop-shadow(0 0 2em #61dafbaa)'
        : 'drop-shadow(0 0 2em #646cffaa)'};
  }
`;

const CardStack = styled(Stack)`
  padding: 2em;
`;
