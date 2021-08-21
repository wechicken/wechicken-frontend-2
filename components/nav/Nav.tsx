import { useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import Login from 'components/login/Login';
import Alert from 'library/components/alert/Alert';
import Button from 'library/components/button/Button';

// TODO 작성 중
type Props = {
  isBlurred: boolean;
  setBlurred: React.Dispatch<React.SetStateAction<boolean>>;
};

function Nav({ isBlurred, setBlurred }: Props) {
  const router = useRouter();
  // const [isdropDownOpen, setDropDownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isModalOn, setModalOn] = useState(false);
  const [isActiveAlert, setActiveAlert] = useState(false);

  const handleSelectedFunctions = (selected: string) => {
    // setDropDownOpen(false);
    if (selected === '로그아웃') {
      setActiveAlert(true);
    }
  };

  const loginStatus = false;

  useEffect(() => {
    handleSelectedFunctions(selectedMenu);
  }, [selectedMenu]);

  const handleMouseOverNav = (idx: string) => {
    if (idx === 'enter') {
      return setBlurred(false);
    }
    setBlurred(true);
    // setDropDownOpen(false);
  };

  return (
    <>
      {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          setSelectedMenu={setSelectedMenu}
          selectedMenu={selectedMenu}
          alertMessage="로그아웃 하시겠습니까?"
          excuteFunction={() => {
            sessionStorage.removeItem('USER');
            router.push('/');
            window.location.reload();
          }}
          submitBtn="확인"
          closeBtn="취소"
        />
      )}
      <NavBox
        isBlurred={isBlurred}
        onMouseEnter={() => handleMouseOverNav('enter')}
        onMouseLeave={() => handleMouseOverNav('leave')}
      >
        {isModalOn && <Login setModalOn={setModalOn} />}
        <LogoWrap>
          <Link href="/" passHref>
            <Logo onClick={() => setSelectedMenu('')}>
              <img className="logoImage" alt="logo" src="/images/logo.png" />
              <div className="logoText">&gt;wechicken</div>
            </Logo>
          </Link>
        </LogoWrap>
        <UserWrap>
          {loginStatus ? (
            <>
              {JSON.parse(sessionStorage.getItem('USER') ?? '')?.master && (
                <img className="masterCrown" alt="master" src="/images/crown.png" />
              )}
              {/* <div onMouseOver={() => setDropDownOpen(true)}>
                <ProfileIcon size={50} img={userProfileImg} />
              </div> */}
            </>
          ) : (
            <Button value="로그인" handleFunction={() => setModalOn(true)} />
          )}
        </UserWrap>
      </NavBox>
    </>
  );
}

export default Nav;

const NavBox = styled.div<{ isBlurred: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 111px;
  transition: 900ms;
  background-color: ${({ theme, isBlurred }) => (isBlurred ? '#ffffff1d' : theme.white)};
  backdrop-filter: ${({ isBlurred }) => (isBlurred ? 'blur(5px)' : 'none')};
  z-index: 9;

  ::after {
    background: linear-gradient(transparent, gray);
  }
`;

const LogoWrap = styled.div`
  width: 422px;
  height: 52px;
  display: flex;
  align-items: center;

  .settingMyGroup {
    margin-left: 15px;
    color: ${({ theme }) => theme.deepGrey};
    cursor: pointer;
    opacity: 0.7;
  }
  .settingMyGroup:hover {
    opacity: 1;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  width: 190px;
  text-decoration: none;
  color: ${({ theme }) => theme.fontColor};

  .logoImage {
    width: 51px;
    height: 52px;
    margin-right: 10px;
    border-radius: 50px;
  }

  .logoText {
    width: 130px;
    font-family: ${({ theme }) => theme.fontTitle};
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
  }
`;

const UserWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 47px;
  position: relative;

  .masterCrown {
    width: 25px;
    height: 25px;
    position: absolute;
    top: -20px;
    right: 12px;
  }
`;
