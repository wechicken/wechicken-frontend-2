import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import styled from '@emotion/styled';
import { bannerContents } from 'components/mainBanner/BannerContents';

type Props = {
  setActiveAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainBanner = ({ setActiveAlert }: Props) => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const intervalRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const intervalTimeRef = useRef(4000);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCount(prev => (prev === bannerContents.length - 1 ? 0 : prev + 1));
    }, intervalTimeRef.current);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, [start, stop, intervalTimeRef.current]);

  useEffect(() => {
    count === 4 ? (intervalTimeRef.current = 1) : (intervalTimeRef.current = 4000);
  }, [count]);

  return (
    <MainBannerContainer>
      <CarouselWrapper
        count={count}
        bannerLength={bannerContents.length}
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        {bannerContents.map((content, idx) => (
          <BannerWrap key={idx}>
            <img alt={`banner${idx}`} src={content.img} />
            <BannerContent>
              <GreetingText>{content.title}</GreetingText>
              <TitleText>{content.subtitle}</TitleText>
              <Detail>{content.content}</Detail>
              <MoreBtn
                onClick={() =>
                  content.id !== 'siteIn'
                    ? router.push(`${content.link}`)
                    : // : JSON.parse(sessionStorage.getItem('USER') ?? '')
                      // ? router.push(`${content.link}`)
                      setActiveAlert(true)
                }
              >
                더보기 ▸
              </MoreBtn>
            </BannerContent>
          </BannerWrap>
        ))}
      </CarouselWrapper>
    </MainBannerContainer>
  );
};

export default MainBanner;

const MainBannerContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  overflow-x: hidden;
`;

const CarouselWrapper = styled.div<{ count: number; bannerLength: number }>`
  display: inline flex;
  width: 100vw;
  margin: 0 auto;
  transition: ${({ bannerLength, count }) =>
    count === bannerLength || count === 0 ? '0s' : '-webkit-transform 900ms ease 0s'};
  transform: ${({ count, bannerLength }) =>
    count === bannerLength || count === 0 ? 'none' : `translate3d(${-count * 100}%, 0, 0)`};
`;

const BannerWrap = styled.div`
  display: flex;
  height: 100%;
  padding: 0 10vw;

  img {
    width: 50%;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 75px;
  font-family: ${({ theme }) => theme.fontContent};
  font-weight: 600;
  word-break: keep-all;
`;

const GreetingText = styled.h1`
  font-size: 39px;
  color: ${({ theme }) => theme.orange};
`;

const TitleText = styled.h2`
  font-size: 35px;
`;

const Detail = styled.p`
  margin-top: 140px;
  line-height: 30px;
  font-size: 20px;
  font-weight: 300;
  font-family: ${({ theme }) => theme.fontContent};
`;

const MoreBtn = styled.button`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  border: none;
  outline: none;
  font-size: 17px;
  background-color: transparent;
  color: ${({ theme }) => theme.orange};
  cursor: pointer;
`;
