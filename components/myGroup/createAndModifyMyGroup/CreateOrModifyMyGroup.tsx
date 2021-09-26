import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import styled from '@emotion/styled';
import CelebratingModal from 'components/login/CelebratingModal';
import BtnSubmit from 'library/components/button/BtnSubmit';
import InputTheme from 'library/components/input/InputTheme';
import { currentUser, saveUser } from 'library/store/saveUser';
import { postCreateOrModifyGroup } from 'library/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { LoginUser } from 'library/models';

type Props = {
  title: string;
  informationText: string;
  btnText: string;
  closeModal: () => void;
  celebratingMessage: string;
  myGroupTitleText?: string;
};

function CreateOrModifyMyGroup({
  title,
  informationText,
  btnText,
  closeModal,
  celebratingMessage,
  myGroupTitleText,
}: Props): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ myGroupTitle: '', count: '', penalty: '' });
  const [isSubmitActivate, setSubmitActivate] = useState(false);
  const [isCelebratingModalOn, setCelebratingModalOn] = useState(false);

  const user = useSelector(currentUser);

  const { myGroupTitle, count, penalty } = form;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const setMyGroupPage = async (): Promise<void> => {
    setCelebratingModalOn(true);

    await postCreateOrModifyGroup(
      myGroupTitle,
      count.replace(/[^0-9]/g, ''),
      penalty.replace(/[^0-9]/g, ''),
    );

    setTimeout(closeModal, 2000);
    router.push('/mygroup');
    dispatch(saveUser({ ...user, myGroupStatus: true }));

    sessionStorage.setItem(
      'USER',
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem('USER') ?? '{}'),
        myGroupStatus: true,
        master: true,
      }),
    );
  };

  useEffect(() => {
    myGroupTitle && count && penalty ? setSubmitActivate(true) : setSubmitActivate(false);
  }, [myGroupTitle, count, penalty]);

  return (
    <>
      {isCelebratingModalOn ? (
        <CelebratingModal celebratingMessage={celebratingMessage} />
      ) : (
        <CreateOrModifyMyGroupBox>
          <Title>
            <img className="logoImage" alt="logo" src="/images/logo.png" />
            <div className="titleTextWrap">
              <span className="logoText">{'>'}wechicken</span>
              <span className="titleText">{title}</span>
            </div>
          </Title>
          <FontAwesomeIcon onClick={closeModal} className="BtnClose" icon={faTimes} />
          <CreateOrModifyMyGroupContents>
            <Description>
              <h1>{informationText}</h1>
              <p>
                wecode 그리고<br></br>
                wechicken에 오신 것을 환영합니다!
              </p>

              <p>
                wechicken은 보다 성실한 여러분들로<br></br>
                거듭날 수 있도록 도와줄 것입니다.
              </p>

              <p>
                페이지 생성 후 계장 권한을 가진 분은<br></br>
                블로그 업로드 횟수 및 기부금 수정이<br></br>
                가능합니다.
              </p>

              <p>
                수정시에는 동기들과 충분한 상의 후에<br></br>
                진행해주세요 (•ө•)♡ 화이팅!
              </p>
            </Description>
            <InputFormWrap>
              <span className="nth">{user?.nth}기</span>
              <InputTheme
                width="10.625rem"
                style={{ minWidth: '180px' }}
                type="기수 페이지명"
                name="myGroupTitle"
                handleEvent={handleChangeInput}
                placeholder={myGroupTitleText ?? (user as LoginUser).myGroupTitle}
                size="14px"
              />
              <InputTheme
                width="10.625rem"
                style={{ minWidth: '180px' }}
                type="주 블로그 업로드 횟수"
                name="count"
                handleEvent={handleChangeInput}
                placeholder="예시) 주 3회"
                size="14px"
              />
              <InputTheme
                width="10.625rem"
                style={{ minWidth: '180px' }}
                type="회당 기부금"
                name="penalty"
                handleEvent={handleChangeInput}
                placeholder="예시)3000원"
                size="14px"
              />
            </InputFormWrap>
          </CreateOrModifyMyGroupContents>
          <BtnSubmit
            btnText={btnText}
            executeFunction={setMyGroupPage}
            isSubmitActivate={isSubmitActivate}
          />
        </CreateOrModifyMyGroupBox>
      )}
    </>
  );
}

export default CreateOrModifyMyGroup;

const CreateOrModifyMyGroupBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  .logoImage {
    width: 60px;
    height: 60px;
    margin: 1.875rem;
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
  width: 14.375rem;
  font-family: ${({ theme }) => theme.fontContent};
  color: ${({ theme }) => theme.deepGrey};

  ${({ theme }) => theme.sm`
    width:100%;
  `}

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
`;

const CreateOrModifyMyGroupContents = styled.div`
  margin: 10px 5.9375rem;
  display: flex;
  justify-content: space-between;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  ${({theme})=> theme.md`
    margin: 0 25px;
  `}

  ${({ theme }) => theme.sm`
    flex-direction: column;
    margin: 15px;
  `}
`;

const InputFormWrap = styled.form`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  span.nth {
    font-size: 14px;
    margin-left: 12px;
    color: ${({ theme }) => theme.fontColor};

    ${({ theme }) => theme.md`
      margin-bottom: 12px;
    `}
  }
`;
