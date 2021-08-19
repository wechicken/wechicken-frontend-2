import { useState } from 'react';
import styled from '@emotion/styled';
import GoogleLogin from 'components/login/GoogleLogin';
import LoginForm from 'components/login/LoginForm';
import { ModalLayout } from 'library/components/modal';
import LogoBox from 'library/components/modal/LogoBox';

type Props = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ setModalOn }: Props) {
  const [isExistingUser, setExistingUser] = useState(true);
  const [googleProfile, setGoogleProfile] = useState<gapi.auth2.BasicProfile>();
  const [isLoginSuccess, setLoginSuccess] = useState(false);

  const handleGoogleInput = (googleProfile: gapi.auth2.BasicProfile) => {
    setGoogleProfile(googleProfile);
  };

  return (
    <ModalLayout width="675px" height="470px" closeModal={() => setModalOn(false)}>
      {isLoginSuccess ? (
        <CelebratingBox>
          <CelebratingImg>
            <div className="firework" />
            <div className="beer" />
            <div className="firework" />
          </CelebratingImg>
          <CelebratingText>
            <span>잠시만 기다려주세요!</span>
          </CelebratingText>
        </CelebratingBox>
      ) : isExistingUser ? (
        <LoginBox>
          <LogoBox />
          <LoginBoxRight>
            <Greeting>
              <div className="greeting">환영합니다!</div>
              <div className="type">로그인</div>
            </Greeting>
            <GoogleLogin
              setLoginSuccess={setLoginSuccess}
              setModalOn={setModalOn}
              setExistingUser={setExistingUser}
              handleGoogleInput={handleGoogleInput}
            />
          </LoginBoxRight>
        </LoginBox>
      ) : (
        googleProfile && (
          <LoginForm
            setModalOn={setModalOn}
            googleProfile={googleProfile}
            setLoginSuccess={setLoginSuccess}
            setExistingUser={setExistingUser}
          />
        )
      )}
    </ModalLayout>
  );
}

export default Login;

const LoginBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LoginBoxRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const Greeting = styled.div`
  .greeting {
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #525151;
  }

  .type {
    margin-top: 12px;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 30px;
    color: #000000;
  }
`;

const CelebratingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.white};
`;

const CelebratingImg = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 60px;

  .firework {
    width: 100px;
    height: 100px;
    margin-top: 30px;
    background: url('/images/firework.png');
    background-size: contain;
    background-repeat: no-repeat;
    animation: blink-animation 0.4s steps(4, start) infinite;
  }

  @keyframes blink-animation {
    from {
      visibility: visibility;
    }
    to {
      visibility: hidden;
    }
  }

  .beer {
    width: 130px;
    height: 130px;
    background: url('/images/beer.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const CelebratingText = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 27px;
  color: ${({ theme }) => theme.orange};
`;
