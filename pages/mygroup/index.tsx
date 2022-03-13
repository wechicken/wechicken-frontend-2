import { useEffect } from 'react';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash-es';
// import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Contributors from 'components/myGroup/contributors/contributors';
// import CustomCalendar from 'components/myGroup/customCalendar/customCalendar';
// import {
//   AddPostInputValue,
//   Bydays,
//   GroupByDate,
//   MyGroup,
//   UserPostsCounting,
// } from 'components/myGroup/myGroup.model';
import MyGroupBanner from 'components/myGroup/myGroupBanner/myGroupBanner';
// import PostsOfTheWeek from 'components/myGroup/postsOfTheWeek/PostsOfTheWeek';
// import BtnTheme from 'library/components/button/ButtonTheme';
import SEO from 'library/components/Layout/SEO';
import Loading from 'library/components/loading/Loading';
// import { ModalLayout } from 'library/components/modal';
// import PostEditor from 'library/components/postEditor/PostEditor';
// import { Obj } from 'library/models';
import { currentUser } from 'library/store/saveUser';
import { HeaderBox } from 'styles/theme';
// import { getUserFromStorage } from 'library/utils';

// const initialBydays = {
//   MON: [],
//   TUE: [],
//   WED: [],
//   THU: [],
//   FRI: [],
//   SAT: [],
//   SUN: [],
// };

export default function MyGroupPage(): JSX.Element {
  // const dispatch = useDispatch();
  const user = useSelector(currentUser);
  // const [isAddModalActive, setAddModalActive] = useState<boolean>(false);
  // const [byDays, setByDays] = useState<Bydays>(initialBydays);
  // const [userPostsCounting, setUserPostsCounting] = useState<UserPostsCounting>({});
  // const { data, isLoading, refetch } = useQuery<MyGroup>(
  //   ['MyGroup', user.token],
  //   () => getMyGroup(),
  //   {
  //     onSuccess: ({ by_days, userPostsCounting }) => {
  //       setByDays(by_days);
  //       setUserPostsCounting(userPostsCounting);
  //     },
  //   },
  // );

  // const { mutate: mutateCreatePost } = useMutation((body: Obj) => createPost(body), {
  //   onSuccess: () => refetch(),
  // });
  // const { mutate: mutateJoinGroup } = useMutation(() => joinGroup(), {
  //   onSuccess: () => refetch(),
  // });

  // useEffect(() => {
  //   if (isLoading || isNil(data)) return;
  //   dispatch(saveUser({ ...user, myGroupTitle: data.myGroup.title }));
  // }, [isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const closeAddPost = (): void => {
  //   setAddModalActive(false);
  // };

  // const handleAddPost = (body: AddPostInputValue): void => {
  //   mutateCreatePost(body);
  //   setAddModalActive(false);
  // };

  // const handleGroupJoined = (): void => {
  //   mutateJoinGroup();
  // };

  // const handleClickDate = ({ by_days, userPostsCounting }: GroupByDate): void => {
  //   setByDays(by_days);
  //   setUserPostsCounting(userPostsCounting);
  // };

  if (isEmpty(user)) {
    return <Loading />;
  }

  return (
    <SEO title="내 기수 블로그" url="/mygroup">
      <MyPageContainer>
        <NthTitle>TODO</NthTitle>
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
        </ContentWrap>
      </MyPageContainer>
      {/* <MyPageContainer>
        {isAddModalActive && (
          <ModalLayout closeModal={closeAddPost} closeOnClickDimmer={true}>
            <PostEditor name={data.myProfile.name} handleSubmit={handleAddPost} />
          </ModalLayout>
        )}
        <NthTitle>{data.myGroup.title ?? ''}</NthTitle>
        <MyGroupBanner ranking={data.Ranks} />
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
                <CustomCalendar handleClickDate={handleClickDate} data={data} />
                {data.is_group_joined && (
                  <BtnTheme
                    value="포스트 +"
                    handleFunction={() => {
                      setAddModalActive(true);
                    }}
                  />
                )}
              </div>
            </HeaderBox>
            <PostsOfTheWeek
              dayPosts={byDays}
              isGroupJoined={data.is_group_joined}
              executeFunction={handleGroupJoined}
            />
          </ThisWeek>
        </ContentWrap>
      </MyPageContainer> */}
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
