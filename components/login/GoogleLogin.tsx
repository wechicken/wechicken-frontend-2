import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import { postGoogleLogin } from 'library/api';
import { GOOGLE_CLIENT_ID } from 'library/constants';
import { LoginUser } from 'library/models';
import { saveUser } from 'library/store/saveUser';
import { setLoginModalOn } from 'library/store/setLoginModal';
declare global {
  interface Window {
    googleSDKLoaded: () => void;
  }
}

type Props = {
  setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setExistingUser: React.Dispatch<React.SetStateAction<boolean>>;
  handleGoogleInput: (input: gapi.auth2.BasicProfile) => void;
};

function GoogleLogin({ setLoginSuccess, setExistingUser, handleGoogleInput }: Props): JSX.Element {
  const dispatch = useDispatch();
  const googleLoginBtn = useRef(null);
  const auth2 = useRef<gapi.auth2.GoogleAuth>();
  const js = useRef<HTMLElement>();
  const loginWithGoogle = useMutation((googleToken: string) => postGoogleLogin(googleToken));

  useEffect(() => {
    googleSDK();
    return () => {
      axios.CancelToken.source().cancel();
    };
  }, []);

  const googleSDK = (): void => {
    window.googleSDKLoaded = () => {
      window.gapi.load('auth2', () => {
        auth2.current = window.gapi.auth2.init({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'profile email',
        });
      });
    };

    const makeJsElement = (d: Document, s: string, id: string): void => {
      const fjs: Element = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;

      js.current = d.createElement(s);
      js.current.id = id;
      (js.current as HTMLImageElement).src =
        'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode?.insertBefore(js.current, fjs);
    };

    makeJsElement(document, 'script', 'google-jssdk');
  };

  const GoogleApiPOST = async (googleToken: string): Promise<void> => {
    const { data, status } = await loginWithGoogle.mutateAsync(googleToken);

    if (status === 201) {
      if (data.message === 'FIRST') return setExistingUser(false);

      setLoginSuccess(true);

      setTimeout(() => {
        setLoginSuccess(false);
        dispatch(setLoginModalOn(false));
      }, 1000);

      dispatch(saveUser(data as LoginUser));

      window.location.reload();
    }
  };

  const googleLoginClickHandler = async (): Promise<void> => {
    if (auth2.current) {
      try {
        const googleUser = await auth2.current.signIn({
          scope: 'profile email',
        });

        if (!googleUser) throw new Error('Google Login Error');

        const fetchGoogleUser = (googleUser: gapi.auth2.GoogleUser): void => {
          const profile = googleUser.getBasicProfile();
          handleGoogleInput(profile);
          GoogleApiPOST(googleUser.getAuthResponse().id_token);
        };

        return fetchGoogleUser(googleUser);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <GoogleLoginBtn ref={googleLoginBtn} onClick={googleLoginClickHandler}>
        <GoogleIcon />
        <GoogleBtnText>구글로 로그인하기</GoogleBtnText>
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
