import React, { useState } from 'react';
import styled from '@emotion/styled';
import find from 'lodash-es/find';
import { useQuery, useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { getMyPost, deleteMyPost, modifyPost } from 'library/api/myprofile';
import Card from 'library/components/card/Card';
import Loading from 'library/components/loading/Loading';
import { ModalLayout } from 'library/components/modal';
import PostEditor from 'library/components/postEditor/PostEditor';
import { PostEditorInput, Post } from 'library/models';
import { setAlert } from 'library/store/setAlert';
import { HeaderBox, PostWrapper } from 'styles/theme';

function MyPosts(): JSX.Element {
  const dispatch = useDispatch();
  const [isEditPostActive, setIsEditPostActive] = useState<boolean>(false);
  const [toEditPost, setToEditPost] = useState<Post>();

  const { data, refetch } = useQuery('getMyPosts', async () => {
    return (await getMyPost()).data;
  });

  const { mutate: mutateModifyPost } = useMutation(
    (params: { postId: number; title: string; link: string; written_date: string }) =>
      modifyPost(params),
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

  const handleSubmit = (formValue: PostEditorInput): void => {
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
      <PostWrapper>
        {data.map((post: Post) => {
          return (
            <Card
              key={post.id}
              handlePostId={handlePostId}
              getDeleteMyPostId={getDeleteMyPostId}
              post={post}
            />
          );
        })}
        {isEditPostActive && (
          <ModalLayout closeModal={closeEditPost} closeOnClickDimmer={true}>
            <PostEditor handleSubmit={handleSubmit} post={toEditPost} />
          </ModalLayout>
        )}
      </PostWrapper>
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
