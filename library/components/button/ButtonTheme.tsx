import styled from '@emotion/styled';
import { flexCenter } from 'styles/theme';

type Props = {
  value: string;
  handleFunction: () => void;
};

export default function BtnTheme({ value, handleFunction }: Props) {
  return <Container onClick={() => handleFunction()}>{value}</Container>;
}

const Container = styled.div`
  ${flexCenter}
  font-family: ${({ theme }) => theme.fontContent};
  width: 82px;
  height: 32px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.orange};
  border-radius: 1rem;
  cursor: pointer;
`;
