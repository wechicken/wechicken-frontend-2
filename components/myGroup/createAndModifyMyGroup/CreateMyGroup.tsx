import { ModalLayout } from 'library/components/modal';
import CreateOrModifyMyGroup from './CreateOrModifyMyGroup';

type Props = {
  setCreateMyGroupModalOn: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateMyGroup({ setCreateMyGroupModalOn }: Props): JSX.Element {
  return (
    <ModalLayout
      width="42.1875rem"
      height="29.375rem"
      style={{ minHeight: '430px', minWidth: '260px' }}
      closeModal={() => setCreateMyGroupModalOn(false)}
    >
      <CreateOrModifyMyGroup
        title="내 기수 페이지 생성"
        informationText="치킨계 기수 가입 안내"
        myGroupTitleText="예시)10고 뜯고 10기 치킨계"
        btnText="생성"
        closeModal={() => setCreateMyGroupModalOn(false)}
        celebratingMessage="치킨계 기수 가입을 축하합니다!"
      />
    </ModalLayout>
  );
}

export default CreateMyGroup;
