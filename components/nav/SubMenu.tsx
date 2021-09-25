import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import styled from '@emotion/styled';
import { currentUser } from 'library/store/saveUser';

type Props = {
  setDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
  setCreateMyGroupModalOn: React.Dispatch<React.SetStateAction<boolean>>;
};

function SubMenu({
  setDropDownOpen,
  selectedMenu,
  setSelectedMenu,
  setCreateMyGroupModalOn,
}: Props): JSX.Element {
  const user = useSelector(currentUser);
  const router = useRouter();
  const page = {
    mygroup: '내 기수 블로그',
    createMyGroup: '내 기수 페이지 생성',
    bookmark: '북마크',
    myPage: '마이페이지',
    logout: '로그아웃',
  };

  const handleSelected = (e: React.MouseEvent<HTMLLIElement>): void => {
    setSelectedMenu((e.target as HTMLLIElement).innerText);
  };

  const handleFocus = (input: string): string => {
    if (selectedMenu === input) return 'focused';
    return '';
  };

  const handleMyGroup = (e: React.MouseEvent<HTMLLIElement>): Promise<boolean> | void => {
    setDropDownOpen(false);

    if ((e.target as HTMLLIElement).innerText === page.mygroup) {
      setSelectedMenu((e.target as HTMLLIElement).innerText);
      return router.push('/mygroup');
    }
    setCreateMyGroupModalOn(true);
  };

  return (
    <SubMenuBox>
      <li onClick={handleMyGroup} className={handleFocus(page.mygroup)}>
        <div>{user.myGroupStatus ? page.mygroup : page.createMyGroup}</div>
      </li>
      <Link href="/Liked" passHref>
        <li onClick={handleSelected} className={handleFocus(page.bookmark)}>
          {page.bookmark}
        </li>
      </Link>
      <Link href="/myprofile" passHref>
        <li onClick={handleSelected} className={handleFocus(page.myPage)}>
          {page.myPage}
        </li>
      </Link>
      <li onClick={handleSelected}>{page.logout}</li>
    </SubMenuBox>
  );
}

export default SubMenu;

const SubMenuBox = styled.ul`
  position: absolute;
  top: 6.5rem;
  right: 3rem;
  display: flex;
  flex-direction: column;
  width: 11.875rem;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem 0.75rem;
    font-family: ${({ theme }) => theme.fontContent};
    font-style: normal;
    font-size: 1rem;
    line-height: 1.5rem;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.orange};
      font-weight: 400;
    }

    ${({ theme }) => theme.md`
      font-size: 14px;
    `}

    ${({ theme }) => theme.sm`
      font-size: 12px;
    `}
  }

  .focused {
    color: ${({ theme }) => theme.orange};
    font-weight: 900;
  }
`;
