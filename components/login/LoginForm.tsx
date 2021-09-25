import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import Logo from 'library/components/modal/Logo';
import InputTheme from 'library/components/input/InputTheme';
import BtnCheck from 'library/components/button/BtnCheck';
import BtnSubmit from 'library/components/button/BtnSubmit';
import useUpload from 'library/hooks/useUpload';
import { postAuthAddtional } from 'library/api';
import { CreatedUser } from 'library/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { setLoginModalOn } from 'library/store/setLoginModal';

type Props = {
  googleProfile: gapi.auth2.BasicProfile;
  setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setExistingUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginForm({
  googleProfile,
  setLoginSuccess,
  setExistingUser,
}: Props): JSX.Element {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    inputName: '',
    nth: '',
    blogAddress: '',
    isJoinGroup: true,
  });
  const [isAgreed, setAgreed] = useState(true);
  const [isSubmitActivate, setSubmitActivate] = useState(false);
  const googleProfileImage = useRef(googleProfile.getImageUrl());

  const { handleInputImage, convertedImage, ProfileIcon, uploadedImage } = useUpload(
    googleProfileImage.current,
  );

  const loginWithForm = useMutation((formData: FormData) => postAuthAddtional(formData));

  const { inputName, nth, blogAddress, isJoinGroup } = loginForm;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleCheckBox = (type: string): void => {
    type === '치킨계 가입(선택)'
      ? setLoginForm(prev => {
          return { ...prev, isJoinGroup: !prev.isJoinGroup };
        })
      : setAgreed(!isAgreed);
  };

  useEffect(() => {
    inputName && nth && blogAddress && isAgreed
      ? setSubmitActivate(true)
      : setSubmitActivate(false);
  }, [inputName, nth, blogAddress, isAgreed]);

  const fetchUserData = async (formData: FormData): Promise<void> => {
    const { data, status } = await loginWithForm.mutateAsync(formData);

    if (status === 201) {
      const { token, profile, myGroupStatus, nth } = data;
      setLoginSuccess(true);
      setExistingUser(true);
      sessionStorage.setItem(
        'USER',
        JSON.stringify({
          token,
          profile,
          myGroupStatus,
          nth,
        }),
      );

      setTimeout(() => {
        setLoginSuccess(false);
        dispatch(setLoginModalOn(false));
      }, 1000);

      dispatch(data as CreatedUser);
    }
  };

  const handleUploadForm = async (): Promise<void> => {
    const formData = new FormData();
    formData.append(
      'user_thumbnail',
      uploadedImage ? String(uploadedImage) : String(googleProfileImage.current),
    );
    formData.append('user_name', inputName);
    formData.append('wecode_nth', nth.replace(/[^0-9]/g, ''));
    formData.append('blog_address', blogAddress);
    formData.append('gmail_id', googleProfile.getId());
    formData.append('gmail', googleProfile.getEmail());
    formData.append('is_group_joined', String(isJoinGroup));

    fetchUserData(formData);
  };

  return (
    <LoginFormBox>
      <Logo />
      <LoginFormContentsBox>
        <Greeting>
          <div className="name">{googleProfile.getName()}님</div>
          <div className="greeting">환영합니다!</div>
          <div className="type">추가 정보를 입력해주세요</div>
        </Greeting>
        <Form method="post" encType="multipart/form-data">
          <ImageBox>
            <label>
              <ProfileIcon
                size={64}
                img={convertedImage ? convertedImage : googleProfileImage.current}
              />
              <CameraIcon>
                <FontAwesomeIcon icon={faCamera} />
                <input type="file" onChange={handleInputImage} />
              </CameraIcon>
            </label>
          </ImageBox>
          <FormWrap>
            <InputTheme
              width="9.75rem"
              type="기수"
              handleEvent={handleChangeInput}
              name="nth"
              size="14px"
            />
            <InputTheme
              width="9.75rem"
              type="이름"
              handleEvent={handleChangeInput}
              name="inputName"
              size="14px"
            />
            <InputTheme
              width="9.75rem"
              type="블로그 주소"
              handleEvent={handleChangeInput}
              name="blogAddress"
              size="14px"
            />
            <BtnCheck
              text="치킨계 가입(선택)"
              handleCheckBox={handleCheckBox}
              isChecked={isJoinGroup}
            />
            <BtnCheck
              text="블로그 정보 수집 동의(필수)"
              handleCheckBox={handleCheckBox}
              isChecked={isAgreed}
            />
          </FormWrap>
        </Form>
        <SubmitButtonBox>
          <BtnSubmit
            btnText="제출"
            executeFunction={handleUploadForm}
            isSubmitActivate={isSubmitActivate}
          />
        </SubmitButtonBox>
      </LoginFormContentsBox>
    </LoginFormBox>
  );
}

const LoginFormBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LoginFormContentsBox = styled.div`
  width: 50%;
  padding: 1.25rem;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.875rem;

  .name {
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    color: ${({ theme }) => theme.vermilion};
  }

  .greeting {
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: ${({ theme }) => theme.darkGrey};
  }

  .type {
    margin-top: 1.25rem;
    font-weight: 500;
    font-size: 15px;
    line-height: 1.375rem;
    color: ${({ theme }) => theme.textGrey};
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  height: 230px;
  margin-top: 20px;

  ${({ theme }) => theme.md`
    flex-direction: column;
    height: auto;
  `}
`;

const ImageBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 15px 10px 0 10px;
  ${({ theme }) => theme.md`
    display: flex;
    justify-contents: center;
  `}

  label {
    position: relative;
  }
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CameraIcon = styled.div`
  position: absolute;
  right: -3px;
  bottom: -5px;
  display: center;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.white};
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  input {
    display: none;
  }
`;

const SubmitButtonBox = styled.div`
  padding-top: 1rem;
`;
