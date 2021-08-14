import { useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import Login from 'components/login/Login';
import Alert from 'library/components/alert/Alert';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import Button from 'library/components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const router = useRouter();
  const [isdropDownOpen, setDropDownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isModalOn, setModalOn] = useState(false);
  const [isCreateMyGroupModalOn, setCreateMyGroupModalOn] = useState(false);
  const [isModifyMyGroup, setModifyMyGroup] = useState(false);
  const [isActiveAlert, setActiveAlert] = useState(false);

  const handleSelectedFunctions = (selected: string) => {
    setDropDownOpen(false);
    if (selected === '로그아웃') {
      setActiveAlert(true);
    }
  };

  let loginStatus = false;
  let userProfileImg = '';

  useEffect(() => {
    handleSelectedFunctions(selectedMenu);
  }, [selectedMenu]);

  return (
    <>
      {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          setSelectedMenu={setSelectedMenu}
          selectedMenu={selectedMenu}
          alertMessage={'로그아웃 하시겠습니까?'}
          excuteFunction={() => {
            sessionStorage.removeItem('USER');
            router.push('/');
            window.location.reload();
          }}
          submitBtn={'확인'}
          closeBtn={'취소'}
        />
      )}
      <NavBox onMouseLeave={() => setDropDownOpen(false)}>
        {isModalOn && <Login setModalOn={setModalOn} />}
        <LogoWrap>
          <Link href="/" passHref>
            <Logo onClick={() => setSelectedMenu('')}>
              <img className="logoImage" alt="logo" src="/Images/logo.png" />
              <div className="logoText">&gt;wechicken</div>
            </Logo>
          </Link>
        </LogoWrap>
        <UserWrap>
          {loginStatus ? (
            <>
              {JSON.parse(sessionStorage.getItem('USER') ?? '')?.master && (
                <img className="masterCrown" alt="master" src="/Images/crown.png" />
              )}
              <div onMouseOver={() => setDropDownOpen(true)}>
                <ProfileIcon size={50} img={userProfileImg} />
              </div>
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

const NavBox = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  height: 111px;
  background-color: ${({ theme }) => theme.white};
  z-index: 9;
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

const NthTitle = styled.div`
  font-family: ${({ theme }) => theme.fontTitle};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: ${({ theme }) => theme.orange};
`;

const UserWrap = styled.div`
  display: flex;
  justify-content: center;
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
