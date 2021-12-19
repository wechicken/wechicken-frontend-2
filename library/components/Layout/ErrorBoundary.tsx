import { Component, ErrorInfo, ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error!', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorContents>
            <div className="errorImg" />
            <span className="errorText">Error!</span>
          </ErrorContents>
        </ErrorContainer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

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
