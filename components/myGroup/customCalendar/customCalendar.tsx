import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Dispatch, memo, SetStateAction, useState } from 'react';
import { flexCenter } from 'styles/theme';
import Calendar from 'react-calendar';
import { useQueryClient } from 'react-query';
import { Bydays, GroupByDate, UserPostsCounting } from '../myGroup.model';
import { apiClient } from 'library/api/apiClient';
import { API_URL } from 'library/constants';
import { tempUser } from 'library/api/tempUser';
import 'react-calendar/dist/Calendar.css';

type Props = {
  setByDays: Dispatch<SetStateAction<Bydays>>;
  setUserPostsCounting: Dispatch<SetStateAction<UserPostsCounting>>;
};

function CustomCalendar({ setByDays, setUserPostsCounting }: Props) {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
  const client = useQueryClient();

  const fetchPostsByDay = async (date: dayjs.Dayjs): Promise<void> => {
    const formattedDate = date.format('YYYYMMDD');

    try {
      const { data } = await client.fetchQuery(
        'Get Posts by Date',
        () => {
          return apiClient.get<GroupByDate>(`${API_URL}/mygroup/calendar/:${formattedDate}`, {
            headers: {
              Authorization: tempUser.token,
            },
          });
        },
        { staleTime: 1000 },
      );

      setByDays(data.by_days);
      setUserPostsCounting(data.userPostsCounting);
    } catch (error) {
      console.error(error);
    }
  };

  const selectDate = (selected: Date): void => {
    const selectedDate = dayjs(selected);

    setDate(selectedDate);
    fetchPostsByDay(selectedDate);
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
        {isCalendarVisible && <Calendar onClickDay={selectDate}></Calendar>}
      </CalendarContainer>
    </>
  );
}

const CalendarContainer = styled.div`
  z-index: 20;
  position: absolute;
  top: 60px;
  right: -12px;

  @keyframes showBox {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 375px) {
    top: 95px;
    right: 25px;
  }

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

  @media (max-width: 375px) {
    margin: 0 10px;
  }
`;

export default memo(CustomCalendar);
