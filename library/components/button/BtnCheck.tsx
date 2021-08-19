import React from 'react';
import styled from '@emotion/styled';

type Props = {
  text: string;
  handleCheckBox: (type: string) => void;
  isChecked: boolean;
};

const BtnCheck = ({ text, handleCheckBox, isChecked }: Props) => {
  return (
    <BtnCheckBox onClick={() => handleCheckBox(text)}>
      <Check isChecked={isChecked} />
      <Checked isChecked={isChecked}>✓</Checked>
      <Text className="noDrag">{text}</Text>
    </BtnCheckBox>
  );
};

export default BtnCheck;

const BtnCheckBox = styled.div`
  display: flex;
  padding-left: 12px;
  margin-top: 12px;
  cursor: pointer;
`;

const Check = styled.div<{ isChecked: boolean }>`
  display: ${({ isChecked }) => (isChecked ? 'none' : 'block')};
  width: 12px;
  height: 12px;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  border-radius: 50%;
`;

const Checked = styled.div<{ isChecked: boolean }>`
  display: ${({ isChecked }) => (isChecked ? 'block' : 'none')};
  width: 12px;
  height: 12px;
  text-align: center;
  color: ${({ theme }) => theme.white};
  font-size: 12px;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.orange};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.orange};
`;

const Text = styled.div`
  margin-left: 5px;
  font-weight: 500;
  font-size: 10px;
  line-height: 13px;
  text-align: center;
  color: ${({ theme }) => theme.textGrey};
`;
