import { css } from '@emotion/react';
import styled from '@emotion/styled';
import map from 'lodash-es/map';
import { Obj } from 'library/models';
import { flexCenter } from 'styles/theme';
import { Bydays } from '../myGroup.model';
import DayColumn from './DayColumn';
import MyGroupJoinModal from './MyGroupJoinModal';

type Props = {
  dayPosts: Bydays;
  isGroupJoined: boolean;
  executeFunction: () => void;
};

export default function PostsOfTheWeek({
  dayPosts,
  isGroupJoined,
  executeFunction,
}: Props): JSX.Element {
  const getDayColumns = (): Obj[] => {
    return map(dayPosts, (posts, day) => ({ day, posts: posts.sort((a, b) => b.id - a.id) }));
  };

  return (
    <Wrap>
      {!isGroupJoined && <MyGroupJoinModal executeFunction={executeFunction} />}
      <Container isGroupJoined={isGroupJoined}>
        <DayColumns>
          {getDayColumns().map(({ posts, day }) => (
            <DayColumn key={day} day={day} dayPosts={posts}></DayColumn>
          ))}
        </DayColumns>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  ${flexCenter};
`;

const Container = styled.div<{ isGroupJoined: boolean }>`
  height: 560px;
  margin: 24px 2vw 0;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  border-radius: 35px;

  ::-webkit-scrollbar {
    display: none;
  }
  ${({ isGroupJoined }) =>
    !isGroupJoined &&
    css`
      filter: blur(4px);
    `}

  ${({ theme }) => theme.sm`
    box-shadow: none;
  `}
`;

const DayColumns = styled.div`
  display: flex;
  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.yellow};
    border-radius: 10px;
  }
`;
