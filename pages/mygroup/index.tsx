import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import Contributors from 'components/myGroup/contributors/contributors';
import MyGroupBanner from 'components/myGroup/myGroupBanner/myGroupBanner';
import PostsOfTheWeek from 'components/myGroup/postsOfTheWeek/PostsOfTheWeek';
import SEO from 'library/components/Layout/SEO';
import Loading from 'library/components/loading/Loading';
import { currentUser } from 'library/store/saveUser';
import { HeaderBox } from 'styles/theme';

export default function MyGroupPage(): JSX.Element {
  const user = useSelector(currentUser);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <SEO title="내 기수 블로그" url="/mygroup">
      <MyPageContainer>
        <NthTitle>{user.batch.title}</NthTitle>
        <MyGroupBanner></MyGroupBanner>
        <ContentWrap>
          {user.isGroupJoined && (
            <Contribution>
              <HeaderBox width={128}>
                <div className="title">이주의 공헌</div>
              </HeaderBox>
              <Contributors />
            </Contribution>
          )}
          <ThisWeek>
            <PostsOfTheWeek />
          </ThisWeek>
        </ContentWrap>
      </MyPageContainer>
    </SEO>
  );
}

const MyPageContainer = styled.div`
  padding-top: 5rem;
  margin-bottom: 70px;
  background-color: ${({ theme }) => theme.background};
  ${({ theme }) => theme.sm`
    width: 100%;
  `}
`;

const NthTitle = styled.p`
  display: none;
  margin: 20px 0;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.orange};

  ${({ theme }) => theme.sm`
    display: block;
  `}
`;

const ContentWrap = styled.div`
  margin: 50px 3vw 0 3vw;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.sm`
  margin: 10px 3vw 0 3vw;
  `}
`;

const ThisWeek = styled.div`
  .btnUpdate {
    display: flex;
    justify-content: space-between;
    width: 250px;
    margin: 20px;
  }

  ${({ theme }) => theme.sm`
  .btnUpdate {
    margin: 20px 0;
    justify-content: center;
  }
  `}
`;

const Contribution = styled.div`
  margin: 6rem 0;
`;
