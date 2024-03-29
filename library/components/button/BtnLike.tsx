import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  faHeart as blankHeart,
  faBookmark as blankBookmarks,
} from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as filledHeart,
  faBookmark as filledBookmarks,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { postLikeStatus } from 'library/api';
import { useToast } from 'library/hooks';
import { currentUser } from 'library/store/saveUser';

type Props = {
  id: number;
  status: boolean;
  type: string;
  setActiveAlert: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemoveCard?: ((id: number, type: string) => void) | undefined;
};

function BtnLike({ id, status, type, setActiveAlert, handleRemoveCard }: Props): JSX.Element {
  const user = useSelector(currentUser);
  const [isLiked, setLiked] = useState(status ?? false);
  const likeStatus = useMutation(([type, id]: [string, number]) => postLikeStatus(type, id));
  const { showToast } = useToast();

  const fetchLikeStatus = async (): Promise<void> => {
    const { data, status } = await likeStatus.mutateAsync([type, id]);

    if (status === 200) {
      const type = data.message === 'LIKED' ? '좋아요' : '북마크';
      const action = isLiked === true ? '에서 삭제' : '에 추가';

      showToast({
        message: `${type} 목록${action}되었습니다.`,
        type: data.message === 'LIKED' ? 'like' : 'bookmark',
      });
    }
  };

  const handleLikeStatus = (): void => {
    setLiked(prev => !prev);
    if (handleRemoveCard) setTimeout(() => handleRemoveCard(id, type), 500);
    fetchLikeStatus();
  };

  const checkLoginStatus = (): void => {
    if (user.token) {
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
