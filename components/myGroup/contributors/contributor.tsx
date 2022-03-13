import styled from '@emotion/styled';
import Emoji from 'library/components/emoji/Emoji';
import ProfileIcon from 'library/components/profileIcon/ProfileIcon';
import { BatchesContribution } from 'library/models/batch';

type Contributor = {
  contribution: BatchesContribution;
};

export default function Contributor({ contribution }: Contributor): JSX.Element {
  return (
    <Container>
      <InfoContainer>
        <div className="user-container">
          <ProfileIcon size={34} img={contribution.userThumbnail} />
          <UserInfo>
            <div className="name">{contribution.userName}</div>
            <span className="penalty" role="img" aria-labelledby="money">
              <span>{contribution.penalty}</span>
            </span>
          </UserInfo>
        </div>
        <span role="img" aria-labelledby="check">
          <Emoji symbol="✔️" />
          {contribution.blogsCount}
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
