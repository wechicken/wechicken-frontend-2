import styled from '@emotion/styled';

export default function MyGroup() {
  return <MyPageContainer>MyPage</MyPageContainer>;
}

const MyPageContainer = styled.div`
  color: ${({ theme }) => theme.orange};
`;
