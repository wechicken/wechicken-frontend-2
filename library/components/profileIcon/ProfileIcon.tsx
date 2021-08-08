import styled from '@emotion/styled';

type ProfileIcon = {
  size: number;
  img?: string;
};

export default function ProfileIcon({ size, img }: ProfileIcon) {
  return <Container size={size} img={img || '/images/default.png'}></Container>;
}

const Container = styled.div<ProfileIcon>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: url(${({ img }) => img});
  background-size: cover;
  border-radius: 50%;
  cursor: pointer;
`;
