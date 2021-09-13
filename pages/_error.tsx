import styled from '@emotion/styled';
import { NextApiResponse } from 'next';

function Error(statusCode: string): JSX.Element {
  console.log(
    statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client',
  );

  return (
    <ErrorContainer>
      <ErrorContents>
        <div className="errorImg" />
        <span className="errorText">Error!</span>
      </ErrorContents>
    </ErrorContainer>
  );
}

Error.getInitialProps = (res: NextApiResponse, err: NextApiResponse) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

const ErrorContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ErrorContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 18.75rem;
  min-height: 260px;

  .errorImg {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: url('/images/doghair.jpg');
    background-position: center;
    background-repeat: no-repeat;
  }

  .errorText {
    font-size: 3.4375rem;
    font-weight: 600;
    font-family: ${({ theme }) => theme.fontTitle};
    color: ${({ theme }) => theme.vermilion};
    animation: blink-animation 0.8s steps(4, start) infinite alternate;
  }

  @keyframes blink-animation {
    from {
      visibility: visibility;
    }
    to {
      visibility: hidden;
    }
  }
`;
