import styled from "styled-components";

const TasksContainer = styled.div`
    display: flex;
    gap: 47px;
    margin: 0 20px;

    h6{
        user-select: none;
    }
`;
const Delete = styled.span`
  position: absolute;
  right: 12px;
  
  *{
      color: #f04848;
  }
  svg{
      opacity: 0;
  }
`;
const Column = styled.div`
  width:20%;

  &:hover svg{
          opacity: 1 !important;
  }
`;
const Button = styled.div`
    display: flex;
    align-items: center;
    margin-right:10px;
    cursor: pointer;
    border-bottom: 1px solid #454bf2;
    `;
    const Header = styled.div`
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 30px;
`;

export {TasksContainer,Header,Button,Column, Delete};