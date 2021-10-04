import styled from '@emotion/styled';

type Props = {
  celebratingMessage: string;
};

function CelebratingModal({ celebratingMessage }: Props): JSX.Element {
  return (
    <CelebratingModalBox>
      <CelebratingImg>
        <div className="firework" />
        <div className="beer" />
        <div className="firework" />
      </CelebratingImg>
      <CelebratingText>
        <span>{celebratingMessage}</span>
      </CelebratingText>
    </CelebratingModalBox>
  );
}

export default CelebratingModal;

const CelebratingModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.white};
`;

const CelebratingImg = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 3.75rem;

  .firework {
    width: 100px;
    height: 100px;
    margin-top: 1.875rem;
    background: url('/images/firework.png');
    background-size: contain;
    background-repeat: no-repeat;
    animation: blink-animation 0.4s steps(4, start) infinite;
  }

  @keyframes blink-animation {
    from {
      visibility: visibility;
    }
    to {
      visibility: hidden;
    }
  }

  .beer {
    width: 130px;
    height: 130px;
    background: url('/images/beer.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const CelebratingText = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 1.6875rem;
  color: ${({ theme }) => theme.orange};
`;
