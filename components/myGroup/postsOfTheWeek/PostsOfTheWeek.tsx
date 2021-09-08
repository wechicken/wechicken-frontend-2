import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Alert from 'library/components/alert/Alert';
import { Obj } from 'library/models';
import map from 'lodash-es/map';
import { useState } from 'react';
import { flexCenter } from 'styles/theme';
import { Bydays } from '../myGroup.model';
import DayColumn from './DayColumn';
import MyGroupJoinModal from './MyGroupJoinModal';

type Props = {
  dayPosts: Bydays;
  isGroupJoined: boolean;
  executeFunction: () => void;
};

export default function PostsOfTheWeek({ dayPosts, isGroupJoined, executeFunction }: Props) {
  const [isActiveAlert, setActiveAlert] = useState<boolean>(false);

  const getDayColumns = (): Obj[] => {
    return map(dayPosts, (posts, day) => ({ day, posts: posts.sort((a, b) => b.id - a.id) }));
  };

  return (
    <Wrap>
      {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          alertMessage="치킨계에 가입하시겠습니까?"
          onSubmit={executeFunction}
          submitBtnText="가입"
        ></Alert>
      )}
      {!isGroupJoined && <MyGroupJoinModal setActiveAlert={setActiveAlert}></MyGroupJoinModal>}
      <Container isGroupJoined={isGroupJoined}>
        <DayColumns>
          {/* {getDayColumns().map(({ data, day }) => (
            <DayColumn day={day} dayPosts={data} key={day}>
              {'호이'}
            </DayColumn>
          ))} */}
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

const ModalBackground = styled.div`
  width: 101%;
  height: 100%;
  position: absolute;
  border-radius: 35px;
  background-color: ${({ theme }) => theme.white};
  opacity: 0.5;
  z-index: 1;
`;
