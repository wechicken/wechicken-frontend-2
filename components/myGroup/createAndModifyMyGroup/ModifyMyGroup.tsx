import { ModalLayout } from 'library/components/modal';
import CreateOrModifyMyGroup from 'components/myGroup/createAndModifyMyGroup/CreateOrModifyMyGroup';

type Props = {
  getMyGroupTitle: string;
  setModifyMyGroup: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModifyMyGroup({ getMyGroupTitle, setModifyMyGroup }: Props): JSX.Element {
  return (
    <ModalLayout width="42.1875rem" height="29.375rem" closeModal={() => setModifyMyGroup(false)}>
      <CreateOrModifyMyGroup
        title="내 기수 페이지 수정"
        informationText="기수 페이지 수정 안내"
        btnText="수정"
        myGroupTitleText={getMyGroupTitle}
        closeModal={() => setModifyMyGroup(false)}
        celebratingMessage="수정이 완료되었습니다!"
      />
    </ModalLayout>
  );
}

export default ModifyMyGroup;
