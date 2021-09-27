import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import { Post } from 'library/models';
import { theme, flexCenter } from 'styles/theme';
import { getLikedPost } from 'library/api/liked';
import Card from 'library/components/card/Card';

export default function LikedPage(): JSX.Element {
  const [selectedMenu, setSelectedMenu] = useState('bookmarks');

  const { data, refetch } = useQuery('getLikedPosts', async () => {
    return await getLikedPost(selectedMenu);
  });

  useEffect(() => {
    refetch();
  }, [selectedMenu]);

  const handleRemoveCard = (): void => {
    refetch();
  };

  return (
    <Container>
      <ActiveTab>
        <div className="tabWrap">
          <li
            onClick={() => {
              setSelectedMenu('bookmarks');
            }}
            className={selectedMenu === 'bookmarks' ? 'focused' : ''}
          >
            북마크한 포스트
          </li>
          <li
            onClick={() => {
              setSelectedMenu('likes');
            }}
            className={selectedMenu === 'likes' ? 'focused' : ''}
          >
            좋아한 포스트
          </li>
          <UnderBar selectedMenu={selectedMenu}></UnderBar>
        </div>
      </ActiveTab>
      <Contents>
        {data &&
          data.posts.map((post: Post) => {
            return (
              <Card
                post={post}
                width="288px"
                space="20px"
                key={post.id}
                handleRemoveCard={handleRemoveCard}
              />
            );
          })}
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  padding: 111px 10vw 0px;
  background-color: white;
`;

const ActiveTab = styled.div`
  padding: 0 20px;
  position: sticky;

  z-index: 8;
  width: 100%;

  .tabWrap {
    position: relative;
    display: flex;
    width: 288px;

    li {
      ${flexCenter}
      color: ${theme.deepGrey};
      width: 140px;
      height: 48px;
      padding-bottom: 3px;
      font-size: 18px;
      line-height: 29px;
      cursor: pointer;
    }

    .focused {
      color: rgb(52, 58, 64);
      font-weight: 900;
    }
  }
`;

const UnderBar = styled.div<{ selectedMenu: string }>`
  position: absolute;
  width: 48%;
  height: 2px;
  display: block;
  bottom: 3px;
  background: ${theme.orange};
  transform: ${({ selectedMenu }) =>
    selectedMenu === 'likes' ? 'translateX(140px)' : 'translateX(0)'};
  transition: all 0.5s ease-in-out;
`;

const Contents = styled.div`
  padding-top: 111px 0 0 40px;
  display: flex;
  flex-wrap: wrap;
  padding: 0px !important;
  margin: 52px auto 0 auto;
  overflow-y: scroll;
`;
