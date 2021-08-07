import React, { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { isNil } from 'lodash-es';
import styled from '@emotion/styled';
import MainBanner from 'components/mainBanner/MainBanner';
import { useIntersectionObserver } from 'library/hooks/useIntersectionObserver';
import Card from 'library/components/card/Card';
import Loading from 'library/components/loading/Loading';
import { Post } from 'library/models/main';
import { getMainPage } from 'library/api';

export default function Home() {
  const [isActiveAlert, setActiveAlert] = useState(false);
  const [isLoginActive, setLoginActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);
  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
  } = useInfiniteQuery(
    'getMainPage',
    async ({ pageParam = 0 }) => {
      const { status, data } = await getMainPage(pageParam as number);
      return status === 200 && data;
    },
    {
      getPreviousPageParam: firstPage => (firstPage as any)?.previousId ?? false,
      getNextPageParam: (lastPage, allPages) => {
        if (isNil(lastPage)) {
          return undefined;
        }
        return pageRef.current;
      },
    },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSetLoginActive = () => {
    setLoginActive(true);
  };

  useIntersectionObserver({
    target: ref,
    onIntersect: () => {
      pageRef.current++;
      fetchNextPage();
    },
    enabled: hasNextPage,
  });

  // TODO Loading 컴포넌트 연결 필요
  // if (isFetching) return <Loading />;

  // TODO Login 및 Alert 컴포넌트 작성 필요
  return (
    <>
      {/* {isLoginActive && <Login setModalOn={setLoginActive} />} */}
      {/* {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          alertMessage={'로그인이 필요한 서비스입니다.'}
          submitBtn={'로그인'}
          closeBtn={'취소'}
          excuteFunction={handleSetLoginActive}
        />
      )} */}
      <HomeContainer>
        <MainBanner setActiveAlert={setActiveAlert} />
        <MainContents>
          <MainContentTitle>
            <div className="titleContainer">
              {/* 
              TODO 교체 필요
              <FontAwesomeIcon className='check' icon={faCheck} /> */}
              <h1 className="contentTitle">트렌딩 포스트</h1>
            </div>
          </MainContentTitle>
          <MainContentCards>
            {data?.pages.map(page =>
              (page as any)?.posts.map((post: Post) => (
                <Card
                  key={post.id}
                  post={post}
                  width={288}
                  space={20}
                  setActiveAlert={setActiveAlert}
                />
              )),
            )}
            <div ref={ref} style={{ height: '10px', width: '3px' }} />
          </MainContentCards>
        </MainContents>
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div`
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.deepGrey};
  background-color: ${({ theme }) => theme.background};
`;

const MainContentCards = styled.div`
  margin-top: 40px;
  padding: 0px !important;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const MainContents = styled.div`
  width: 90%;
  max-width: 1450px;
  padding: 50px 0;
  margin-top: 55px;
  position: relative;
  border-radius: 50px;

  @media (max-width: 800px) {
    margin-top: 0px;
  }
`;

const MainContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 50px;

  .titleContainer {
    display: flex;
    align-items: center;

    .check {
      margin-right: 10px;
      color: ${({ theme }) => theme.orange};
    }

    .contentTitle {
      font-family: ${({ theme }) => theme.fontContent};
      font-size: 23px;
      font-weight: 600;
    }
  }
`;
