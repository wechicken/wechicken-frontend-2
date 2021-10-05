import styled from '@emotion/styled';
import { flexCenter } from 'styles/theme';

function Loading(): JSX.Element {
  return (
    <LoadingContainer>
      <LoadingText />
      <LoadingImg />
    </LoadingContainer>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  ${flexCenter};

  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  width: 320px;
  height: 320px;
  background: url('/images/loading.png');
  background-size: contain;
  animation: rotate_image 7s linear infinite;
  transform-origin: 50% 50%;
`;

const LoadingImg = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  background: url('/images/doghair.jpg');
  background-position: center;
  background-repeat: no-repeat;
`;
