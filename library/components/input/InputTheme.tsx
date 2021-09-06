import React, { useRef } from 'react';
import debounce from 'lodash-es/debounce';
import * as S from 'library/components/input/inputStyle';

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
}: Props): JSX.Element => {
  const delaySetStateValue = useRef(debounce(e => handleEvent && handleEvent(e), 500)).current;
  const delayChangeEvent = useRef(debounce(q => handleType && handleType(q), 500)).current;

  return (
    <S.InputBox width={width} size={size} search={search ?? false}>
      <div className="nameBox">
        <div className="type">{type}</div>
        <input
          type="text"
          defaultValue={value}
          onChange={e => (handleEvent ? delaySetStateValue(e) : delayChangeEvent(e.target.value))}
          placeholder={placeholder}
          name={name}
        />
        {validationCheck === false && <S.Validation>날짜형식을 확인 해 주세요.</S.Validation>}
      </div>
    </S.InputBox>
  );
};

export default React.memo(InputTheme);
