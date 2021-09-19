import React from 'react';
import styled from '@emotion/styled';
import { theme, flexCenter } from 'styles/theme';

type EditForm = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleContentValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contentValue: string;
};

function EditForm({ handleSubmit, contentValue, handleContentValue }: EditForm): JSX.Element {
  return (
    <EditFormContainer onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          placeholder="블로그 주소"
          className="editblogUrl"
          value={contentValue}
          onChange={handleContentValue}
        />
        <input type="submit" className="saveBtn" value="저장" />
      </label>
    </EditFormContainer>
  );
}

export default EditForm;

const EditFormContainer = styled.form`
  label {
    display: flex;
    align-items: center;
    .editblogUrl {
      width: 200px;
      height: 35px;
      font-size: 1rem;
      outline: none;
      border: none;
      border-bottom: 1px solid ${theme.orange};
      color: ${theme.deepGrey};
    }
    .saveBtn {
      width: 65px;
      height: 40px;
      ${flexCenter};
      font-size: 16px;
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: transparent;
      color: ${theme.orange};
      cursor: pointer;
    }
  }
`;
