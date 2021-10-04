import styled from '@emotion/styled';
import { AddPostInputValue } from 'components/myGroup/myGroup.model';
import { memo, useEffect } from 'react';
import { InputBox } from 'library/components/input/inputStyle';
import { Post } from 'library/models';
import { isValidDate } from 'library/utils';
import isEmpty from 'lodash-es/isEmpty';
import { ChangeEvent, useState } from 'react';
import { flexCenter } from 'styles/theme';

type Props = {
  name?: string;
  handleSubmit: (_: AddPostInputValue) => void;
  post?: Post;
};

function PostEditor({ name = '', handleSubmit, post }: Props): JSX.Element {
  const [values, setValues] = useState<AddPostInputValue>({ title: '', link: '', date: '' });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isDateValid, setIsDateValid] = useState<boolean>(true);

  useEffect(() => {
    if (post) {
      const formValue = {
        title: post.title,
        link: post.link,
        date: post.date,
      };

      setValues(formValue);
      validate(formValue);
    }
  }, [post]);

  const onChangeInputValues = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    const newValues = { ...values, [name]: value };

    setValues(newValues);
    validate(newValues);
  };

  const onClickSubmit = (): void => {
    if (!isValid) {
      return;
    }

    handleSubmit(values);
  };

  const validate = ({ date, title, link }: AddPostInputValue): void => {
    if (isEmpty(date) || isEmpty(title) || isEmpty(link)) {
      setIsValid(false);

      return;
    }

    setIsValid(isValidDate(date));
    setIsDateValid(isValidDate(date));
  };

  return (
    <>
      <Title>
        <img className="logoImage" alt="logo" src="/images/logo.png" />
        <div className="titleTextWrap">
          <span className="logoText">{'>'}wechicken</span>
          {!post && <span className="titleText">새로운 포스트를 추가해주세요</span>}
        </div>
      </Title>
      <Contents>
        <Description>
          <h1>{post ? post.user_name : name}님을 응원합니다</h1>
          <p>
            일부 사이트를 제외하고는 <br></br>
            직접 포스팅을 등록해 주셔야 합니다 <br></br>
          </p>

          <p>
            빠른 시일 안에 <br></br>
            모든 블로그 자동 업데이트 서비스를 <br></br>
            지원할 수 있도록 하겠습니다.
          </p>

          <p>
            매 주, 하나 둘씩 블로그를 작성하다보면<br></br>
            어느새 훌쩍 성장한 자신의 모습을<br></br>
            발견할 수 있을거예요.
          </p>

          <p>
            (•ө•)♡ 화이팅! <br></br>
          </p>
        </Description>
        <InputFormWrap>
          <InputBox width="12rem" size="1rem">
            <div className="nameBox">
              <div className="type">포스팅 제목</div>
              <input
                type="text"
                onChange={onChangeInputValues}
                placeholder="예시)2차 프로젝트 회고록"
                value={values.title}
                name="title"
              />
            </div>
          </InputBox>
          <InputBox width="12rem" size="1rem">
            <div className="nameBox">
              <div className="type">포스팅 링크</div>
              <input
                type="text"
                onChange={onChangeInputValues}
                placeholder="링크를 복사, 붙여넣어주세요"
                name="link"
                value={values.link}
              />
            </div>
          </InputBox>
          <InputBox width="12rem" size="1rem">
            <div className="nameBox">
              <div className="type">작성날짜</div>
              <input
                type="text"
                onChange={onChangeInputValues}
                placeholder="예시)2020.09.20"
                name="date"
                value={values.date}
              />
            </div>
            {!isDateValid && <Validation>날짜 형식을 확인해주세요.</Validation>}
          </InputBox>
        </InputFormWrap>
      </Contents>
      <Submit onClick={onClickSubmit} isValid={isValid}>
        <div className="SubmitBtn">{post ? '수정 완료' : '추가'}</div>
      </Submit>
    </>
  );
}

export default memo(PostEditor);

const Title = styled.div`
  display: flex;
  align-items: center;

  .logoImage {
    width: 60px;
    height: 60px;
    margin: 30px;
  }

  .titleTextWrap {
    display: flex;
    flex-direction: column;

    .logoText {
      font-size: 16px;
      font-family: ${({ theme }) => theme.fontTitle};
    }

    .titleText {
      margin-top: 7px;
      font-size: 16px;
      font-weight: 600;
      font-family: ${({ theme }) => theme.fontContent};
      color: ${({ theme }) => theme.orange};
    }
  }
`;

const Description = styled.div`
  width: 230px;
  font-family: ${({ theme }) => theme.fontContent};
  color: ${({ theme }) => theme.deepGrey};

  h1 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 15px;
    color: ${({ theme }) => theme.fontColor};
  }

  p {
    margin-bottom: 15px;
    line-height: 18px;
    font-size: 12px;
  }

  ${({ theme }) => theme.md`
    display: none;
  `}
`;

const Contents = styled.div`
  margin: 10px 95px;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.sm`
    margin: 2.5rem auto;
    width: fit-content;
  `}
`;

const InputFormWrap = styled.form`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  span {
    margin-left: 12px;
    color: ${({ theme }) => theme.fontColor};
  }
`;

const Validation = styled.div`
  position: absolute;
  top: 3rem;
  left: 0.7rem;
  padding: 1px 0px 0px 2px;
  font-size: 8px;
  color: red;
`;

const Submit = styled.div<{ isValid: boolean }>`
  width: 80px;
  margin-left: auto;
  margin-right: 20px;

  .SubmitBtn {
    ${flexCenter}
    height: 32px;
    border-radius: 1rem;
    cursor: ${({ isValid }) => (isValid ? 'pointer' : 'not-allowed')};
    color: ${({ isValid, theme }) => (isValid ? theme.white : '#767676')};
    background-color: ${({ isValid, theme }) => (isValid ? theme.orange : '#eee')};
  }
`;
