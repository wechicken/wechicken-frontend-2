import styled from '@emotion/styled';

export default function Home() {
  return <HomeContainer>Wechicken 2.0!</HomeContainer>;
}

const HomeContainer = styled.div`
  color: ${({ theme }) => theme.orange};
`;
