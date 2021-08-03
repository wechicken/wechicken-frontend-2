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

export default function Contributor({ calculatePenalty, postsCounting, person }: Contributor) {
  return (
    <Container>
      <InfoContainer>
        <ProfileIcon size={34} img={person.profile} />
        <UserInfo>
          <div className="name">{person.name}</div>
          <span className="penalty" role="img" aria-labelledby="money">
            <span>{calculatePenalty(postsCounting[person.gmail] || 0)}</span>
          </span>
        </UserInfo>
      </InfoContainer>
      <span role="img" aria-labelledby="check">
        <Emoji symbol="✔️" />
        {postsCounting[person.gmail] || 0}
      </span>
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
  width: 80%;
  display: flex;
`;

const UserInfo = styled.div`
  width: 60px;
  margin-left: 5px;

  .name {
    margin-bottom: 2px;
  }

  .penalty {
    color: ${({ theme }) => theme.vermilion};
    font-size: 14px;
  }
`;
