import styled from '@emotion/styled';
import { useRef } from 'react';

function GoogleLogin() {
  const googleLoginBtn = useRef(null);

  return (
    <GoogleLoginBox id="gSignInWrapper">
      <span className="label" />
      <div
        ref={googleLoginBtn}
        id="customBtn"
        className="customGPlusSignIn"
        // onClick={googleLoginClickHandler}
      >
        <span className="icon"></span>
        <span className="buttonText">구글로 로그인하기</span>
      </div>
    </GoogleLoginBox>
  );
}

export default GoogleLogin;

const GoogleLoginBox = styled.div`
  #customBtn {
    width: 184px;
    height: 38px;
    border: none;
    margin-top: 85px;
    margin-bottom: 3px;
    padding-left: 4%;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: rgba(255, 153, 0, 0.7);
  }
  #customBtn:hover {
    cursor: pointer;
  }
  span.label {
    font-family: ${({ theme }) => theme.fontContent};
    font-weight: normal;
  }
  span.icon {
    background: url('/Images/google_logo.svg') no-repeat;
    background-size: 50%;
    background-position: center;
    display: inline-block;
    vertical-align: middle;
    width: 42px;
    height: 42px;
  }
  span.buttonText {
    font-family: ${({ theme }) => theme.fontContent};
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: ${({ theme }) => theme.white};
  }
`;
