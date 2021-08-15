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
              <BannerTop>
                <GreetingText>{content.title}</GreetingText>
                <TitleText>{content.subtitle}</TitleText>
              </BannerTop>
              <BannerBottom>
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
              </BannerBottom>
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
  width: 100%;
  margin: 0 auto;
  transition: ${({ bannerLength, count }) =>
    count === bannerLength || count === 0 ? '0s' : '-webkit-transform 900ms ease 0s'};
  transform: ${({ count, bannerLength }) =>
    count === bannerLength || count === 0 ? 'none' : `translate3d(${-count * 100}%, 0, 0)`};
`;

const BannerWrap = styled.div`
  display: flex;
  padding: 0 10vw;

  ${({theme})=> theme.lg`
    padding: 0 5vw;
  `}

  ${({theme})=> theme.md`
    flex-direction: column;
    align-items: flex-start;
    padding: 0 5vw;
  `}

  ${({theme})=> theme.sm`
    padding: 0 3vw;
  `}

  img {
    max-width: 60%;
    object-fit: contain;

    ${({theme})=> theme.lg`
      max-width: 60%;
    `}

    ${({theme})=> theme.md`
      max-width: 100%;
    `}
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: .625rem  0 0 4.6875rem;
  font-family: ${({ theme }) => theme.fontContent};
  font-weight: 600;
  word-break: keep-all;

  ${({theme})=> theme.lg`
    padding: 20px;
  `}

  ${({theme})=> theme.md`
    padding: 10px;
  `}
`;

const BannerTop = styled.div`
  ${({theme})=> theme.md`
    display: flex;
    width: 100%;
  `}
`

const BannerBottom = styled.div`

`

const GreetingText = styled.h1`
  font-size: 2.4375rem;
  color: ${({ theme }) => theme.orange};

  ${({theme})=> theme.md`
    margin-right: 10px;
  `}
`;

const TitleText = styled.h2`
  font-size: 2.1875rem;
`;

const Detail = styled.p`
  line-height: 1.875rem;
  font-size: 1.25rem;
  font-weight: 300;
  font-family: ${({ theme }) => theme.fontContent};
`;

const MoreBtn = styled.button`
  width: 100%;
  text-align: end;
  margin-top: 1.25rem;
  padding: 0 5px;
  border: none;
  outline: none;
  font-size: 1.0625rem;
  background-color: transparent;
  color: ${({ theme }) => theme.orange};
  cursor: pointer;

  ${({theme})=> theme.md`
    text-align: start;
  `}
`;
