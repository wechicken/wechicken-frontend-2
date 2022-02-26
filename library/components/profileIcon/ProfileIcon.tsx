import styled from '@emotion/styled';

export type ProfileIconProps = {
  size: number;
  img?: string | null;
};

export default function ProfileIcon({ size, img }: ProfileIconProps): JSX.Element | null {
  if (img === null) return null;
  return <ProfileIconBox size={size} img={img}></ProfileIconBox>;
}

const ProfileIconBox = styled.div<ProfileIconProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: url(${({ img }) => img || '/images/default.png'});
  background-size: cover;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.superLightGrey};
`;
