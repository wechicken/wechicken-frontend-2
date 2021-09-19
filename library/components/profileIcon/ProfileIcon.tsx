import styled from '@emotion/styled';
import Image from 'next/image';

export type ProfileIconProps = {
  size: number;
  img?: string;
};

export default function ProfileIcon({ size, img }: ProfileIconProps): JSX.Element {
  return (
    <ProfileIconBox size={size} img={img}>
      <Image
        src={img || '/images/default.png'}
        alt="profile"
        width={`${size}px`}
        height={`${size}px`}
      />
    </ProfileIconBox>
  );
}

const ProfileIconBox = styled.div<ProfileIconProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.superLightGrey};
  cursor: pointer;
  overflow: hidden;
`;
