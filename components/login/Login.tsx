import styled from '@emotion/styled';

type Props = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ setModalOn }: Props) {
  return <LoginBox></LoginBox>;
}

export default Login;

const LoginBox = styled.div``;
