import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import InputTheme from 'library/components/input/InputTheme';
import BtnSubmit from 'library/components/button/BtnSubmit';
import { modifyPost } from 'library/api/myprofile';
import { currentUser } from 'library/store/saveUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'library/models/main';
import { theme } from 'styles/theme';

type MyPostEditModalProps = {
  post: Post;
  setAddModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MyPostEditModal({
  post,
  setAddModalActive,
}: MyPostEditModalProps): JSX.Element {
  const user = useSelector(currentUser);

  const [blogTitle, setBlogTitle] = useState<string>(post.title);
  const [blogUrl, setBlogUrl] = useState<string>(post.link);
  const [isSubmitActivate, setIsSubmitActivate] = useState<boolean>(false);
  const [blogDate, setBlogDate] = useState(post.date);
  const [isDateFormatCorrect, setDateFormatCorrect] = useState<boolean | undefined>(undefined);

  const modifyMyPost = useMutation(
    (params: { postId: number; title: string; link: string; date: string }) => modifyPost(params),
  );

  useEffect(() => {
    blogTitle && blogUrl && isDateFormatCorrect
      ? setIsSubmitActivate(true)
      : setIsSubmitActivate(false);
  }, [blogTitle, blogUrl, isDateFormatCorrect]);

  useEffect(() => {
    if (blogDate.length === 10 && blogDate.split('.').length === 3) {
      if (blogDate.replace(/\./g, '') <= dayjs().format('YYYYMMDD')) {
        setDateFormatCorrect(true);
      }
    } else {
      setDateFormatCorrect(false);
    }
  }, [blogDate]);

  const handleModifyMyPost = async () => {
    await modifyMyPost.mutateAsync([post.id, blogTitle, blogUrl, blogDate, user.token]);
    setAddModalActive(false);
  };

  return (
    <Container>
      <Title>
        <img className="logoImage" alt="logo" src="/Images/logo.png" />
        <div className="titleTextWrap">
          <span className="logoText">{'>'}wechicken</span>
          <span className="titleText">{}</span>
        </div>
      </Title>
      <FontAwesomeIcon
        onClick={() => setAddModalActive(false)}
        className="BtnClose"
        icon={faTimes}
      />
      <Contents>
        <Description>
          <h1>{post.user_name}님을 응원합니다</h1>
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
          <span>{user.nth}기</span>
          <InputTheme
            width="10.625rem"
            value={blogTitle}
            type={'블로그 제목'}
            handleType={setBlogTitle}
            size="14px"
          />
          <InputTheme
            width="10.625rem"
            value={blogUrl}
            type={'포스트 링크'}
            handleType={setBlogUrl}
            size="14px"
          />
          <InputTheme
            width="10.625rem"
            value={blogDate}
            type={'작성 날짜'}
            handleType={setBlogDate}
            size="14px"
            validationCheck={isDateFormatCorrect}
          />
        </InputFormWrap>
      </Contents>
      <BtnSubmit
        btnText={'수정 완료'}
        executeFunction={handleModifyMyPost}
        isSubmitActivate={isSubmitActivate}
      ></BtnSubmit>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 675px;
  height: 470px;
  background-color: ${theme.white};
  transform: translate(-50%, -50%);
  box-shadow: -14px -14px 20px rgba(0, 0, 0, 0.02), 14px 14px 20px rgba(0, 0, 0, 0.05);
  z-index: 11;

  .BtnClose {
    position: absolute;
    right: 0;
    width: 21px;
    height: 21px;
    margin: 15px;
    color: #828282;
    cursor: pointer;
  }
`;

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
      font-family: ${theme.fontTitle};
    }

    .titleText {
      margin-top: 7px;
      font-size: 16px;
      font-weight: 600;
      font-family: ${theme.fontContent};
      color: ${theme.orange};
    }
  }
`;

const Description = styled.div`
  width: 230px;
  font-family: ${theme.fontContent};
  color: ${theme.deepGrey};

  h1 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 15px;
    color: ${theme.fontColor};
  }

  p {
    margin-bottom: 15px;
    line-height: 18px;
    font-size: 12px;
  }
`;

const Contents = styled.div`
  margin: 10px 95px;
  display: flex;
  justify-content: space-between;
`;

const InputFormWrap = styled.form`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  span {
    margin-left: 12px;
    color: ${theme.fontColor};
  }
`;
