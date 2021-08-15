import styled from '@emotion/styled';

function LogoBox() {
  return (
    <Container>
      <img className="logoImage" alt="logo" src="/images/logo.png" />
      <span>{`>wechicken`}</span>
    </Container>
  );
}

export default LogoBox;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;

  .logoImage {
    width: 157px;
    height: 157px;
  }

  span {
    margin-top: 10px;
    font-family: ${({ theme }) => theme.fontTitle};
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: ${({ theme }) => theme.fontColor};
  }
`;
