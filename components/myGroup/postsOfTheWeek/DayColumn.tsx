import styled from '@emotion/styled';
import MiniCard from 'library/components/card/MiniCard';
import { Obj } from 'library/models';
import { flexCenter } from 'styles/theme';

type Props = {
  day: string;
  dayPosts: Obj[];
};

export default function DayColumn({ day, dayPosts }: Props): JSX.Element {
  return (
    <DayColumnContainer>
      <DayOfTheWeek day={day}>
        <div>
          <span>{day}</span>
        </div>
      </DayOfTheWeek>
      <Wrap>
        {dayPosts.map(post => (
          <MiniCard post={post} key={post.id}></MiniCard>
        ))}
      </Wrap>
    </DayColumnContainer>
  );
}

const DayColumnContainer = styled.div`
  margin-top: 43px;
`;

const DayOfTheWeek = styled.div<{ day: string }>`
  display: flex;
  right: 0;

  div {
    width: 285px;
    height: 40px;
    margin: 0 5px;
    ${flexCenter}
    background-color:${({ day, theme }) => (day === 'SUN' ? `${theme.orange}` : `${theme.grey}`)};
    color: ${({ day, theme }) => day === 'SUN' && `${theme.white}`};
    border-radius: 17px;

    @media (max-width: 2150px) {
      width: 210px;
      height: 37px;
    }

    @media (max-width: 1850px) {
      width: 200px;
      height: 37px;
    }

    @media (max-width: 1650px) {
      width: 175px;
    }
  }

  .flex {
    display: flex;
    flex-direction: row;
  }
`;

const Wrap = styled.div`
  height: 450px;
  margin-top: 20px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
