import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { getMyPost, deleteMyPost, modifyPost } from 'library/api/myprofile';
import { ModalLayout } from 'library/components/modal';
import Card from 'library/components/card/Card';
import { HeaderBox, MainContentCards } from 'styles/theme';
import { Post } from 'library/models/main';
import { setAlert } from 'library/store/setAlert';
import Loading from 'library/components/loading/Loading';
import PostEditor from 'library/components/postEditor/PostEditor';
import find from 'lodash-es/find';
import { AddPostInputValue } from 'components/myGroup/myGroup.model';

function MyPosts(): JSX.Element {
  const dispatch = useDispatch();
  const [isEditPostActive, setIsEditPostActive] = useState<boolean>(false);
  const [toEditPost, setToEditPost] = useState<Post>();

  const { data, refetch } = useQuery('getMyPosts', async () => {
    return (await getMyPost()).myPosts;
  });

  const { mutate: mutateModifyPost } = useMutation(
    (params: { postId: number; title: string; link: string; date: string }) => modifyPost(params),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { mutate: mutateDeletePost } = useMutation(deleteMyPost, {
    onSuccess: () => {
      refetch();
    },
  });

  const handlePostId = (id: number): void => {
    const selectedPost = find(data, ['id', id]);

    setToEditPost(selectedPost);
    setIsEditPostActive(true);
  };

  const getDeleteMyPostId = (deletePostId: number): void => {
    dispatch(
      setAlert({
        alertMessage: '삭제 하시겠습니까?',
        onSubmit: () => {
          mutateDeletePost(deletePostId);
        },
      }),
    );
  };

  const handleSubmit = (formValue: AddPostInputValue): void => {
    if (toEditPost) {
      mutateModifyPost({ ...formValue, postId: toEditPost.id });
      closeEditPost();
    }
  };

  const closeEditPost = (): void => {
    setIsEditPostActive(false);
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <Container>
      <HeaderBox width={100}>
        <div className="title">내 포스트</div>
      </HeaderBox>
      <MainContentCards>
        {data.map((post: Post) => {
          return (
            <Card
              key={post.id}
              handlePostId={handlePostId}
              getDeleteMyPostId={getDeleteMyPostId}
              post={post}
              width={'288px'}
              space={'20px'}
            />
          );
        })}
        {isEditPostActive && (
          <ModalLayout closeModal={closeEditPost} closeOnClickDimmer={true}>
            <PostEditor handleSubmit={handleSubmit} post={toEditPost} />
          </ModalLayout>
        )}
      </MainContentCards>
    </Container>
  );
}

export default MyPosts;

const Container = styled.div`
  padding-top: 9.375rem;
  @media (max-width: 375px) {
    padding-top: 3.75rem;
  }
`;
