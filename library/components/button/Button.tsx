import React from 'react';
import styled from '@emotion/styled';

type Props = {
  value: string;
  handleFunction: () => void;
  isSearchActive?: boolean;
};

function Button({ value, handleFunction, isSearchActive }: Props): JSX.Element {
  return (
    <ButtonBox onClick={handleFunction} isSearchActive={isSearchActive}>
      {value}
    </ButtonBox>
  );
}

export default Button;

const ButtonBox = styled.div<{ isSearchActive: boolean | undefined }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82px;
  height: 32px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.orange};
  border-radius: 1rem;
  cursor: pointer;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontContent};
  font-size: 14px;

  ${({ theme, isSearchActive }) => theme.sm`
    ${isSearchActive && 'display: none'}
  `}
`;
