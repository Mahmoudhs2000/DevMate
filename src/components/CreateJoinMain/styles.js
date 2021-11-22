import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #000000d6;
    margin: 10px 0;
  }
  span {
    color: #ff6648;
    font-weight: 500;
  }
`;
const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  > div {
    width: 360px;
    cursor: pointer;
    :hover {
      transform: scale(1.02);
    }
  }
`;

export { MainContainer, CardsContainer };
