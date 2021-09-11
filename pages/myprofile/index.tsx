import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { deleteProfileImage } from 'library/api/myprofile';
import ProfileColumn from 'components/myProfile/ProfileColumn';
import { currentUser } from 'library/store/saveUser';
import MyPosts from 'components/myProfile/MyPosts';

export default function MyProfilePage(): JSX.Element {
  const deleteMyProfileImage = useMutation(({ deleteTarget, token }: { [key: string]: string }) =>
    deleteProfileImage({ deleteTarget, token }),
  );

  const user = useSelector(currentUser);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteProfileImg = async (deleteTarget: string) => {
    const { data } = await deleteMyProfileImage.mutateAsync({ deleteTarget, token: user.token });
    if (data.message === 'OK') {
      console.log('프로필 이미지 삭제');
    }
  };

  return (
    <MyPageContainer>
      <ProfileColumn deleteProfileImg={deleteProfileImg} />
      <MyPosts />
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  color: ${({ theme }) => theme.orange};
`;
