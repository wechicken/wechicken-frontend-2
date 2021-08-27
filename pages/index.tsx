import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from 'react-query';
import { isNil } from 'lodash-es';
import Nav from 'components/nav/Nav';
import MainBanner from 'components/mainBanner/MainBanner';
import Login from 'components/login/Login';
import Card from 'library/components/card/Card';
// import Alert from 'library/components/alert/Alert';
import { Post } from 'library/models/main';
import { getMainPage } from 'library/api';
import { useIntersectionObserver } from 'library/hooks/useIntersectionObserver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Alert from 'library/components/modal/Alert';

export default function Home() {
  const [isActiveAlert, setActiveAlert] = useState(false);
  const [isLoginActive, setLoginActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'getMainPage',
    async ({ pageParam = 0 }) => {
      const { status, data } = await getMainPage(pageParam);
      return status === 200 && data;
    },
    {
      getPreviousPageParam: firstPage => firstPage?.previousId ?? false,
      getNextPageParam: lastPage => {
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

  return (
    <>
      <Nav />
      {isLoginActive && <Login setModalOn={setLoginActive} />}
      {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          alertMessage="로그인이 필요한 서비스입니다."
          submitBtnText="로그인"
          closeBtnText="취소"
          onSubmit={handleSetLoginActive}
        />
      )}
      <HomeContainer>
        <MainBanner setActiveAlert={setActiveAlert} />
        <MainContents>
          <MainContentTitle>
            <div className="titleContainer">
              <FontAwesomeIcon className="check" icon={faCheck} />
              <h1 className="contentTitle">트렌딩 포스트</h1>
            </div>
          </MainContentTitle>
          <MainContentCards>
            {data?.pages.map(page =>
              page?.posts.map((post: Post) => (
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  color: ${({ theme }) => theme.deepGrey};
  background-color: ${({ theme }) => theme.background};
`;

const MainContentCards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
  padding: 0px !important;
`;

const MainContents = styled.div`
  position: relative;
  width: 90%;
  max-width: 1450px;
  padding: 50px 0;
  margin-top: 55px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.05);

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
