import styled from '@emotion/styled';

export default function MyPage() {
  return <MyPageContainer>MyPage</MyPageContainer>;
}

const MyPageContainer = styled.div`
  color: ${({ theme }) => theme.orange};
`;
