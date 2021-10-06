import { useEffect } from 'react';
import styled from '@emotion/styled';
import ProfileColumn from 'components/myProfile/ProfileColumn';
import MyPosts from 'components/myProfile/MyPosts';
import SEO from 'library/components/Layout/SEO';

export default function MyProfilePage(): JSX.Element {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SEO title="마이페이지" url='/myprofile'>
      <MyPageContainer>
        <ProfileColumn />
        <MyPosts />
      </MyPageContainer>
    </SEO>
  );
}

const MyPageContainer = styled.div`
  color: ${({ theme }) => theme.orange};
  padding: 0 1.5rem;
`;
