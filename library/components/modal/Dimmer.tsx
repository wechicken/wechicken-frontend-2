import React, { useEffect } from 'react';
import styled from '@emotion/styled';

const Dimmer = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return <Container />;
};

export default Dimmer;

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
`;
