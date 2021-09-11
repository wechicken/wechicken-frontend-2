import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Obj } from 'library/models';

type Props = {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  closeModal?: () => void;
  style?: Obj;
  closeOnClickDimmer?: boolean;
};

function ModalLayout({
  children,
  closeModal,
  style,
  width,
  height,
  padding,
  closeOnClickDimmer = false,
}: Props): JSX.Element {
  const handleClickDimmer = ({ target, currentTarget }: React.MouseEvent<HTMLDivElement>): void => {
    if (target !== currentTarget) {
      return;
    }

    closeOnClickDimmer && closeModal && closeModal();
  };

  return (
    <Dimmer onClick={handleClickDimmer}>
      <ModalBox width={width} height={height} padding={padding} style={style}>
        {closeModal && <FontAwesomeIcon onClick={closeModal} className="BtnClose" icon={faTimes} />}
        {children}
      </ModalBox>
    </Dimmer>
  );
}

export default ModalLayout;

const Dimmer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalBox = styled.div<{ width?: string; height?: string; padding: string | undefined }>`
  position: relative;
  ${({ width }) => `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  padding: ${({ padding }) => (padding ? padding : '10px')};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: -14px -14px 20px rgba(0, 0, 0, 0.02), 14px 14px 20px rgba(0, 0, 0, 0.05);
  z-index: 11;
  box-sizing: border-box;

  ${({ theme }) => theme.md`
    max-width: 80%;  
  `}

  .BtnClose {
    position: absolute;
    top: 0;
    right: 0;
    width: 21px;
    height: 21px;
    margin: 5%;
    color: ${({ theme }) => theme.deepGrey};
    cursor: pointer;
  }
`;
