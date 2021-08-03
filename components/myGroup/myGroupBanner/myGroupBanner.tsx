import styled from '@emotion/styled';
import Emoji from 'library/components/emoji/Emoji';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import { Obj } from 'library/models';
import { Rank } from '../myGroup.model';
import { flexCenter } from 'styles/theme';

type MyGroupBanner = {
  ranking: Rank[];
};

const medal: Obj = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

export default function MyGroupBanner({ ranking }: MyGroupBanner) {
  return (
    <BannerContents>
      <img src="/images/mygroup_banner.png" alt="banner"></img>
      <div className="contents">
        <span className="title">
          RANKING <Emoji symbol="🏆" />
        </span>
        {ranking.map((rank, i) => {
          return (
            <div className="rankList" key={rank.user_name + rank.user_profile}>
              <Emoji symbol={medal[i + 1]} />
              <span className="rank">{i + 1}위 </span>
              <ProfileIcon size={30} img={rank.user_profile} />
              <span className="name">{rank.user_name}</span>
            </div>
          );
        })}
      </div>
    </BannerContents>
  );
}

const BannerContents = styled.div`
  ${flexCenter}
  font-family: ${({ theme }) => theme.fontTitle};

  img {
    width: 530px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }

  @media (max-width: 375px) {
    flex-direction: column;

    img {
      width: 330px;
    }
  }

  .contents {
    margin-left: 100px;
    display: flex;
    flex-direction: column;

    @media (max-width: 800px) {
      margin: 0;
    }

    .title {
      width: 350px;
      margin-bottom: 20px;
      font-size: 50px;
      font-weight: 500;
      letter-spacing: 7px;
      color: ${({ theme }) => theme.vermilion};
      word-break: keep-all;

      @media (max-width: 800px) {
        margin-top: 40px;
      }

      @media (max-width: 375px) {
        font-size: 30px;
        text-align: center;
      }
    }

    .rankList {
      margin: 15px 0;
      display: flex;
      align-items: center;
      font-size: 26px;
      font-weight: 600;
      font-family: ${({ theme }) => theme.fontContent};
      color: ${({ theme }) => theme.vermilion};

      @media (max-width: 800px) {
        justify-content: center;
      }

      .rank {
        margin-right: 20px;
      }

      .name {
        margin-left: 20px;
        font-size: 20px;
        color: ${({ theme }) => theme.fontColor};
      }
      @media (max-width: 375px) {
        font-size: 20px;
      }
    }
  }
`;
