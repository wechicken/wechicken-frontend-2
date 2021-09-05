/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import Alert from 'library/components/alert/Alert';
import EditForm from './EditForm';
import { theme, flexCenter } from 'styles/theme';
import { MyProfile } from 'library/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

type ProfileColumn = {
  myProfile: MyProfile;
  deleteProfileImg: (deleteTarget: string) => void;
};

function ProfileColumn({ myProfile, deleteProfileImg }: ProfileColumn) {
  // const [handleEditProfileImg, editedProfileImg, ProfileIcon, defaultImg] = useUpload();
  const [isActiveAlert, setActiveAlert] = useState<boolean>(false);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [deleteEvent, setDeleteEvent] = useState<string>('');
  const [contentValue, setContentValue] = useState<string>('');
  console.log({ myProfile });

  // useEffect(() => {
  //   if (editedProfileImg) {
  //     modifyProfileImg();
  //   }
  // }, [editedProfileImg]);

  useEffect(() => {
    setContentValue(myProfile?.blog_address as string);
  }, [myProfile?.blog_address]);

  // 수정 아이콘
  const activeEditForm = () => {
    setisEdit(!isEdit);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setisEdit(!isEdit);
    myProfile.blog_address !== contentValue && modifyBlogUrl();
    e.preventDefault();
  };

  const handleContentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setContentValue(e.target.value);
  };

  const modifyBlogUrl = () => {
    console.log('modifyBlogUrl');
  };

  const modifyProfileImg = () => {
    console.log('modifyProfileImg');
  };
  const handleDeleteProfileImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setDeleteEvent(e.target.name);
    setActiveAlert(true);
  };

  return (
    <ProfileContainer>
      {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          alertMessage={'프로필 이미지를 삭제하시겠습니까?'}
          excuteFunction={() => {
            deleteProfileImg(deleteEvent);
          }}
          submitBtn={'확인'}
          closeBtn={'취소'}
        />
      )}
      <ProfilePhoto>
        <ProfileIcon size={131} />
        <label>
          {/* <input type="file" onChange={handleEditProfileImg} onSubmit={modifyProfileImg} /> */}
          <UploadPhotoBtn>이미지 업로드</UploadPhotoBtn>
        </label>
        <DeletePhotoBtn name="user_thumbnail" onClick={e => handleDeleteProfileImg(e)}>
          이미지 제거
        </DeletePhotoBtn>
      </ProfilePhoto>
      <ProfileContents>
        <span className="userNth">{myProfile?.wecode_nth}기</span>
        <h1 className="userName">{myProfile?.user_name}</h1>
        <div className="userInfo">
          <span className="email">{myProfile?.gmail}</span>
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
  width: 1020px;
  height: 356px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.04);
  border-radius: 47px;
  background: ${theme.white};

  @media (max-width: 375px) {
    flex-direction: column;
    width: 330px;
    height: 500px;
  }
`;

const ProfilePhoto = styled.div`
  width: 320px;
  ${flexCenter};
  flex-direction: column;
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
`;

const UploadPhotoBtn = styled.button`
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
  margin-left: 40px;
  font-weight: 600;
  font-size: 28px;
  color: ${theme.fontColor};
  position: relative;

  h1 {
    margin: 10px 0;
  }
  .userInfo {
    margin-top: 75px;
  }

  .userBlogAddress {
    display: flex;
    align-items: center;
  }

  span {
    display: block;
    margin: 10px 0;
    width: 300px;
    font-size: 18px;
    font-weight: 400;
    color: ${theme.deepGrey};
  }

  .editBtn {
    margin-left: 10px;
    font-size: 18px;
    color: ${theme.orange};
    background-color: transparent;
    cursor: pointer;
  }

  .saveBtn {
    width: 80px;
    height: 10px;
    font-size: 15px;
    font-weight: 600;
    background-color: ${theme.orange};
    color: ${theme.white};
  }

  @media (max-width: 375px) {
    width: 100%;
  }
`;
