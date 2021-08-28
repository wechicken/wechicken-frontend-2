import styled from '@emotion/styled';
import debounce from 'lodash-es/debounce';
import { searchQuery } from 'library/store/searchQuery';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchSvg } from 'styles/Svg';

type Props = {
  isBlurred: boolean;
};

function Search({ isBlurred }: Props): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (isSearchActive && isBlurred && !searchValue) {
      setSearchActive(false);
    }
  }, [isBlurred]);

  const delaySetSearchValue = useRef(debounce(q => handleInput(q), 300)).current;

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const query = (e.target as HTMLInputElement).value;
    setSearchValue(query);

    if (e.code === 'Enter') {
      dispatch(searchQuery(query));
      setSearchActive(false);
      setSearchValue('');
      (inputRef.current as HTMLInputElement).value = '';
      router.push('/search');
    }
  };

  return (
    <>
      <Input
        ref={inputRef}
        isSearchActive
        onKeyDown={e => delaySetSearchValue(e)}
        placeholder="블로그 포스팅을 검색하세요"
      />
      <SearchIcon
        isSearchActive
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
  height: 25px;
  border: none;
  outline: none;
  font-size: 1.125rem;
  cursor: text;
  caret-color: ${({ theme }) => theme.vermilion};
  background-color: transparent;

  ::placeholder {
    padding-left: 5px;
    font-size: 14px;
    color: ${({ theme }) => theme.orange};
    opacity: 0.7;
  }
`;

const SearchIcon = styled.div<{ isSearchActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  margin-right: 15px;
  border-radius: 50%;
  background-color: inherit;
  transform: ${({ isSearchActive }) => (isSearchActive ? 'translateX(-15.5rem)' : 'translateX(0)')};
  transition: all 0.2s ease-in-out;

  ${({ theme, isSearchActive }) => theme.sm`
    ${isSearchActive ? `transform: translateX(-12.5rem)` : 'transform: none'}
  `}

  &:hover {
    background-color: ${({ theme }) => theme.yellow};
  }

  svg {
    width: 22px;
    height: 22px;
    margin-top: 3px;
    fill: ${({ theme }) => theme.deepGrey};
    cursor: pointer;
  }
`;
