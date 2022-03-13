import styled from '@emotion/styled';
import { isNil } from 'lodash-es';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getBatchRank } from 'library/api';
import Emoji from 'library/components/emoji/Emoji';
import Loading from 'library/components/loading/Loading';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import { Obj } from 'library/models';
import { currentUser } from 'library/store/saveUser';
import { flexCenter } from 'styles/theme';
import { Rank } from '../myGroup.model';

type MyGroupBanner = {
  ranking: Rank[];
};

const medal: Obj = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

export default function MyGroupBanner(): JSX.Element {
  const user = useSelector(currentUser);

  const { data, isLoading } = useQuery('getBatchesRank', () => getBatchRank(user.batch.nth));

  if (isLoading || isNil(data)) {
    return <Loading />;
  }

  return (
    <BannerContents>
      <img src="/images/mygroup_banner.png" alt="banner"></img>
      <div className="contents">
        <span className="title">
          RANKING <Emoji symbol="🏆" />
        </span>
        {data.map((user, i) => (
          <div className="rankList" key={user.userId}>
            <Emoji symbol={medal[i + 1]} />
            <span className="rank">{i + 1}위 </span>
            <ProfileIcon size={30} img={user.userThumbnail} />
            <span className="name">{user.userName}</span>
          </div>
        ))}
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

  ${({ theme }) => theme.sm`
    width: 100%;
    flex-direction: column;

    .contents {
      width: 100%;
    }

    img {
      width: 95%;
    }
  `}

  ${({ theme }) => theme.md`
    img {
      width: 95%;
    }
  `}

  ${({ theme }) => theme.lg`
    flex-direction: column;

    img{
      margin-bottom: 3rem;
    }
  `}

  .contents {
    margin-left: 100px;
    display: flex;
    flex-direction: column;

    ${({ theme }) => theme.md`
    margin: 0;
    `}

    .title {
      width: 100%;
      margin-bottom: 20px;
      font-size: 3rem;
      font-weight: 500;
      letter-spacing: 7px;
      color: ${({ theme }) => theme.vermilion};
      word-break: keep-all;

      ${({ theme }) => theme.lg`
        font-size: 2rem;
      `}

      ${({ theme }) => theme.md`
      margin-top: 40px;
      `}

      ${({ theme }) => theme.sm`
      font-size: 30px;
      text-align: center;
      `}
    }

    .rankList {
      margin: 15px 0;
      display: flex;
      align-items: center;
      font-size: 26px;
      font-weight: 600;
      font-family: ${({ theme }) => theme.fontContent};
      color: ${({ theme }) => theme.vermilion};

      ${({ theme }) => theme.md`
      justify-content: center;
      `}

      .rank {
        margin-right: 20px;
      }

      .name {
        margin-left: 20px;
        font-size: 20px;
        color: ${({ theme }) => theme.fontColor};
      }

      ${({ theme }) => theme.sm`
      font-size: 20px;
      `}
    }
  }
`;
