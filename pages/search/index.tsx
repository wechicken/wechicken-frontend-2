import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { useInfiniteQuery } from 'react-query';
import isNil from 'lodash-es/isNil';
import { getSearch } from 'library/api';
import { useIntersectionObserver } from 'library/hooks';
import Loading from 'library/components/loading/Loading';
import SEO from 'library/components/Layout/SEO';
import InputTheme from 'library/components/input/InputTheme';
import Card from 'library/components/card/Card';
import { Page, Post } from 'library/models';
import { currentUser } from 'library/store/saveUser';

function SearchPage(): JSX.Element {
  const router = useRouter();
  const { query } = router.query;
  const user = useSelector(currentUser);
  const [keyword, setKeyword] = useState(String(query ?? ''));
  const observerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);
  const isFirstRenderRef = useRef(true);
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['getSearch', keyword, user.token],
    async ({ pageParam = 0 }) => {
      const { status, data } = await getSearch(keyword, pageParam);
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
    if (query && isFirstRenderRef.current) {
      setKeyword(query as string);
      isFirstRenderRef.current = false;
    }
  }, [query]);

  const searchingStatus = (keyword: string): JSX.Element => {
    return !keyword ? (
      <NoResult>검색 키워드를 입력해주세요</NoResult>
    ) : (
      <NoResult>검색 결과가 없습니다</NoResult>
    );
  };

  const moveToSearchURL = (query: string): void => {
    router.push(`/search?query=${query}`);
    setKeyword(query);
  };

  return (
    <SEO
      title={query ? `'${decodeURIComponent(query as string)}'의 검색 결과` : '위치킨'}
      url={`/search?query=${query}`}
    >
      <>
        <SearchWrap>
          <InputTheme
            width="40.625rem"
            value={keyword}
            handleType={moveToSearchURL}
            size="2.8125rem"
            search
          />
        </SearchWrap>
        {isLoading ? (
          <Loading />
        ) : (
          <PostWrap>
            {data && data.pages.length !== 0 && (data.pages[0] as Page).posts.length !== 0
              ? data.pages.map(
                  page =>
                    page &&
                    page.posts.map((post: Post) => (
                      <Card key={post.id} post={post} width="40.625rem" search />
                    )),
                )
              : searchingStatus(keyword)}
            <Observer ref={observerRef} />
          </PostWrap>
        )}
      </>
    </SEO>
  );
}

export default SearchPage;

const SearchWrap = styled.div`
  width: 90%;
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

  ${({ theme }) => theme.sm`
    padding: 5.55rem 0 3rem 0;
  `}
`;

const PostWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 3.625rem;

  ${({ theme }) => theme.sm`
    padding-top: 0;
    padding: 0 1.9375rem;
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
