import { ModalLayout } from 'library/components/modal';
import CreateOrModifyMyGroup from 'components/myGroup/createAndModifyMyGroup/CreateOrModifyMyGroup';

type Props = {
  setModifyMyGroup: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModifyMyGroup({ setModifyMyGroup }: Props): JSX.Element {
  return (
    <ModalLayout
      width="42.1875rem"
      height="29.375rem"
      style={{ minHeight: '430px', minWidth: '260px' }}
      closeModal={() => setModifyMyGroup(false)}
    >
      <CreateOrModifyMyGroup
        title="내 기수 페이지 수정"
        informationText="기수 페이지 수정 안내"
        btnText="수정"
        closeModal={() => setModifyMyGroup(false)}
        celebratingMessage="수정이 완료되었습니다!"
      />
    </ModalLayout>
  );
}

export default ModifyMyGroup;
