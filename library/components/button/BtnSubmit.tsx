import React from 'react';
import styled from '@emotion/styled';

type Props = {
  btnText: string;
  isSubmitActivate: boolean;
  executeFunction: () => Promise<void>;
};

function BtnSubmit({ btnText, isSubmitActivate, executeFunction }: Props): JSX.Element {
  return (
    <Submit
      isSubmitActivate={isSubmitActivate}
      className="submit"
      onClick={() => (isSubmitActivate ? executeFunction() : alert('필수 항목을 모두 채워주세요'))}
    >
      <div className="SubmitBtn">{btnText}</div>
    </Submit>
  );
}

export default BtnSubmit;

const Submit = styled.div<{ isSubmitActivate: boolean }>`
  width: 80px;
  margin-left: auto;
  margin-right: 20px;

  ${({theme})=> theme.sm`
    margin-bottom: 10px;
  `}

  .SubmitBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    border-radius: 1rem;
    cursor: ${({ isSubmitActivate }) => (isSubmitActivate ? 'pointer' : 'not-allowed')};
    color: ${({ isSubmitActivate, theme }) => (isSubmitActivate ? theme.white : '#767676')};
    background-color: ${({ isSubmitActivate, theme }) =>
      isSubmitActivate ? theme.orange : '#eee'};
  }
`;
