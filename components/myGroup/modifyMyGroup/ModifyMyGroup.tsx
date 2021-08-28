import styled from '@emotion/styled';
import { ModalLayout } from 'library/components/modal';
import { useEffect } from 'react';

type Props = {
  getMyGroupTitle: string;
  setModifyMyGroup: React.Dispatch<React.SetStateAction<boolean>>;
};


// TODO 작성중
function ModifyMyGroup({ getMyGroupTitle, setModifyMyGroup }: Props): JSX.Element {
  useEffect(() => {
    setModifyMyGroup(prev => !prev);
  }, []);

  return (
    <ModalLayout width="42.1875rem" height="29.375rem">
      <ModifyMyGroupBox>{getMyGroupTitle}</ModifyMyGroupBox>
    </ModalLayout>
  );
}

export default ModifyMyGroup;

const ModifyMyGroupBox = styled.div``;
