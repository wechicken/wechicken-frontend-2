/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Dimmer from 'library/components/modal/Dimmer';
import Card from 'library/components/card/Card';
import { HeaderBox, MainContentCards } from 'styles/theme';
import { Post } from 'library/models/main';

type MyPost = {
  myPosts: Post[];
  setMyPosts: React.Dispatch<React.SetStateAction<[]>>;
  getDeleteMyPostId: (deletePostId: number) => void;
};

function MyPosts({ myPosts, setMyPosts }: MyPost): JSX.Element {
  const [isAddModalActive, setAddModalActive] = useState<boolean>(false);
  const [isActiveAlert, setActiveAlert] = useState<boolean>(false);
  // const [_postId, setPostId] = useState<number>(0);

  useEffect(() => {
    // !isAddModalActive &&
    //   axios
    //     .get(`${SEARCH_URL}/mypage/posts`, {
    //       headers: {
    //         Authorization: JSON.parse(sessionStorage.getItem('USER'))?.token,
    //       },
    //     })
    //     .then(res => setMyPosts(res.data.myPosts));
  }, [isAddModalActive, setMyPosts]);

  // const handlePostId = (id: number) => {
  //   setPostId(id);
  //   setAddModalActive(true);
  // };

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
              // handlePostId={handlePostId}
              // getDeleteMyPostId={getDeleteMyPostId}
              setActiveAlert={setActiveAlert}
              post={post}
              width={'288px'}
              space={'20px'}
            />
          );
        })}
        {isAddModalActive && (
          <>
            <Dimmer />
            {/* <MyPostEditModal
              post={myPosts.find(post => postId === post.id)}
              setAddModalActive={setAddModalActive}
            /> */}
          </>
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
