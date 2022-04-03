import { useState } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getBatchContribution } from 'library/api';
import Emoji from 'library/components/emoji/Emoji';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import { BatchesContribution } from 'library/models';
import { currentUser } from 'library/store/saveUser';
import Contributor from './contributor';

export default function Contributors(): JSX.Element {
  const [myContribution, setMyContribution] = useState<BatchesContribution>();
  const [otherContributions, setOtherContributions] = useState<BatchesContribution[]>([]);

  const user = useSelector(currentUser);

  useQuery(
    ['getBatchContribution', user.batch.nth],
    () => getBatchContribution(user.batch.nth, dayjs().format('YYYY-MM-DD')),
    {
      onSuccess: contributions => {
        const me = contributions.find(contribution => contribution.userName === user.name);

        setMyContribution(me);
        setOtherContributions(
          contributions.filter(contribution => contribution.userId !== me?.userId),
        );
      },
    },
  );

  return (
    <Container>
      {myContribution && (
        <MyContribution>
          <InfoContainer>
            <ProfileIcon size={40} img={myContribution.userThumbnail} />
            <UserInfo>
              <div className="user-container">
                <div className="name">{myContribution.userName}</div>
                <span className="penalty" role="img" aria-labelledby="celebration">
                  {myContribution.penalty}
                </span>
              </div>
              <span role="img" aria-labelledby="check">
                <Emoji symbol="✔️" /> {myContribution.blogsCount}
              </span>
            </UserInfo>
          </InfoContainer>
        </MyContribution>
      )}
      <OtherContribution>
        {otherContributions.map(contribution => {
          return <Contributor key={contribution.userId} contribution={contribution} />;
        })}
      </OtherContribution>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  max-width: 2080px;
  height: 120px;
  margin: 24px 6vw 0;
  background: #ffffff;
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  border-radius: 28px;

  @media (min-width: 1850px) {
    margin: 24px 2vw;
  }

  @media (max-width: 1650px) {
    margin: 24px 2vw;
  }
`;

const MyContribution = styled.div`
  height: 85px;
  max-width: 140px;
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.07);
  overflow: hidden;
`;

const InfoContainer = styled.div`
  display: flex;

  ${({ theme }) => theme.sm`
    flex-direction: column;
    align-items: center;
  `}
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;

  .user-container {
    padding-right: 0.5rem;
  }

  .name {
    margin-bottom: 2px;
  }

  .penalty {
    color: ${({ theme }) => theme.vermilion};
    font-size: 14px;
  }

  ${({ theme }) => theme.sm`
    flex-direction: column;
    margin-top: 1rem;

    .name{
      text-align: center;
    }
  `}
`;

const OtherContribution = styled.div`
  display: flex;
  height: 120px;
  margin-left: 180px;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.yellow};
    border-radius: 28px;
  }

  ${({ theme }) => theme.sm`
    margin-left: 100px;  
  `}
`;
