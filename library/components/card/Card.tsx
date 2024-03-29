import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import BtnEditOrDelete from 'library/components/button/BtnEditOrDelete';
import BtnLike from 'library/components/button/BtnLike';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import { Post } from 'library/models/main';
import { setAlert } from 'library/store/setAlert';
import { setLoginModalOn } from 'library/store/setLoginModal';

type Props = {
  width?: string;
  post: Post;
  handleRemoveCard?: () => void;
  search?: boolean;
  handlePostId?: (id: number) => void;
  getDeleteMyPostId?: (id: number) => void;
};

function Card({
  width,
  post,
  handleRemoveCard,
  search,
  handlePostId,
  getDeleteMyPostId,
}: Props): JSX.Element {
  const dispatch = useDispatch();

  const needToLogin = (): void => {
    dispatch(
      setAlert({
        alertMessage: '로그인이 필요한 서비스입니다.',
        submitBtnText: '로그인',
        closeBtnText: '취소',
        onClose: () => dispatch(setAlert(null)),
        onSubmit: () => dispatch(setLoginModalOn(true)),
      }),
    );
  };

  const { id, title, link, thumbnail, writtenDate, user, isLiked, isBookmarked } = post;

  return (
    <CardContainer width={width as string} search={search}>
      <CardWrap onClick={() => window.open(`${link}`)}>
        <ImageBox img={thumbnail || '/images/blogDefaultImg.png'} />
        {user.blogType.name && (
          <BlogLogoBox type={user.blogType.name}>
            <img src={`/images/${user.blogType.name}.png`} alt="blog_logo" width={26} height={26} />
          </BlogLogoBox>
        )}
        <ContentsBox>
          <Profile>
            <ProfileIcon size={40} img={user.thumbnail} />
            <div className="ProfileText">
              <div className="nth">{user.batch.nth}기</div>
              <div className="name">{user.name}</div>
            </div>
          </Profile>
          <Title search={search}>{title}</Title>
        </ContentsBox>
      </CardWrap>
      <Tags>{writtenDate}</Tags>
      <ButtonWrap>
        {handlePostId && getDeleteMyPostId ? (
          <BtnEditOrDelete
            postId={id}
            handlePostId={handlePostId}
            getDeleteMyPostId={getDeleteMyPostId}
          />
        ) : (
          <>
            <BtnLike
              id={post.id}
              status={isLiked}
              handleRemoveCard={handleRemoveCard}
              type="likes"
              setActiveAlert={needToLogin}
            />
            <BtnLike
              id={id}
              status={isBookmarked}
              handleRemoveCard={handleRemoveCard}
              type="bookmarks"
              setActiveAlert={needToLogin}
            />
          </>
        )}
      </ButtonWrap>
    </CardContainer>
  );
}

export default Card;

const CardContainer = styled.div<{ width: string; search: boolean | undefined }>`
  ${({ search, width }) =>
    search &&
    css`
      width: ${width};
      margin-bottom: 30px;
    `}
  height: 20.4375rem;
  position: relative;
  border-radius: 7px;
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.5s ease-in-out;

  ${({ theme, search, width }) => theme.xl`
    ${search && `width: ${width}`}
  `}

  ${({ theme, search, width }) => theme.lg`
    height: 280px;
    ${search && `width: ${width}`}
  `}

  ${({ theme, search, width }) => theme.md`
    height: 250px;
    ${search && `width: ${width}`}
  `}

  ${({ theme, search }) => theme.sm`
  width: 100%;
    margin: 0 2.25rem 2.25rem 2.25rem;
    ${search && `margin: 10px`}
    ${search && `width: 90%`}
  `}

  &:hover {
    transform: translate(0, -10px);
  }
`;

const CardWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageBox = styled.div<{ img: string }>`
  height: 40%;
  background: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
`;

const ContentsBox = styled.div`
  height: 55%;
  padding: 15px;
`;

const Profile = styled.div`
  height: 30%;
  display: flex;
  justify-content: flex-start;

  .ProfileText {
    margin-left: 16px;

    .nth {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.6);
    }

    .name {
      margin-top: 5px;
      font-weight: 500;
      font-size: 17px;
      color: #2d2b2b;
    }
  }
`;

const Title = styled.div<{ search: boolean | undefined }>`
  margin: 5px 0;
  font-size: 15px;
  font-weight: ${({ search }) => (search ? 500 : 400)};
  line-height: 20px;
  margin-bottom: 2px;
  color: #2d2b2b;
  word-break: break-word;
  overflow: hidden;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  ${({ theme }) => theme.lg`
    -webkit-line-clamp: 3;
  `}

  ${({ theme }) => theme.md`
    margin: 10px 0;
    -webkit-line-clamp: 2;
  `}

  ${({ search }) =>
    search &&
    css`
      -webkit-line-clamp: 2;
    `}
`;

const Tags = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: 14px;
`;

const ButtonWrap = styled.div`
  width: 80px;
  height: 25px;
  position: absolute;
  bottom: 12px;
  right: 16px;
`;

const BlogLogoBox = styled.div<{ type: string }>`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: ${({ type }) =>
    ['velog', 'medium', 'github', 'tistory', 'notion'].includes(type) ? 'block' : 'none'};
  overflow: hidden;
`;
