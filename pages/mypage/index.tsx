/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { getMyProfile } from 'library/api';
import Alert from 'library/components/alert/Alert';
import ProfileColumn from 'components/myPage/ProfileColumn';
import { currentUser } from 'library/store/saveUser';
import MyPosts from 'components/myPage/MyPosts';
import { MyProfile } from 'library/models';

export default function MyPage(): JSX.Element {
  const user = useSelector(currentUser);
  const [myProfile, setMyProfile] = useState<MyProfile>();
  const [isActiveAlert, setIsActiveAlert] = useState<boolean>(false);
  const [deletePostId, setDeletePostId] = useState<number>(0);
  const [myPosts, setMyPosts] = useState<[]>([]);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ3ZWNvZGVfbnRoIjoxMCwiaWF0IjoxNjMwMzMzMTkyfQ.2XhWj6BV4Zl3L4K-iSXuAErK-I4GjeqUzP5DXLnsY2g';
  const { data, isLoading, isError } = useQuery('getMyProfile', async () => {
    const { status, data } = await getMyProfile(token);
    return status === 200 && data;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    data && setMyProfile(data?.mypage);
  }, [data]);

  const deleteProfileImg = (deleteTarget: string) => {
    console.log(deleteTarget);
  };

  const deleteMyPost = (deletePostId: number) => {
    console.log(deletePostId);
  };

  const getDeleteMyPostId = (deletePostId: number) => {
    setDeletePostId(deletePostId);
    setIsActiveAlert(true);
  };

  return (
    <MyPageContainer>
      <ProfileColumn deleteProfileImg={deleteProfileImg} myProfile={myProfile} />
      <MyPosts getDeleteMyPostId={getDeleteMyPostId} myPosts={myPosts} setMyPosts={setMyPosts} />

      {isActiveAlert && (
        <Alert
          setActiveAlert={setIsActiveAlert}
          alertMessage={'삭제 하시겠습니까?'}
          excuteFunction={() => {
            deleteMyPost(deletePostId);
          }}
          submitBtn={'확인'}
          closeBtn={'취소'}
        />
      )}
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  color: ${({ theme }) => theme.orange};
`;
