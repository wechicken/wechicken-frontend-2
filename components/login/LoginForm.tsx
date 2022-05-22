import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { postAuthAddtional } from 'library/api';
import BtnCheck from 'library/components/button/BtnCheck';
import BtnSubmit from 'library/components/button/BtnSubmit';
import InputTheme from 'library/components/input/InputTheme';
import Logo from 'library/components/modal/Logo';
import useUpload from 'library/hooks/useUpload';
import { CreatedUser } from 'library/models';
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
    isJoinGroup: false,
  });
  const [isAdmin, setIsAdmin] = useState(false); // 계장여부
  const [duplicateAdmin, setDuplicateAdmin] = useState(false); // 계장 중복 등록여부
  const [isAgreed, setAgreed] = useState(true);
  const [isSubmitActivate, setSubmitActivate] = useState(false);
  const googleProfileImage = useRef(googleProfile.getImageUrl());

  const { handleInputImage, convertedImage, ProfileIcon, uploadedImage } = useUpload(
    googleProfileImage.current,
  );

  const loginWithForm = useMutation((formData: FormData) => postAuthAddtional(formData), {
    onError: () => {
      // TODO 밸리데이션에러 내려오면 duplicateAdmin true
      setDuplicateAdmin(true);
    },
  });

  const { inputName, nth, blogAddress } = loginForm;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleCheckBox = (): void => {
    setAgreed(!isAgreed);
  };

  const onChangeAdmin = (isAdmin: boolean): void => {
    setIsAdmin(isAdmin);
    setDuplicateAdmin(false);
  };

  useEffect(() => {
    inputName && nth && blogAddress && isAgreed
      ? setSubmitActivate(true)
      : setSubmitActivate(false);
  }, [inputName, nth, blogAddress, isAgreed]);

  const fetchUserData = async (formData: FormData): Promise<void> => {
    const { data, status } = await loginWithForm.mutateAsync(formData);

    if (status === 201) {
      const { token, thumbnail, myGroupStatus, batch } = data;
      setLoginSuccess(true);
      setExistingUser(true);
      sessionStorage.setItem(
        'USER',
        JSON.stringify({
          token,
          thumbnail,
          myGroupStatus,
          batch,
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
    formData.append('is_group_joined', String(false));

    // 계장여부
    formData.append('is_admin', String(isAdmin));

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
            <ManagerSelectBox>
              <div className="question-wrap">
                <span className="question">계장으로 가입하시겠어요?</span>
                <div className="select-icon">
                  <div
                    className={`icon-wrap ${isAdmin ? 'selected' : ''}`}
                    onClick={() => onChangeAdmin(true)}
                  >
                    <Image src={'/images/chicken.png'} width={30} height={30} alt="계장" />
                    <span>예</span>
                  </div>
                  <div
                    className={`icon-wrap ${isAdmin ? '' : 'selected'}`}
                    onClick={() => onChangeAdmin(false)}
                  >
                    <Image src={'/images/chick.png'} width={30} height={30} alt="계장이 아님" />
                    <span>아니오</span>
                  </div>
                </div>
                {duplicateAdmin && (
                  <p className="error-text">입력하신 기수에 계장이 이미 존재합니다.</p>
                )}
              </div>
            </ManagerSelectBox>
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

const ManagerSelectBox = styled.div`
  margin: 5px 0;

  .question-wrap {
    padding-left: 12px;
    padding-bottom: 2px;
  }

  .select-icon {
    display: flex;
    max-width: 150px;
    margin: 8px 0;
  }

  .icon-wrap {
    display: flex;
    flex-direction: column;
    justift-content: center;
    align-items: center;
    width: 40px;
    margin: 0 auto;
    cursor: pointer;
    filter: grayscale(100%);
  }

  .icon-wrap span {
    margin-top: 3px;
    font-size: 10px;
    color: ${({ theme }) => theme.textGrey};
  }

  .selected {
    filter: grayscale(0%);
  }

  .question {
    padding: 0 2px 6px 0;
    font-weight: 500;
    font-size: 15px;
    color: ${({ theme }) => theme.textGrey};
  }

  .error-text {
    padding: 1px 0px 0px 2px;
    font-size: 8px;
    color: red;
  }
`;
