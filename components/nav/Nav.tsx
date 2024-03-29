import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import CreateMyGroup from 'components/myGroup/createAndModifyMyGroup/CreateMyGroup';
import ModifyMyGroup from 'components/myGroup/createAndModifyMyGroup/ModifyMyGroup';
import Search from 'components/nav/Search';
import SubMenu from 'components/nav/SubMenu';
import { getMockLogin } from 'library/api';
import Button from 'library/components/button/Button';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import { STAGE } from 'library/constants';
import { Stage } from 'library/enums';
import { LoginUser } from 'library/models';
import { currentUser, saveUser } from 'library/store/saveUser';
import { setAlert } from 'library/store/setAlert';
import { setLoginModalOn } from 'library/store/setLoginModal';

type Props = {
  isBlurred: boolean;
  setBlurred: React.Dispatch<React.SetStateAction<boolean>>;
};

function Nav({ isBlurred, setBlurred }: Props): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const router = useRouter();
  const [isdropDownOpen, setDropDownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isCreateMyGroupModalOn, setCreateMyGroupModalOn] = useState(false);
  const [isModifyMyGroup, setModifyMyGroup] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);
  const { mutate: mutateMockLogin } = useMutation((gmail: string) => getMockLogin(gmail), {
    onSuccess: mockLogin => {
      dispatch(saveUser(mockLogin));

      window.location.replace('/');
    },
  });

  const handleSelectedFunctions = useCallback(
    (selected: string): void => {
      setDropDownOpen(false);
      if (selected === '로그아웃') {
        sessionStorage.clear();

        dispatch(
          setAlert({
            setSelectedMenu,
            selectedMenu,
            alertMessage: '로그아웃 하시겠습니까?',
            onSubmit: () => {
              sessionStorage.removeItem('USER');
              window.location.replace('/');
            },
          }),
        );
      }
    },
    [dispatch, selectedMenu],
  );

  useEffect(() => {
    handleSelectedFunctions(selectedMenu);
  }, [selectedMenu, handleSelectedFunctions]);

  const handleMouseOverNav = (idx: string): void => {
    if (idx === 'enter') {
      return setBlurred(false);
    }
    setBlurred(true);
    setDropDownOpen(false);
  };

  const mockLogin = (): void => {
    const tmpGmail = 'guswnl0610@gmail.com';

    mutateMockLogin(tmpGmail);
  };

  const isMyGroupPage = router.pathname === '/mygroup';
  const isDevelop = STAGE === Stage.Development;

  return (
    <>
      <NavBox
        isBlurred={isBlurred}
        onMouseEnter={() => handleMouseOverNav('enter')}
        onMouseLeave={() => handleMouseOverNav('leave')}
      >
        {isCreateMyGroupModalOn && (
          <CreateMyGroup setCreateMyGroupModalOn={setCreateMyGroupModalOn} />
        )}
        {isModifyMyGroup && <ModifyMyGroup setModifyMyGroup={setModifyMyGroup} />}
        <LogoWrap isSearchActive={isSearchActive} isMyGroupPage={isMyGroupPage}>
          <Link href="/" passHref>
            <Logo
              onClick={() => setSelectedMenu('')}
              isSearchActive={isSearchActive}
              isMyGroupPage={isMyGroupPage}
            >
              <img className="logoImage" alt="logo" src="/images/logo.png" />
              <div className="logoText">&gt;wechicken</div>
            </Logo>
          </Link>
          {isMyGroupPage && (
            <>
              <NthTitle>{user.myGroupStatus ? (user as LoginUser).batch.title : ''}</NthTitle>
              {(user as LoginUser)?.isManager && (
                <FontAwesomeIcon
                  onClick={() => setModifyMyGroup(true)}
                  className="settingMyGroup"
                  icon={faCog}
                />
              )}
            </>
          )}
        </LogoWrap>
        <UserWrap>
          {router.pathname !== '/search' && (
            <Search
              setSearchActive={setSearchActive}
              isSearchActive={isSearchActive}
              isBlurred={isBlurred}
            />
          )}
          {user.token ? (
            <>
              {(user as LoginUser).isManager && (
                <img className="masterCrown" alt="master" src="/images/crown.png" />
              )}
              <ProfileIconBox
                isdropDownOpen={isdropDownOpen}
                onMouseOver={() => setDropDownOpen(true)}
              >
                <ProfileIcon size={50} img={user.thumbnail} />
              </ProfileIconBox>
            </>
          ) : (
            <Button
              value="로그인"
              handleFunction={() => dispatch(setLoginModalOn(true))}
              isSearchActive={isSearchActive}
            />
          )}
          {isDevelop && !user.token && (
            <Button value="목로그인" handleFunction={mockLogin}></Button>
          )}
        </UserWrap>
        {isdropDownOpen && (
          <SubMenu
            setDropDownOpen={setDropDownOpen}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            setCreateMyGroupModalOn={setCreateMyGroupModalOn}
          />
        )}
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
  padding: 0 1.875rem;
  height: 6.9375rem;
  transition: 700ms;
  background-color: ${({ theme, isBlurred }) => (isBlurred ? '#ffffff1d' : theme.white)};
  backdrop-filter: ${({ isBlurred }) => (isBlurred ? 'blur(5px)' : 'none')};
  z-index: 9;

  ::after {
    background: linear-gradient(transparent, gray);
  }
`;

const LogoWrap = styled.div<{ isSearchActive: boolean; isMyGroupPage: boolean }>`
  width: 422px;
  height: 52px;
  display: flex;
  align-items: center;

  ${({ isSearchActive, theme }) => theme.sm`
    ${isSearchActive ? 'width: 122px' : 'width: 422px'}
  `}

  .settingMyGroup {
    margin-left: 15px;
    color: ${({ theme }) => theme.deepGrey};
    cursor: pointer;
    opacity: 0.7;
  }

  .settingMyGroup:hover {
    opacity: 1;
  }

  @media only screen and (max-width: 380px) {
    .logoText {
      ${({ isSearchActive, theme, isMyGroupPage }) => theme.sm`
        ${isSearchActive || isMyGroupPage ? 'display: none' : 'display: block'}
      `}
    }
  }
`;

const Logo = styled.a<{ isSearchActive: boolean; isMyGroupPage: boolean }>`
  display: flex;
  align-items: center;
  width: 11.875rem;

  text-decoration: none;
  color: ${({ theme }) => theme.fontColor};

  ${({ isSearchActive, theme, isMyGroupPage }) => theme.sm`
    ${isSearchActive || isMyGroupPage ? 'width: auto' : 'width: 11.875rem'}
  `}

  .logoImage {
    width: 3.1875rem;
    height: 3.25rem;
    margin-right: 10px;
    border-radius: 50px;
  }

  .logoText {
    width: 8.125rem;
    font-family: ${({ theme }) => theme.fontTitle};
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.6875rem;

    ${({ theme }) => theme.sm`
      font-size: 15px;
    `}
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 47px;

  .masterCrown {
    width: 25px;
    height: 25px;
    position: absolute;
    top: -1.25rem;
    right: 12px;

    ${({ theme }) => theme.sm`
      top: -10px;
    `}
  }
`;

const ProfileIconBox = styled.div<{ isdropDownOpen: boolean }>`
  border-radius: 50%;
  padding: 2px;
  border: 3px solid transparent;
  ${({ isdropDownOpen, theme }) =>
    isdropDownOpen &&
    css`
      padding: 2px;
      border: 3px solid ${theme.yellow};
    `}
`;
