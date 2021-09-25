import React, { useRef } from 'react';
import debounce from 'lodash-es/debounce';
import * as S from 'library/components/input/inputStyle';
import { Obj } from 'library/models';

type Props = {
  width: string;
  type?: string;
  handleEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleType?: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  value?: string;
  placeholder?: string;
  name?: string;
  validationCheck?: boolean;
  search?: boolean;
  style?: Obj;
};

const InputTheme = ({
  width,
  type,
  value,
  handleType,
  handleEvent,
  placeholder,
  size,
  name,
  validationCheck,
  search,
  style,
}: Props): JSX.Element => {
  const delayChangeEvent = (e: React.ChangeEvent<HTMLInputElement>): void =>
    handleEvent && handleEvent(e);
  const delaySetStateValue = useRef(debounce(q => handleType && handleType(q), 500)).current;

  return (
    <S.InputBox width={width} size={size} search={search ?? false} style={style}>
      <div className="nameBox">
        <div className="type">{type}</div>
        <input
          style={style}
          type="text"
          defaultValue={value}
          onChange={e => (handleEvent ? delayChangeEvent(e) : delaySetStateValue(e.target.value))}
          placeholder={placeholder}
          name={name}
        />
        {validationCheck === false && <S.Validation>날짜형식을 확인 해 주세요.</S.Validation>}
      </div>
    </S.InputBox>
  );
};

export default React.memo(InputTheme);
