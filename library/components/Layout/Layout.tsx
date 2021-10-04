import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Nav from 'components/nav/Nav';
import Login from 'components/login/Login';
import Alert from 'library/components/alert/Alert';
import { useIntersectionObserver } from 'library/hooks';
import { useSelector } from 'react-redux';
import { alertForm } from 'library/store/setAlert';
import { loginModal } from 'library/store/setLoginModal';
import Toast from 'components/toast/Toast';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  const [isBlurred, setBlurred] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const alert = useSelector(alertForm);
  const isLoginModalOn = useSelector(loginModal);

  useIntersectionObserver({
    target: ref,
    onIntersect: () => {
      setBlurred(true);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LayoutBox>
      {isLoginModalOn && <Login />}
      {alert && (
        <Alert
          alertMessage={alert.alertMessage}
          submitBtnText={alert.submitBtnText}
          closeBtnText={alert.closeBtnText}
          onSubmit={alert.onSubmit}
          onClose={alert.onClose}
          type={alert.type}
          setSelectedMenu={alert.setSelectedMenu}
          selectedMenu={alert.selectedMenu}
        />
      )}
      <Nav isBlurred={isBlurred} setBlurred={setBlurred} />
      <main>{children}</main>
      <Observer ref={ref} />
      <ToastWrapper>
        <Toast />
      </ToastWrapper>
    </LayoutBox>
  );
}

const LayoutBox = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.background};
`;

const Observer = styled.div`
  position: absolute;
  top: calc(100vh + 13.3125rem);
  height: 10px;
  width: 3px;
`;

const ToastWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
