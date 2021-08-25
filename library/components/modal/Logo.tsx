import styled from '@emotion/styled';

function Logo(): JSX.Element {
  return (
    <LogoBox>
      <img className="logoImage" alt="logo" src="/images/logo.png" />
      <span>{`>wechicken`}</span>
    </LogoBox>
  );
}

export default Logo;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;

  ${({ theme }) => theme.sm`
    width: 45%;
  `}

  .logoImage {
    width: 157px;
    height: 157px;

    ${({ theme }) => theme.sm`
      width: 9.8125rem;
      height: 9.8125rem;
    `}
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
