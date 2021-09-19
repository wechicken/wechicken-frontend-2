import { useEffect } from 'react';
import styled from '@emotion/styled';
import ProfileColumn from 'components/myProfile/ProfileColumn';
import MyPosts from 'components/myProfile/MyPosts';

export default function MyProfilePage(): JSX.Element {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MyPageContainer>
      <ProfileColumn />
      <MyPosts />
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  color: ${({ theme }) => theme.orange};
  padding: 0 1.5rem;
`;
