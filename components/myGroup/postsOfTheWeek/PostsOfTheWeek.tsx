import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { assign, cloneDeep, isEmpty } from 'lodash-es';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { createPost, getBatchPostsByDate } from 'library/api';
import BtnTheme from 'library/components/button/ButtonTheme';
import { ModalLayout } from 'library/components/modal';
import PostEditor from 'library/components/postEditor/PostEditor';
import { BatchesByWeek, PostEditorInput } from 'library/models';
import { currentUser } from 'library/store/saveUser';
import { flexCenter, HeaderBox } from 'styles/theme';
import CustomCalendar from '../customCalendar/customCalendar';
import DayColumn from './DayColumn';
import MyGroupJoinModal from './MyGroupJoinModal';

const BASE_POST_BY_WEEK = {
  sun: [],
  mon: [],
  tue: [],
  wed: [],
  thu: [],
  fri: [],
  sat: [],
};

export default function PostsOfTheWeek(): JSX.Element {
  const [postsByWeek, setPostsByWeek] = useState<BatchesByWeek>(cloneDeep(BASE_POST_BY_WEEK));
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

  const user = useSelector(currentUser);
  const { refetch } = useQuery(
    ['getBatchPostsByDate', user.batch.nth, date],
    () => getBatchPostsByDate(user.batch.nth, date),
    {
      onSuccess: posts => {
        if (!isEmpty(posts)) {
          setPostsByWeek(assign(cloneDeep(BASE_POST_BY_WEEK), posts));

          return;
        }

        setPostsByWeek(BASE_POST_BY_WEEK);
      },
    },
  );
  const [isAddModalActive, setAddModalActive] = useState<boolean>(false);
  const { mutate: mutateCreatePost } = useMutation((body: PostEditorInput) => createPost(body), {
    onSuccess: () => {
      refetch();
    },
  });

  const joinGroup = (): void => {
    // TODO api 연결필요
  };

  const closeAddPost = (): void => {
    setAddModalActive(false);
  };

  const handleAddPost = (body: PostEditorInput): void => {
    mutateCreatePost(body);

    setAddModalActive(false);
  };

  const handleChangeDate = (date: string): void => {
    setDate(date);
  };

  return (
    <>
      {isAddModalActive && (
        <ModalLayout closeModal={closeAddPost} closeOnClickDimmer={true}>
          <PostEditor name={user.name} handleSubmit={handleAddPost} />
        </ModalLayout>
      )}
      <HeaderBox width={149}>
        <div className="title">이주의 포스팅</div>
        <div className="btnUpdate">
          <CustomCalendar handleClickDate={handleChangeDate} date={date} />
          {user.isGroupJoined && (
            <BtnTheme
              value="포스트 +"
              handleFunction={() => {
                setAddModalActive(true);
              }}
            />
          )}
        </div>
      </HeaderBox>
      <Wrap>
        {!user.isGroupJoined && <MyGroupJoinModal executeFunction={joinGroup} />}
        <Container isGroupJoined={user.isGroupJoined}>
          <DayColumns>
            <DayColumn day="SUN" dayPosts={postsByWeek.sun}></DayColumn>
            <DayColumn day="MON" dayPosts={postsByWeek.mon}></DayColumn>
            <DayColumn day="TUE" dayPosts={postsByWeek.tue}></DayColumn>
            <DayColumn day="WED" dayPosts={postsByWeek.wed}></DayColumn>
            <DayColumn day="THU" dayPosts={postsByWeek.thu}></DayColumn>
            <DayColumn day="FRI" dayPosts={postsByWeek.fri}></DayColumn>
            <DayColumn day="SAT" dayPosts={postsByWeek.sat}></DayColumn>
          </DayColumns>
        </Container>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  position: relative;
  ${flexCenter};
`;

const Container = styled.div<{ isGroupJoined: boolean }>`
  height: 560px;
  margin: 24px 2vw 0;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  border-radius: 35px;

  ::-webkit-scrollbar {
    display: none;
  }
  ${({ isGroupJoined }) =>
    !isGroupJoined &&
    css`
      filter: blur(4px);
    `}

  ${({ theme }) => theme.sm`
    box-shadow: none;
  `}
`;

const DayColumns = styled.div`
  display: flex;
  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.yellow};
    border-radius: 10px;
  }
`;
