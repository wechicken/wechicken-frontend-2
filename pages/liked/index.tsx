import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import { Post } from 'library/models';
import { theme, flexCenter, PostWrapper } from 'styles/theme';
import { getLikedPost } from 'library/api/liked';
import Card from 'library/components/card/Card';
import SEO from 'library/components/Layout/SEO';

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
    <>
      <SEO title='북마크'/>
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
        <PostWrapper>
          {data &&
            data.posts.map((post: Post) => {
              return <Card post={post} key={post.id} handleRemoveCard={handleRemoveCard} />;
            })}
        </PostWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: white;
`;

const ActiveTab = styled.div`
  position: sticky;
  padding: 6.9375rem 0 0 30px;
  top: 0px;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 8;
  background-color: white;

  ${({ theme }) => theme.sm`
    padding: 0;
  `}

  .tabWrap {
    position: relative;
    display: flex;
    margin: 0 auto;
    background-color: white;

    li {
      ${flexCenter}
      color: ${theme.deepGrey};
      width: 143px;
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
  width: 143px;
  height: 2px;
  display: block;
  bottom: 3px;
  background: ${theme.orange};
  transform: ${({ selectedMenu }) =>
    selectedMenu === 'likes' ? 'translateX(140px)' : 'translateX(0)'};
  transition: all 0.5s ease-in-out;
`;
