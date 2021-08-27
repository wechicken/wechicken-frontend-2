import styled from '@emotion/styled';
import { Obj } from 'library/models';
import ProfileIcon from '../profileIcon/ProfileIcon';

type Props = {
  post: Obj;
};

function MiniCard({ post }: Props): JSX.Element {
  return (
    <MiniPostCardContainer>
      <PostContent onClick={() => window.open(`${post.link}`)}>
        <div className="profileIcon">
          <ProfileIcon size={38} img={post.user_profile} />
        </div>
        <div className="contents">
          <span>{post.user_name}</span>
          <span className="postText">{post.title}</span>
        </div>
      </PostContent>
      <PostDateAndType type={post.type}>
        <span>{post.date.slice(5, 12)}</span>
        <div className="blogLogo">
          <img alt="blog_logo" src={`/images/${post.type}.png`} />
        </div>
      </PostDateAndType>
    </MiniPostCardContainer>
  );
}

export default MiniCard;

const MiniPostCardContainer = styled.div`
  width: 275px;
  height: 125px;
  margin: 10px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  font-family: ${({ theme }) => theme.fontContent};

  @media (max-width: 2150px) {
    width: 200px;
    height: 95px;
  }

  @media (max-width: 1850px) {
    width: 185px;
    height: 90px;
    padding: 0;
  }

  @media (max-width: 1650px) {
    width: 165px;
    height: 75px;
    padding: 0;
  }
`;

const PostContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;

  .profileIcon {
    margin-right: 10px;

    @media (max-width: 1650px) {
      display: none;
    }
  }

  .contents {
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      font-size: 12px;
      font-weight: 500;
    }

    .postText {
      width: 205px;
      height: 60px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 6px;
      font-size: 13px;
      font-weight: 200;
      color: ${({ theme }) => theme.fontColor};

      @media (max-width: 2150px) {
        width: 130px;
        height: 40px;
      }

      @media (max-width: 1850px) {
        width: 110px;
        height: 35px;
      }

      @media (max-width: 1650px) {
        width: 112px;
        height: 27px;
      }
    }
  }
`;

const PostDateAndType = styled.div<Obj>`
  margin: -3px 6px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.deepGrey};
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: ${({ type }) => (['velog', 'medium'].includes(type) ? 'block' : 'none')};
  }
`;
