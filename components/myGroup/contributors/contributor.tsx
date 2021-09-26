import styled from '@emotion/styled';
import Emoji from 'library/components/emoji/Emoji';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import { Obj } from 'library/models';
import { MyGroupUser } from '../myGroup.model';

type Contributor = {
  calculatePenalty: (_: number) => JSX.Element;
  postsCounting: Obj;
  person: MyGroupUser;
};

export default function Contributor({
  calculatePenalty,
  postsCounting,
  person,
}: Contributor): JSX.Element {
  return (
    <Container>
      <InfoContainer>
        <div className="user-container">
          <ProfileIcon size={34} img={person.profile} />
          <UserInfo>
            <div className="name">{person.name}</div>
            <span className="penalty" role="img" aria-labelledby="money">
              <span>{calculatePenalty(postsCounting[person.gmail] || 0)}</span>
            </span>
          </UserInfo>
        </div>
        <span role="img" aria-labelledby="check">
          <Emoji symbol="✔️" />
          {postsCounting[person.gmail] || 0}
        </span>
      </InfoContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  .user-container {
    display: flex;
  }

  ${({ theme }) => theme.sm`
    flex-direction: column;
    align-items: center;

    .user-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
`}
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90px;
  margin-left: 5px;

  .name {
    margin-bottom: 2px;
  }

  .penalty {
    color: ${({ theme }) => theme.vermilion};
    font-size: 14px;
  }

  ${({ theme }) => theme.sm`
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;

    .name{
      text-align: center;
    }
  `}
`;
