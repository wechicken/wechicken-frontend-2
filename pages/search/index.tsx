import styled from '@emotion/styled';
import { queryToSearch, searchQuery } from 'library/store/searchQuery';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import isNil from 'lodash-es/isNil';
import { getSearch } from 'library/api';
import { useIntersectionObserver } from 'library/hooks';
import Loading from 'library/components/loading/Loading';
import InputTheme from 'library/components/button/InputTheme';
import Card from 'library/components/card/Card';
import { Obj, Post } from 'library/models';
import { currentUser } from 'library/store/saveUser';

function SearchPage(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const query = useSelector(queryToSearch);
  const [isActiveAlert, setActiveAlert] = useState(false);
  const [keyword, setKeyword] = useState(query);
  const observerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['getSearch', keyword, user.token],
    async ({ pageParam = 0 }) => {
      const { status, data } = await getSearch(keyword, pageParam, user.token);
      return status === 200 && data;
    },
    {
      getNextPageParam: lastPage => {
        if (isNil(lastPage)) {
          return undefined;
        }
        return pageRef.current;
      },
    },
  );

  useIntersectionObserver({
    target: observerRef,
    onIntersect: () => {
      pageRef.current++;
      fetchNextPage();
    },
    enabled: hasNextPage,
    isLoading,
  });

  useEffect(() => {
    dispatch(searchQuery('search'));

    return () => {
      dispatch(searchQuery(''));
    };
  }, [dispatch]);

  const searchingStatus = (keyword: string, isSearching: boolean): JSX.Element => {
    const keywordError: Obj = {
      [String(!keyword)]: <NoResult>검색 키워드를 입력해주세요</NoResult>,
      [String(!!keyword && isSearching)]: <NoResult>검색 중 입니다</NoResult>,
      [String(!!keyword && !isSearching)]: <NoResult>검색 결과가 없습니다</NoResult>,
    };

    return keywordError[String(true)];
  };

  if (isLoading) return <Loading />;

  return (
    <SearchPageBox>
      {isActiveAlert && <></>}
      <>
        <SearchWrap>
          <InputTheme width="40.625rem" value={keyword} handleType={setKeyword} size="2.8125rem" search/>
        </SearchWrap>
        <PostWrap>
          {data && keyword
            ? data.pages.map(
                page =>
                  page &&
                  page.posts.map((post: Post) => (
                    <Card
                      key={post.id}
                      post={post}
                      width="40.625rem"
                      space="1.25rem"
                      setActiveAlert={setActiveAlert}
                      search
                    />
                  )),
              )
            : searchingStatus(keyword, isLoading)}
          <Observer ref={observerRef} />
        </PostWrap>
      </>
    </SearchPageBox>
  );
}

export default SearchPage;

const SearchPageBox = styled.div``;

const SearchWrap = styled.div`
  width: 100%;
  padding: 6.25rem 0 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1;
  background: linear-gradient(to bottom, #ffffff1d 0%, #ffffff1d 80%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(5px);
`;

const PostWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 3.625rem;

  ${({ theme }) => theme.sm`
    padding-top: 0;
  `}
`;

const NoResult = styled.div`
  color: ${({ theme }) => theme.orange};
  font-size: 1.25rem;

  ${({ theme }) => theme.sm`
    font-size: 14px;
  `}
`;

const Observer = styled.div`
  height: 10px;
`;
