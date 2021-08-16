import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Alert from 'library/components/alert/Alert';
import ProfileColumn from 'components/myPage/ProfileColumn';
import MyPosts from 'components/myPage/MyPosts';

export default function MyPage(): JSX.Element {
  const [myProfile] = useState({});
  const [isActiveAlert, setIsActiveAlert] = useState<boolean>(false);
  const [deletePostId, setDeletePostId] = useState<number>(0);
  const [myPosts, setMyPosts] = useState<[]>([]);

  useEffect(() => {
    // window.scrollTo(0, 0);
    // axios
    //   .get(`${API_URL}/mypage`, {
    //     headers: {
    //       Authorization: JSON.parse(sessionStorage.getItem('USER'))?.token,
    //     },
    //   })
    //   .then(res => setMyProfile(res.data.mypage));
  }, []);

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
