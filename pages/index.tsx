import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from 'react-query';
import isNil from 'lodash-es/isNil';
import MainBanner from 'components/mainBanner/MainBanner';
import Login from 'components/login/Login';
import Card from 'library/components/card/Card';
import Alert from 'library/components/alert/Alert';
import { Post } from 'library/models/main';
import { getMainPage } from 'library/api';
import { useIntersectionObserver } from 'library/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { currentUser } from 'library/store/saveUser';
import Loading from 'library/components/loading/Loading';

export default function Home(): JSX.Element {
  const user = useSelector(currentUser);
  const [isActiveAlert, setActiveAlert] = useState(false);
  const [isLoginActive, setLoginActive] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['getMainPage', user.token],
    async ({ pageParam = 0 }) => {
      const { status, data } = await getMainPage(pageParam, user.token);
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

  const handleSetLoginActive = (): void => {
    setLoginActive(true);
  };

  useIntersectionObserver({
    target: observerRef,
    onIntersect: () => {
      pageRef.current++;
      fetchNextPage();
    },
    enabled: hasNextPage,
    isLoading,
  });

  if (isLoading) return <Loading />;

  return (
    <>
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
            {data &&
              data.pages.map(
                page =>
                  page &&
                  page.posts.map((post: Post) => (
                    <Card
                      key={post.id}
                      post={post}
                      width="18rem"
                      space="1.25rem"
                      setActiveAlert={setActiveAlert}
                    />
                  )),
              )}
            <Observer ref={observerRef} />
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
  padding-top: 9.375rem;
  color: ${({ theme }) => theme.deepGrey};
  background-color: ${({ theme }) => theme.background};

  ${({ theme }) => theme.md`
    padding-top: 7rem;
  `}

  ${({ theme }) => theme.sm`
    padding-top: 4.1875rem;
  `}
`;

const MainContentCards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  padding: 0px !important;
`;

const MainContents = styled.div`
  position: relative;
  width: 90%;
  max-width: 1450px;
  padding: 3.125rem 0;
  margin-top: 3.4375rem;
  border-radius: 3.125rem;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.05);
`;

const MainContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3.125rem;

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

const Observer = styled.div`
  height: 10px;
`;
