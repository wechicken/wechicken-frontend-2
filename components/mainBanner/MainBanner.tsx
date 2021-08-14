import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { bannerContents } from './BannerContents';
import { useRouter } from 'next/dist/client/router';

type Props = {
  setActiveAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainBanner = ({ setActiveAlert }: Props) => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const delayTime = 4000;
  const router = useRouter();

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount(prev => (prev === bannerContents.length - 1 ? 0 : prev + 1));
    }, delayTime);
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
  }, []);

  return (
    <MainBannerContainer>
      <CarouselWrapper count={count} onMouseEnter={stop} onMouseLeave={start}>
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
                    ? window.location.assign(`${content.link}`)
                    : JSON.parse(sessionStorage.getItem('USER') ?? '') !== ''
                    ? router.push(`${content.link}`)
                    : setActiveAlert(true)
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

const CarouselWrapper = styled.div<{ count: number }>`
  display: inline flex;
  width: 100vw;
  margin: 0 auto;
  transition: 900ms;
  transform: ${({ count }) => `translate3d(${-count * 100}%, 0, 0)`};
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
