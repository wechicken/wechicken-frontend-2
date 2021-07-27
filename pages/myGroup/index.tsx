import styled from '@emotion/styled';
import axios from 'axios';
import Loading from 'library/components/loading/Loading';
import { API_URL } from 'library/constants';
import { fetchApi } from 'library/utils';
import { isNil } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const innerWidthLimit = 375;
const tempUser = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNiwid2Vjb2RlX250aCI6MTQsImlhdCI6MTYyNzM2OTU1MH0.b8iTrY1FdcQjLlkcOx5v1nBbiFT4krjJ3rCe-I7SmmU',
  profile: 'https://jwtbucket.s3.ap-northeast-2.amazonaws.com/profilepic.png',
  myGroupStatus: true,
  myNth: 14,
  master: false,
};

export default function MyGroup() {
  const [isGroupTitleVisible, setIsGroupTitleVisible] = useState<boolean>(false);
  const { data, isLoading } = useQuery('MyGroup', () => {
    return fetchApi(
      axios.get(`${API_URL}/mygroup`, { headers: { Authorization: tempUser.token } }),
    );
  });

  useEffect(() => {
    window.innerWidth <= innerWidthLimit && setIsGroupTitleVisible(true);
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <MyPageContainer>
      <NthTitle>{isGroupTitleVisible ? data.myGroup.title : ''}</NthTitle>
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

const ThisWeek = styled.div`
  .btnUpdate {
    display: flex;
    justify-content: space-between;
    width: 200px;
    margin: 20px;
  }

  @media (max-width: 375px) {
    .btnUpdate {
      margin: 20px 0;
      justify-content: center;
    }
  }
`;

const Contribution = styled.div`
  margin: 100px 0;
`;
