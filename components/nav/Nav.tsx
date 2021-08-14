import { useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import Alert from 'library/components/alert/Alert';
import Login from 'components/login/Login';
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
          <Link href="/">
            <Logo onClick={() => setSelectedMenu('')}>
              <img className="logoImage" alt="logo" src="/Images/logo.png" />
              <div className="logoText">&gt;wechicken</div>
            </Logo>
          </Link>
        </LogoWrap>
        <UserWrap></UserWrap>
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
  height: 111px;
  padding: 0 8vw;
  background-color: ${({ theme }) => theme.white};
  z-index: 9;

  a {
    text-decoration: none;
    color: inherit;
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
    color: #2d2b2b;
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
