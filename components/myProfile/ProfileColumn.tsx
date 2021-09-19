import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, setUserProfileImg } from 'library/store/saveUser';
import { setAlert } from 'library/store/setAlert';
import EditForm from './EditForm';
import { theme, flexCenter } from 'styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteProfileImage, getMyProfile, modifyBlogUrl, modifyProfileImage } from 'library/api';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import Loading from 'library/components/loading/Loading';

function ProfileColumn(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const [isEdit, setisEdit] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState<string>('');
  const { data, refetch } = useQuery(
    'getMyProfile',
    async () => {
      return (await getMyProfile()).mypage;
    },
    {
      onSuccess: ({ blog_address }) => {
        setContentValue(blog_address);
        // TODO 현재 /로 끝나는 주소 입력시 500에러 내려옴. toast 추가후 에러시 토스트 얼럿 추가 필요
      },
    },
  );

  const { mutate: mutateDeleteProfileImage } = useMutation(
    (deleteTarget: string) => deleteProfileImage(deleteTarget),
    {
      onSuccess: () => {
        dispatch(setUserProfileImg(''));
        window.location.reload();
      },
    },
  );

  const { mutate: mutateModifyProfileImage } = useMutation(
    (formData: FormData) => modifyProfileImage(formData),
    {
      onSuccess: ({ data }) => {
        dispatch(setUserProfileImg(data.profile));
        window.location.reload();
      },
    },
  );

  const { mutate: mutateBlogUrl } = useMutation(
    (blogAddress: string) => modifyBlogUrl(blogAddress),
    { onSuccess: () => refetch() },
  );

  // 수정 아이콘
  const activeEditForm = (): void => {
    setisEdit(isEdit => !isEdit);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setisEdit(!isEdit);
    data?.blog_address !== contentValue && mutateBlogUrl(contentValue);
    e.preventDefault();
  };

  const handleProfileImageChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = target;

    if (files) {
      const formData = new FormData();

      formData.append('user_thumbnail', files[0] as Blob);
      mutateModifyProfileImage(formData);
    }
  };

  const handleContentValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    return setContentValue(e.target.value);
  };

  const handleDeleteProfileImg = ({ currentTarget }: React.MouseEvent<HTMLDivElement>): void => {
    dispatch(
      setAlert({
        alertMessage: '프로필 이미지를 삭제하시겠습니까?',
        onSubmit: () => {
          mutateDeleteProfileImage(currentTarget.id);
        },
        submitBtnText: '확인',
        closeBtnText: '취소',
      }),
    );
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <ProfileContainer>
      <ProfilePhoto>
        <ProfileIcon size={131} img={user.profile} />
        <label>
          <input type="file" accept="image/*" onChange={handleProfileImageChange} />
          <UploadPhotoBtn>이미지 업로드</UploadPhotoBtn>
        </label>
        <DeletePhotoBtn id="user_thumbnail" onClick={handleDeleteProfileImg}>
          이미지 제거
        </DeletePhotoBtn>
      </ProfilePhoto>
      <ProfileContents>
        <span className="userNth">{data.wecode_nth}기</span>
        <h1 className="userName">{data.user_name}</h1>
        <div className="userInfo">
          <span className="email">{data.gmail}</span>
          {isEdit ? (
            <EditForm
              contentValue={contentValue}
              handleContentValue={handleContentValue}
              handleSubmit={handleSubmit}
            />
          ) : (
            <div className="userBlogAddress">
              <span>
                {contentValue}
                <FontAwesomeIcon className="editBtn" onClick={activeEditForm} icon={faEdit} />
              </span>
            </div>
          )}
        </div>
      </ProfileContents>
    </ProfileContainer>
  );
}

export default ProfileColumn;

const ProfileContainer = styled.section`
  max-width: 1440px;
  width: 100%;
  height: 356px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.04);
  border-radius: 47px;
  background: ${theme.white};

  ${({ theme }) => theme.sm`
    flex-direction: column;
    width: 75%;
    height: 450px;
  `}
`;

const ProfilePhoto = styled.div`
  width: 320px;
  ${flexCenter};
  flex-direction: column;
  margin-right: 10px;
  font-family: ${theme.fontContent};
  font-weight: 500;
  border-right: 3px solid ${theme.yellow};
  img {
    margin: 10px 0;
    border-radius: 100%;
  }
  input {
    display: none;
  }
  @media (max-width: 375px) {
    border: none;
  }

  ${({ theme }) => theme.sm`
    border: none;
  `}
`;

const UploadPhotoBtn = styled.div`
  width: 164px;
  height: 36px;
  margin: 10px 0;
  ${flexCenter};
  border-radius: 4px;
  color: ${theme.white};
  background: ${theme.opacityOrange};
  border: none;
  cursor: pointer;
  &:hover {
    transition: 0.3s ease-in-out;
    background: ${theme.orange};
  }
`;

const DeletePhotoBtn = styled(UploadPhotoBtn)`
  background-color: transparent;
  color: ${theme.orange};
  &:hover {
    transition: 0.3s ease-in-out;
    background: rgba(255, 153, 0, 0.2);
  }
`;

const ProfileContents = styled.div`
  width: 60%;
  height: 200px;
  margin: 1rem auto;
  font-weight: 600;
  font-size: 1.6rem;
  color: ${theme.fontColor};
  position: relative;
  h1 {
    margin: 10px 0;
  }
  .userInfo {
    margin-top: 3rem;
  }
  .userBlogAddress {
    display: flex;
    align-items: center;
  }
  span {
    display: block;
    margin: 10px 0;
    width: 300px;
    font-size: 1.1rem;
    font-weight: 400;
    color: ${theme.deepGrey};
  }
  .editBtn {
    margin-left: 10px;
    font-size: 1.1rem;
    color: ${theme.orange};
    background-color: transparent;
    cursor: pointer;
  }
  .saveBtn {
    width: 80px;
    height: 10px;
    font-size: 1rem;
    font-weight: 600;
    background-color: ${theme.orange};
    color: ${theme.white};
  }

  ${({ theme }) => theme.sm`
    width: 100$
  `}
`;
