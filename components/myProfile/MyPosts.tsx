import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { getMyPost, deleteMyPost } from 'library/api/myprofile';
import { currentUser } from 'library/store/saveUser';
import { ModalLayout } from 'library/components/modal';
import Card from 'library/components/card/Card';
import { HeaderBox, MainContentCards } from 'styles/theme';
import { Post } from 'library/models/main';
import { setAlert } from 'library/store/setAlert';
import MyPostEditModal from './MyPostEditModal';

function MyPosts(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const [isAddModalActive, setAddModalActive] = useState<boolean>(false);
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState<number>(0);
  const [_deletePostId, setDeletePostId] = useState<number>(0);

  const { data } = useQuery('getMyPosts', async () => {
    const { status, data } = await getMyPost(user.token);
    return status === 200 && data;
  });

  const deleteMyPostAction = useMutation(([deletePostId, token]: [number, string]) =>
    deleteMyPost(deletePostId, token),
  );

  useEffect(() => {
    data && setMyPosts(data?.myPosts);
  }, [data]);

  const handlePostId = (id: number) => {
    setPostId(id);
    setAddModalActive(true);
  };

  const handleDeleteMyPost = async (deletePostId: number) => {
    const { status } = await deleteMyPostAction.mutateAsync([deletePostId, user.token]);
    if (status === 201) {
      const posts = myPosts.filter((post: Post) => post.id !== deletePostId);
      setMyPosts(posts);
    }
  };

  const getDeleteMyPostId = (deletePostId: number) => {
    setDeletePostId(deletePostId);
    dispatch(
      setAlert({
        alertMessage: '삭제 하시겠습니까?',
        onSubmit: () => {
          handleDeleteMyPost(deletePostId);
        },
        submitBtnText: '확인',
        closeBtnText: '취소',
      }),
    );
  };

  return (
    <Container>
      <HeaderBox width={100}>
        <div className="title">내 포스트</div>
      </HeaderBox>
      <MainContentCards>
        {myPosts.map((post: Post, idx: number) => {
          return (
            <Card
              key={idx}
              handlePostId={handlePostId}
              getDeleteMyPostId={getDeleteMyPostId}
              post={post}
              width={'288px'}
              space={'20px'}
            />
          );
        })}
        {isAddModalActive && (
          <ModalLayout>
            <MyPostEditModal
              post={myPosts.find(post => postId === post.id) as Post}
              setAddModalActive={setAddModalActive}
            />
          </ModalLayout>
        )}
      </MainContentCards>
    </Container>
  );
}

export default MyPosts;

const Container = styled.div`
  padding-top: 150px;
  @media (max-width: 375px) {
    padding-top: 60px;
  }
`;
