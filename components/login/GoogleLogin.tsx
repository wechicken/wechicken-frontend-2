import styled from '@emotion/styled';
import { useRef } from 'react';

function GoogleLogin() {
  const googleLoginBtn = useRef(null);

  return (
    <>
      <GoogleLoginBtn
        ref={googleLoginBtn}
        id="customBtn"
        className="customGPlusSignIn"
        // onClick={googleLoginClickHandler}
      >
        <GoogleIcon />
        <GoogleBtnText className="buttonText">구글로 로그인하기</GoogleBtnText>
      </GoogleLoginBtn>
    </>
  );
}

export default GoogleLogin;

const GoogleLoginBtn = styled.button`
  height: 38px;
  border: none;
  margin-top: 5.3125rem;
  margin-bottom: 3px;
  padding-left: 4%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: rgba(255, 153, 0, 0.7);
  cursor: pointer;
`;

const GoogleIcon = styled.div`
  background: url('/images/google_logo.svg') no-repeat;
  background-size: 50%;
  background-position: center;
  display: inline-block;
  vertical-align: middle;
  width: 42px;
  height: 42px;
`;

const GoogleBtnText = styled.span`
  margin-right: 15px;
  font-family: ${({ theme }) => theme.fontContent};
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => theme.white};
  white-space: nowrap;

  ${({ theme }) => theme.sm`
    white-space: normal;
    word-break: keep-all;
  `}
`;
