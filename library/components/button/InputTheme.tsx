import React, { useRef } from 'react';
import styled from '@emotion/styled';
import debounce from 'lodash-es/debounce';
import { css } from '@emotion/react';

type Props = {
  width: string;
  type?: string;
  handleType: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  value?: string;
  placeholder?: string;
  name?: string;
  validationCheck?: boolean;
  search?: boolean;
};

const InputTheme = ({
  width,
  type,
  value,
  handleType,
  placeholder,
  size,
  name,
  validationCheck,
  search,
}: Props): JSX.Element => {
  const delaySetStateValue = useRef(debounce(q => handleType(q), 500)).current;

  return (
    <InputThemeBox width={width} size={size} search={search ?? false}>
      <div className="nameBox">
        <div className="type">{type}</div>
        <input
          type="text"
          defaultValue={value}
          onChange={e => delaySetStateValue(e.target.value)}
          placeholder={placeholder}
          name={name}
        />
        {validationCheck === false && <Validation>날짜형식을 확인 해 주세요.</Validation>}
      </div>
    </InputThemeBox>
  );
};

export default React.memo(InputTheme);

const InputThemeBox = styled.div<{ width: string; size: string; search: boolean }>`
  margin: 5px 0;

  ${({search})=> search && css`
    background-color: #ffffff1d;
    backdrop-filter: blur(5px);
  `}

  .nameBox {
    padding-left: 12px;
    padding-bottom: 2px;

    .type {
      margin-left: 2px;
      margin-bottom: 6px;
      font-weight: 500;
      font-size: 15px;
      color: ${({ theme }) => theme.textGrey};
    }

    input {
      width: ${({ width }) => width};
      font-size: ${({ size }) => size};
      size: ${({ size }) => size};
      ${({ size, search }) => search && `size: calc(${size} + 1rem)`};
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      outline: none;
      cursor: text;
      caret-color: ${({ theme }) => theme.vermilion};
      ${({search})=> search && css`
        background-color: #ffffff1d;
        backdrop-filter: blur(5px);
      `}
    }

    input::placeholder {
      font-size: 14px;
      opacity: 0.7;
    }
  }
`;

const Validation = styled.div`
  padding: 1px 0px 0px 2px;
  font-size: 8px;
  color: red;
`;
