import styled from '@emotion/styled';
import { flexCenter } from 'styles/theme';

function Loading() {
  return (
    <LoadingContainer>
      <div className="loadingText"></div>
      <div className="loadingImg"></div>
    </LoadingContainer>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  ${flexCenter};

  .loadingText {
    width: 320px;
    height: 320px;
    background: url('/images/loading.png');
    background-size: contain;
    animation: rotate_image 7s linear infinite;
    transform-origin: 50% 50%;
  }

  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }

  .loadingImg {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    background: url('/images/doghair.jpg');
    background-position: center;
    background-repeat: no-repeat;
  }
`;
