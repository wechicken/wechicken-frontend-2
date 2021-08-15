import styled from '@emotion/styled';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as blankHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as blankBookmarks } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as filledBookmarks } from '@fortawesome/free-solid-svg-icons';

type Props = {
  id: number;
  status: boolean;
  type: string;
  setActiveAlert: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemoveCard?: (() => void) | undefined;
};

function BtnLike({ id, status, type, setActiveAlert }: Props) {
  const [isLiked, setLiked] = useState(status ?? false);

  const fetchLikeStatus = () => {
    // TODO like api call 코드 추가
  };

  const handleLikeStatus = () => {
    setLiked(!isLiked);
    // TODO 작성 필요
    // if (handleRemoveCard) setTimeout(() => handleRemoveCard(id, type), 500);
    fetchLikeStatus();
  };

  const checkLoginStatus = () => {
    if (JSON.parse(sessionStorage.getItem('USER') ?? '')) {
      return handleLikeStatus();
    }
    return setActiveAlert(true);
  };

  return (
    <BtnLikeBox type={type} onClick={checkLoginStatus} className={String(id)}>
      <BlankIcon isLiked={isLiked}>
        <FontAwesomeIcon className="blank" icon={type === 'likes' ? blankHeart : blankBookmarks} />
      </BlankIcon>
      <FilledIcon isLiked={isLiked} type={type}>
        <FontAwesomeIcon
          className="filled"
          icon={type === 'likes' ? filledHeart : filledBookmarks}
        />
      </FilledIcon>
    </BtnLikeBox>
  );
}

export default BtnLike;

const BtnLikeBox = styled.div<{ type: string }>`
  position: absolute;
  right: ${({ type }) => (type === 'likes' ? '29' : '2')}px;
`;

const BlankIcon = styled.div<{ isLiked: boolean }>`
  display: ${({ isLiked }) => (isLiked ? 'none' : 'block')};

  .blank {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.deepGrey};
  }
`;

const FilledIcon = styled.div<{ isLiked: boolean; type: string }>`
  display: ${({ isLiked }) => (isLiked ? 'block' : 'none')};

  .filled {
    width: 20px;
    height: 20px;
    color: ${({ type, theme }) => (type === 'likes' ? theme.vermilion : theme.middleGrey)};
  }
`;
