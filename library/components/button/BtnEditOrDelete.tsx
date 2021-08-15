import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

type Props = {
  postId: number;
  handlePostId: (id: number) => void;
  getDeleteMyPostId: (id: number) => void;
};

function BtnEditOrDelete({ postId, handlePostId, getDeleteMyPostId }: Props) {
  const [isBtnClicked, setBtnClicked] = useState(false);

  const handleBtnClicked = () => {
    setBtnClicked(true);
  };

  return (
    <>
      {isBtnClicked && (
        <DropDown onMouseLeave={() => setBtnClicked(false)}>
          <p onClick={() => handlePostId(postId)}>수정</p>
          <p onClick={() => getDeleteMyPostId(postId)}>삭제</p>
        </DropDown>
      )}
      <Container>
        <FontAwesomeIcon
          onMouseOver={handleBtnClicked}
          className="editOrDeleteBtn"
          icon={faEllipsisH}
        />
      </Container>
    </>
  );
}

export default BtnEditOrDelete;

const Container = styled.div`
  position: absolute;
  right: 3px;
  color: ${({ theme }) => theme.fontColor};
`;

const DropDown = styled.div`
  position: absolute;
  right: -10px;
  top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  padding: 3px 10px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 3;

  p {
    margin: 10px 5px;
    font-size: 14px;
    color: ${({ theme }) => theme.fontColor};
    cursor: pointer;
  }

  p:last-child {
    color: ${({ theme }) => theme.vermilion};
  }
`;
