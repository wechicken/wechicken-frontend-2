import styled from '@emotion/styled';
import Emoji from 'library/components/emoji/Emoji';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import { currentUser } from 'library/store/saveUser';
import { useSelector } from 'react-redux';
import { MyGroupSub, MyGroupUser, MyProfile, UserPostsCounting } from '../myGroup.model';
import Contributor from './contributor';

type Contributors = {
  myContribution: MyProfile;
  contributor: MyGroupUser[];
  postsCounting: UserPostsCounting;
  myGroup: MyGroupSub;
};

export default function Contributors({
  myContribution,
  contributor,
  postsCounting,
  myGroup,
}: Contributors): JSX.Element {
  // const userProfileImg = useSelector(state => state.userProfileReducer);
  const user = useSelector(currentUser);

  const calculatePenalty = (userCount: number): JSX.Element => {
    const { count, penalty } = myGroup;
    const totalPenalty = count - userCount < 0 ? 0 : (count - userCount) * penalty;

    return (
      <>
        <Emoji symbol={totalPenalty ? '💸' : '🎉'} />
        <span>{totalPenalty || 'no penalty'}</span>
      </>
    );
  };

  return (
    <Container>
      <MyContribution>
        <InfoContainer>
          <ProfileIcon size={40} img={user.profile} />
          <UserInfo>
            <div className="user-container">
              <div className="name">{myContribution.name}</div>
              <span className="penalty" role="img" aria-labelledby="celebration">
                {calculatePenalty(postsCounting[myContribution.gmail] || 0)}
              </span>
            </div>
            <span role="img" aria-labelledby="check">
              <Emoji symbol="✔️" /> {postsCounting[myContribution.gmail] || 0}
            </span>
          </UserInfo>
        </InfoContainer>
      </MyContribution>
      <OtherContribution>
        {contributor.map((person, idx) => {
          return (
            <Contributor
              calculatePenalty={calculatePenalty}
              postsCounting={postsCounting}
              key={idx}
              person={person}
            />
          );
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
