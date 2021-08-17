import styled from '@emotion/styled';
import Contributors from 'components/myGroup/contributors/contributors';
import { MyGroup } from 'components/myGroup/myGroup.model';
import MyGroupBanner from 'components/myGroup/myGroupBanner/myGroupBanner';
import { apiClient } from 'library/api/apiClient';
import Loading from 'library/components/loading/Loading';
import { API_URL } from 'library/constants';
import { isNil } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { HeaderBox } from 'styles/theme';

const innerWidthLimit = 375;
const tempUser = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNiwid2Vjb2RlX250aCI6MTQsImlhdCI6MTYyNzM2OTU1MH0.b8iTrY1FdcQjLlkcOx5v1nBbiFT4krjJ3rCe-I7SmmU',
  profile: 'https://jwtbucket.s3.ap-northeast-2.amazonaws.com/profilepic.png',
  myGroupStatus: true,
  myNth: 14,
  master: false,
};

export default function MyGroupPage() {
  const [isGroupTitleVisible, setIsGroupTitleVisible] = useState<boolean>(false);
  const { data, isLoading } = useQuery<MyGroup>('MyGroup', () => {
    return apiClient
      .get(`${API_URL}/mygroup`, { headers: { Authorization: tempUser.token } })
      .then(res => res.data);
  });

  useEffect(() => {
    window.innerWidth <= innerWidthLimit && setIsGroupTitleVisible(true);
    window.scrollTo(0, 0);
  }, []);

  if (isLoading || isNil(data)) {
    return <Loading></Loading>;
  }

  return (
    <MyPageContainer>
      <NthTitle>{isGroupTitleVisible ? data.myGroup.title : ''}</NthTitle>
      <MyGroupBanner ranking={data.Ranks}></MyGroupBanner>
      <ContentWrap>
        {data.is_group_joined && (
          <Contribution>
            <HeaderBox width={128}>
              <div className="title">이주의 공헌</div>
            </HeaderBox>
            <Contributors
              myGroup={data.myGroup}
              postsCounting={data.userPostsCounting}
              myContribution={data.myProfile}
              contributor={data.users}
            />
          </Contribution>
        )}
      </ContentWrap>
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  padding-top: 130px;
  margin-bottom: 70px;
  background-color: ${({ theme }) => theme.background};
`;

const NthTitle = styled.p`
  margin: 20px 0;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.orange};
`;

const ContentWrap = styled.div`
  margin: 50px 3vw 0 3vw;
  display: flex;
  flex-direction: column;

  @media (max-width: 375px) {
    margin: 10px 3vw 0 3vw;
  }
`;

const Contribution = styled.div`
  margin: 100px 0;
`;
