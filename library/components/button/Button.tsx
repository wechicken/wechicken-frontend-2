import styled from '@emotion/styled';
import React from 'react';

type Props = {
  value: string;
  handleFunction: () => void;
};

function Button({ value, handleFunction }: Props) {
  return <Container onClick={handleFunction}>{value}</Container>;
}

export default Button;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82px;
  height: 32px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.orange};
  border-radius: 1rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontContent};
`;
