import styled from '@emotion/styled';
import debounce from 'lodash-es/debounce';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useRef, useState } from 'react';
import { SearchSvg } from 'styles/Svg';

type Props = {
  isBlurred: boolean;
  isSearchActive: boolean;
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function Search({ isBlurred, isSearchActive, setSearchActive }: Props): JSX.Element {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (isSearchActive && isBlurred && !searchValue) {
      setSearchActive(false);
    }
  }, [isBlurred, searchValue]);

  const delaySetSearchValue = useRef(debounce(q => handleInput(q), 300)).current;

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const { value: query } = e.target as HTMLInputElement;
    setSearchValue(query);

    if (e.code === 'Enter') {
      setSearchActive(false);
      setSearchValue('');
      (inputRef.current as HTMLInputElement).value = '';
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <>
      <Input
        ref={inputRef}
        isSearchActive={isSearchActive}
        onKeyDown={e => delaySetSearchValue(e)}
        placeholder="블로그 포스팅을 검색하세요"
      />
      <SearchIcon
        isSearchActive={isSearchActive}
        onClick={() => {
          setSearchActive(isSearchActive => !isSearchActive);
        }}
      >
        {SearchSvg}
      </SearchIcon>
    </>
  );
}

export default Search;

const Input = styled.input<{ isSearchActive: boolean }>`
  display: ${({ isSearchActive }) => (isSearchActive ? 'block' : 'none')};
  min-width: 170px;
  height: 1.5625rem;
  border: none;
  outline: none;
  font-size: 1.125rem;
  cursor: text;
  caret-color: ${({ theme }) => theme.vermilion};
  background-color: transparent;

  ${({ theme }) => theme.sm`
    min-width: 148px;
    font-size: 12px;
  `}

  &::placeholder,
  ::-webkit-input-placeholder,
  ::-ms-input-placeholder {
    padding-left: 5px;
    font-size: 12px;
    color: ${({ theme }) => theme.orange};
    opacity: 0.7;
  }
`;

const SearchIcon = styled.div<{ isSearchActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.375rem;
  height: 2.375rem;
  margin-right: 0.9375rem;
  border-radius: 50%;
  background-color: inherit;
  transform: ${({ isSearchActive }) => (isSearchActive ? 'translateX(-15.5rem)' : 'translateX(0)')};
  transition: all 0.2s ease-in-out;

  ${({ theme, isSearchActive }) => theme.md`
    ${isSearchActive ? `transform: translateX(-16.5rem)` : 'transform: none'}
  `}

  ${({ theme, isSearchActive }) => theme.sm`
    ${isSearchActive ? `transform: translateX(-12.5rem)` : 'transform: none'}
    ${isSearchActive ? `display: none` : 'display: flex'}
  `}

  &:hover {
    background-color: ${({ theme }) => theme.yellow};
  }

  svg {
    width: 1.375rem;
    height: 1.375rem;
    margin-top: 0.1875rem;
    fill: ${({ theme }) => theme.deepGrey};
    cursor: pointer;
  }
`;
