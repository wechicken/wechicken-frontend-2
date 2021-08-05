import styled from '@emotion/styled';
import { bannerContents } from './BannerContents';

type Props = {
  setActiveAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainBanner = ({ setActiveAlert }: Props) => {
  return (
    <MainBannerContainer>
      {bannerContents.map((content, i) => {
        return (
          <div className="bannerWrap" key={i}>
            <img className="bannerImg" alt="bannerImg" src={content.img} />
            <BannerContent>
              <h1 className="greeting">{content.title}</h1>
              <h2 className="title">{content.subtitle}</h2>
              <div className="text">
                <p>{content.content}</p>
              </div>
              <button
                onClick={() =>
                  // content.id !== 'siteIn'
                  //   ? window.location.assign(`${content.link}`)
                  //   : JSON.parse(sessionStorage.getItem('USER'))
                  //   ? history.push(`${content.link}`)
                  // :
                  setActiveAlert(true)
                }
                className="moreBtn"
              >
                더보기 ▸
              </button>
            </BannerContent>
          </div>
        );
      })}
    </MainBannerContainer>
  );
};

export default MainBanner;

const MainBannerContainer = styled.div`
  display: flex;
  width: 1000px;
  margin: 0 10px;
  overflow-x: scroll;

  @media (max-width: 800px) {
    display: none;
  }

  .bannerWrap {
    display: flex;
    min-width: 1000px;
  }

  img {
    width: 50%;
  }
`;

const BannerContent = styled.div`
  width: 35%;
  padding: 10px 0 0 75px;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fontContent};
  font-weight: 600;

  .greeting {
    font-size: 39px;
    color: ${({ theme }) => theme.orange};
  }

  .title {
    font-size: 35px;
  }

  p {
    margin-top: 140px;
    line-height: 30px;
    font-size: 20px;
    font-weight: 300;
    font-family: ${({ theme }) => theme.fontContent};
  }

  .moreBtn {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    border: none;
    outline: none;
    font-size: 17px;
    background-color: transparent;
    color: ${({ theme }) => theme.orange};
    cursor: pointer;
  }
`;
