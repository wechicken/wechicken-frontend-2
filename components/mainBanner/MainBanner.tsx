import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import Flicking from '@egjs/react-flicking';
import { AutoPlay, Fade } from '@egjs/flicking-plugins';
import styled from '@emotion/styled';
import { bannerContents } from 'components/mainBanner/BannerContents';
import { currentUser } from 'library/store/saveUser';
import { setAlert } from 'library/store/setAlert';
import { setLoginModalOn } from 'library/store/setLoginModal';
import '@egjs/flicking-plugins/dist/flicking-plugins.css';

function MainBanner(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(currentUser);
  const plugins = [
    new AutoPlay({ duration: 2000, direction: 'NEXT', stopOnHover: true }),
    new Fade('', 1),
  ];

  return (
    <MainBannerContainer>
      <Flicking
        hideBeforeInit
        circular
        panelsPerView={1}
        autoResize
        firstPanelSize="100%"
        plugins={plugins}
        inputType={['touch', 'mouse']}
      >
        {bannerContents.map((content, idx) => (
          <BannerWrap key={idx} className="flicking-panel">
            <ImgBox>
              <img alt={`banner${idx}`} src={content.img} />
            </ImgBox>
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
                      : user.token
                      ? router.push(`${content.link}`)
                      : dispatch(
                          setAlert({
                            alertMessage: '로그인이 필요한 서비스입니다.',
                            submitBtnText: '로그인',
                            closeBtnText: '취소',
                            onSubmit: () => dispatch(setLoginModalOn(true)),
                          }),
                        )
                  }
                >
                  더보기 ▸
                </MoreBtn>
              </BannerBottom>
            </BannerContent>
          </BannerWrap>
        ))}
      </Flicking>
    </MainBannerContainer>
  );
}

export default MainBanner;

const MainBannerContainer = styled.div`
  width: 95%;
  max-width: 1100px;
`;

const BannerWrap = styled.div`
  display: flex;
  width: 100%;

  ${({ theme }) => theme.md`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const ImgBox = styled.div`
  padding: 1rem;
  max-width: 60%;

  ${({ theme }) => theme.md`
    max-width: 100%;
  `}

  img {
    object-fit: contain;
    width: 100%;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.625rem 0 0 4.6875rem;
  font-family: ${({ theme }) => theme.fontContent};
  font-weight: 600;
  word-break: keep-all;

  ${({ theme }) => theme.lg`
    padding: 20px;
  `}

  ${({ theme }) => theme.md`
    padding: 10px;
  `}
`;

const BannerTop = styled.div`
  ${({ theme }) => theme.md`
    display: flex;
  `}
`;

const BannerBottom = styled.div`
  font-size: 1.25rem;

  ${({ theme }) => theme.sm`
    font-size: 14px;
  `}
`;

const GreetingText = styled.h1`
  font-size: 2.4375rem;
  color: ${({ theme }) => theme.orange};

  ${({ theme }) => theme.md`
    margin-right: 10px;
  `}
`;

const TitleText = styled.h2`
  font-size: 2.1875rem;
`;

const Detail = styled.p`
  line-height: 1.875rem;

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
  background-color: transparent;
  color: ${({ theme }) => theme.orange};
  cursor: pointer;

  ${({ theme }) => theme.md`
    padding: 0px;
    text-align: start;
`}
`;
