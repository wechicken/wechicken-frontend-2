import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import Logo from 'library/components/modal/Logo';
import InputTheme from 'library/components/button/InputTheme';
import BtnCheck from 'library/components/button/BtnCheck';
import BtnSubmit from 'library/components/button/BtnSubmit';
import useUpload from 'library/hooks/useUpload';
import { postAuthAddtional } from 'library/api';
import { CreatedUser } from 'library/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

type Props = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  googleProfile: gapi.auth2.BasicProfile;
  setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setExistingUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginForm({
  setModalOn,
  googleProfile,
  setLoginSuccess,
  setExistingUser,
}: Props): JSX.Element {
  const dispatch = useDispatch();
  const [inputName, setInputName] = useState('');
  const [nth, setNth] = useState('');
  const [blogAddress, setBlogAddress] = useState('');
  const [isJoinGroup, setJoinGroup] = useState(true);
  const [agreementStatus, setAgreementStatus] = useState(true);
  const [isSubmitActivate, setSubmitActivate] = useState(false);
  const googleProfileImage = useRef(googleProfile.getImageUrl());
  const { handleInputImage, convertedImage, ProfileIcon, uploadedImage } = useUpload(
    googleProfileImage.current,
  );
  const loginWithForm = useMutation((formData: FormData) => postAuthAddtional(formData));

  const handleCheckBox = (type: string): void => {
    type === '치킨계 가입(선택)'
      ? setJoinGroup(!isJoinGroup)
      : setAgreementStatus(!agreementStatus);
  };

  useEffect(() => {
    inputName && nth && blogAddress && agreementStatus
      ? setSubmitActivate(true)
      : setSubmitActivate(false);
  }, [inputName, nth, blogAddress, agreementStatus]);

  const fetchUserData = async (formData: FormData): Promise<void> => {
    const { data, status } = await loginWithForm.mutateAsync(formData);

    if (status === 201) {
      setLoginSuccess(true);
      setExistingUser(true);
      sessionStorage.setItem(
        'USER',
        JSON.stringify({
          token: data.token,
          profile: data.profile,
          myGroupStatus: data.myGroupStatus,
          myNth: data.nth,
        }),
      );

      setTimeout(() => {
        setLoginSuccess(false);
        setModalOn(false);
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
      <ContentsBox>
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
            <InputTheme width="156px" type="기수" handleType={setNth} size="14px" />
            <InputTheme width="156px" type="이름" handleType={setInputName} size="14px" />
            <InputTheme width="156px" type="블로그 주소" handleType={setBlogAddress} size="14px" />
            <BtnCheck
              text="치킨계 가입(선택)"
              handleCheckBox={handleCheckBox}
              isChecked={isJoinGroup}
            />
            <BtnCheck
              text="블로그 정보 수집 동의(필수)"
              handleCheckBox={handleCheckBox}
              isChecked={agreementStatus}
            />
          </FormWrap>
        </Form>
        <BtnSubmit
          btnText="제출"
          executeFunction={handleUploadForm}
          isSubmitActivate={isSubmitActivate}
        />
      </ContentsBox>
    </LoginFormBox>
  );
}

const LoginFormBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ContentsBox = styled.div`
  width: 50%;
  padding: 20px;
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;

  .name {
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    color: ${({ theme }) => theme.vermilion};
  }

  .greeting {
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    color: ${({ theme }) => theme.darkGrey};
  }

  .type {
    margin-top: 20px;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: ${({ theme }) => theme.textGrey};
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  height: 230px;
  margin-top: 20px;
`;

const ImageBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 15px 10px 0 10px;

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
