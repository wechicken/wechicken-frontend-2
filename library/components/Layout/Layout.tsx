import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Nav from 'components/nav/Nav';
import { useIntersectionObserver } from 'library/hooks';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [isBlurred, setBlurred] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: ref,
    onIntersect: () => {
      setBlurred(true);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LayoutBox>
      <Nav isBlurred={isBlurred} setBlurred={setBlurred} />
      <main>{children}</main>
      <Observer ref={ref} />
    </LayoutBox>
  );
}

const LayoutBox = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.background};
`;

const Observer = styled.div`
  position: absolute;
  top: calc(100vh + 213px);
  height: 10px;
  width: 3px;
`;
