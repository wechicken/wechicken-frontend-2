import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import BtnLike from 'library/components/button/BtnLike';
import BtnEditOrDelete from 'library/components/button/BtnEditOrDelete';
import { Post } from 'library/models/main';
import { setAlert } from 'library/store/setAlert';
import { setLoginModalOn } from 'library/store/setLoginModal';

type Props = {
  post: Post;
  width: string;
  space: string;
  handleRemoveCard?: () => void;
  search?: boolean;
  handlePostId?: (id: number) => void;
  getDeleteMyPostId?: (id: number) => void;
};

function Card({
  post,
  width,
  space,
  handleRemoveCard,
  search,
  handlePostId,
  getDeleteMyPostId,
}: Props): JSX.Element {
  const dispatch = useDispatch();
  const subtitleLimitLength = 125;

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

  return (
    <CardContainer space={space} width={width} search={search}>
      <CardWrap type={post.type} onClick={() => window.open(`${post.link}`)}>
        <ImageBox img={post.thumbnail || '/images/blogDefaultImg.png'} />
        <img className="blogLogo" alt="blog_logo" src={`/images/${post.type}.png`} />
        <ContentsBox>
          <Profile>
            <ProfileIcon size={40} img={post.user_profile} />
            <div className="ProfileText">
              <div className="nth">{post.nth}기</div>
              <div className="name">{post.user_name}</div>
            </div>
          </Profile>
          <Title search={search}>{post.title}</Title>
          {!!search && (
            <Subtitle>
              {post.subtitle?.length > subtitleLimitLength
                ? `${post.subtitle.substr(0, subtitleLimitLength)}...`
                : post.subtitle}
            </Subtitle>
          )}
        </ContentsBox>
      </CardWrap>
      <Tags>{post.date}</Tags>
      <ButtonWrap>
        {typeof post.like === 'boolean' ? (
          <>
            <BtnLike
              id={post.id}
              status={post.like}
              handleRemoveCard={handleRemoveCard}
              type="likes"
              setActiveAlert={needToLogin}
            />
            <BtnLike
              id={post.id}
              status={post.bookmark}
              handleRemoveCard={handleRemoveCard}
              type="bookmarks"
              setActiveAlert={needToLogin}
            />
          </>
        ) : (
          handlePostId &&
          getDeleteMyPostId && (
            <BtnEditOrDelete
              postId={post.id}
              handlePostId={handlePostId}
              getDeleteMyPostId={getDeleteMyPostId}
            />
          )
        )}
      </ButtonWrap>
    </CardContainer>
  );
}

export default Card;

const CardContainer = styled.div<{ space: string; width: string; search: boolean | undefined }>`
  width: ${({ width }) => width};
  min-width: 260px;
  height: 20.4375rem;
  margin: ${({ space }) => space};
  position: relative;
  border-radius: 7px;
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.5s ease-in-out;

  ${({ theme, search, width }) => theme.xl`
    width: 20%;
    ${search && `width: ${width}`}
  `}

  ${({ theme, search, width }) => theme.lg`
    width: 29%;
    height: 280px;
    ${search && `width: ${width}`}
  `}

  ${({ theme, search, width }) => theme.md`
    width: 43%;
    height: 250px;
    ${search && `width: ${width}`}
  `}

  ${({ theme, search }) => theme.sm`
    width: 100%;
    margin: 0 2.25rem 2.25rem 2.25rem;
    ${search && `margin: 10px`}
  `}

  &:hover {
    transform: translate(0, -10px);
  }
`;

const CardWrap = styled.div<{ type: string; onClick: () => Window | null }>`
  width: 100%;
  height: 100%;

  .blogLogo {
    position: absolute;
    top: 12px;
    left: 12px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: ${({ type }) => (['velog', 'medium'].includes(type) ? 'block' : 'none')};
  }
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

const Subtitle = styled.div`
  height: 30%;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 2px;
  color: #2d2b2b;
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
