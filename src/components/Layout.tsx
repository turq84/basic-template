import React from 'react';
import styled from '@emotion/styled';
// import { useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  // const location = useLocation(); // TODO: UNCOMMENT

  // TODO: ADD SEO COMPONENT AND PASS IN LOCATION

  return (
    <PageWrapper>
      {/* TODO: ADD HEADER */}
      <Main>{children}</Main>
      {/* TODO: ADD FOOTER */}
    </PageWrapper>
  );
};
export default Layout;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  max-height: 100vh;
`;

const Main = styled.main`
  flex: 1 0 auto;
`;
