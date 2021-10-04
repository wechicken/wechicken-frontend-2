import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { flexCenter } from 'styles/theme';
import Calendar from 'react-calendar';
import { QueryFunctionContext, useQuery } from 'react-query';
import { GroupByDate, MyGroup } from '../myGroup.model';
import { getPostsByDate } from 'library/api';
import 'react-calendar/dist/Calendar.css';

type Props = {
  handleClickDate: (_: GroupByDate) => void;
  data: MyGroup;
};

function CustomCalendar({ handleClickDate, data }: Props): JSX.Element {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
  useQuery(
    ['Get Posts By Date', date],
    ({ queryKey }: QueryFunctionContext) => {
      const [_, selectedDate] = queryKey;
      const formattedDate = (selectedDate as dayjs.Dayjs).format('YYYYMMDD');

      return getPostsByDate(formattedDate);
    },
    {
      onSuccess: (data): void => {
        handleClickDate(data);
      },
    },
  );

  useEffect(() => {
    setDate(dayjs());
  }, [data]);

  const selectDate = (selected: Date): void => {
    const selectedDate = dayjs(selected);

    setDate(selectedDate);
    setIsCalendarVisible(false);
  };

  const onClickMoreButton = (): void => {
    setIsCalendarVisible(visibility => !visibility);
  };

  return (
    <>
      <MonthOfTheWeek onClick={onClickMoreButton}>
        <span className="moreBtn">▾</span>
        <span>
          {date.format('MMMM')}
          <span className="week">{date.date()}일</span>
        </span>
      </MonthOfTheWeek>
      <CalendarContainer>
        {isCalendarVisible && <Calendar onClickDay={selectDate} />}
      </CalendarContainer>
    </>
  );
}

const CalendarContainer = styled.div`
  z-index: 20;
  position: absolute;
  top: 60px;
  right: 100px;

  @keyframes showBox {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }

  ${({ theme }) => theme.sm`
  top: 95px;
  right: 25px;
  `}

  .react-calendar {
    width: 300px;
    height: 324px;
    ${flexCenter}
    flex-direction:column;
    overflow: hidden;
    animation: showBox 0.5s;
    background-color: white;
    border: none;
    border-radius: 18px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.07), 0px 24px 48px rgba(0, 0, 0, 0.05);
  }

  .react-calendar__month-view__days__day--weekend {
    color: red;
  }

  .react-calendar__tile--active {
    background: #f2994a;
    color: white;
  }

  .react-calendar__tile--hasActive {
    background: #f2994a;
  }

  .react-calendar__tile--now {
    background: rgba(242, 153, 74, 0.6);
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #f2994a;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #f2994a;
  }
`;

const MonthOfTheWeek = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 8px;
  font-size: 20px;

  span {
    cursor: pointer;
  }

  .moreBtn {
    margin-right: 8px;
    font-size: 20px;
    text-align: center;
    color: ${({ theme }) => theme.orange};
  }

  .week {
    margin: 8px 0px 0px 8px;
    font-size: 15px;
    color: ${({ theme }) => theme.deepGrey};
  }

  ${({ theme }) => theme.sm`
  margin: 0 0.5rem;
  `}
`;

export default memo(CustomCalendar);
