import styled from '@emotion/styled';
import Contributors from 'components/myGroup/contributors/contributors';
import { Bydays, GroupByDate, MyGroup, UserPostsCounting } from 'components/myGroup/myGroup.model';
import MyGroupBanner from 'components/myGroup/myGroupBanner/myGroupBanner';
import CustomCalendar from 'components/myGroup/customCalendar/customCalendar';
import Loading from 'library/components/loading/Loading';
import { isNil } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { HeaderBox } from 'styles/theme';
import BtnTheme from 'library/components/button/ButtonTheme';
import PostsOfTheWeek from 'components/myGroup/postsOfTheWeek/PostsOfTheWeek';
import { getMyGroup } from 'library/api/mygroup';

const innerWidthLimit = 375;

const initialBydays = {
  MON: [],
  TUE: [],
  WED: [],
  THU: [],
  FRI: [],
  SAT: [],
  SUN: [],
};

export default function MyGroupPage() {
  const [isGroupTitleVisible, setIsGroupTitleVisible] = useState<boolean>(false);
  const [isAddModalActive, setAddModalActive] = useState<boolean>(false);
  const [byDays, setByDays] = useState<Bydays>(initialBydays);
  const [userPostsCounting, setUserPostsCounting] = useState<UserPostsCounting>({});
  const { data, isLoading } = useQuery<MyGroup>('MyGroup', () => getMyGroup(), {
    onSuccess: ({ by_days, userPostsCounting }) => {
      setByDays(by_days);
      setUserPostsCounting(userPostsCounting);
    },
  });

  useEffect(() => {
    window.innerWidth <= innerWidthLimit && setIsGroupTitleVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const handleGroupJoined = (): void => {
    // TODO 나중에 채워넣을것
  };

  const handleClickDate = ({ by_days, userPostsCounting }: GroupByDate): void => {
    setByDays(by_days);
    setUserPostsCounting(userPostsCounting);
  };

  if (isLoading || isNil(data)) {
    return <Loading></Loading>;
  }

  return (
    <MyPageContainer>
      {isAddModalActive && <div className="addPostModal">{/* TODO 나중에  추가할것 */}</div>}
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
              postsCounting={userPostsCounting}
              myContribution={data.myProfile}
              contributor={data.users}
            />
          </Contribution>
        )}
        <ThisWeek>
          <HeaderBox width={149}>
            <div className="title">이주의 포스팅</div>
            <div className="btnUpdate">
              <CustomCalendar handleClickDate={handleClickDate}></CustomCalendar>
              {data.is_group_joined && (
                <BtnTheme
                  value="포스트 +"
                  handleFunction={() => {
                    setAddModalActive(true);
                  }}
                ></BtnTheme>
              )}
            </div>
          </HeaderBox>
          <PostsOfTheWeek
            dayPosts={byDays}
            isGroupJoined={data.is_group_joined}
            executeFunction={handleGroupJoined}
          ></PostsOfTheWeek>
        </ThisWeek>
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
