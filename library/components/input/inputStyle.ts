import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const InputBox = styled.div<{ width: string; size: string; search?: boolean }>`
  position: relative;
  margin: 5px 0;

  ${({ search }) =>
    search &&
    css`
      background-color: #ffffff1d;
      backdrop-filter: blur(5px);
    `}

  .nameBox {
    padding-left: 12px;
    padding-bottom: 2px;
    ${({ search }) =>
      search &&
      css`
        padding-left: 0;
      `}
  }

  .type {
    padding: 0 2px 6px 0;
    font-weight: 500;
    font-size: 15px;
    color: ${({ theme }) => theme.textGrey};
  }

  input {
    width: ${({ width }) => width};
    size: ${({ size }) => size};
    ${({ size, search }) => search && `size: calc(${size} + 1rem)`};
    border: none;
    line-height: 150%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    outline: none;
    cursor: text;
    caret-color: ${({ theme }) => theme.vermilion};
    ${({ search }) =>
      search &&
      css`
        font-size: 2.5rem;
        background-color: #ffffff1d;
        backdrop-filter: blur(5px);
      `}
    ${({ search, theme }) => theme.sm`
        ${search && 'width: 100%'};
      `}
  }

  input::placeholder {
    font-size: 14px;
    opacity: 0.7;
  }
`;

export const Validation = styled.div`
  padding: 1px 0px 0px 2px;
  font-size: 8px;
  color: red;
`;
