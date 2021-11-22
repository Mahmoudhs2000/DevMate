import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  height: 80px;
  box-shadow: 0 0px 18px 1px rgb(0 0 0 / 35%);
  margin-bottom: 20px;
`;
const Logo = styled.div`
  margin: 0 30px;

  img {
    height: 100%;
    transform: scale(1.5);
  }
`;
const NavItems = styled.div`
  display: flex;
  align-items: center;
`;
const LinkLabel = styled.div`
  padding: 0 27px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  cursor: pointer;
  :hover {
    ul {
      top: 0;
      opacity: 1;
      display: flex;
    }
  }
`;
const Dropdown = styled.ul`
  list-style: none;
  background: #f8f6f6;
  position: absolute;
  padding: 0;
  display: none;
  flex-direction: column;
  align-items: center;
  margin-top: 29px;
  width: 100%;
  border: 1px solid #0000004f;
  border-radius: 6px;
  z-index: 999;
  box-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.2);
  top: -9px;
  opacity: 0;
  transition: all 0.4s ease;
`;
const DropItem = styled.li`
  width: 100%;
  padding: 10px 15px;
  text-align: center;
`;
const ProfileItem = styled.div`
  color: white;
  background: #748df2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  display: grid;
  place-items: center;

  ul {
    margin: 50px 62px 0 0;
    color: black;
    font-size: 1rem;
    background: white;
  }
  ul > li {
    margin: 6px 0;
  }
  span {
    background: #e44242;
    padding: 9px 10px;
    color: white;
    border-radius: 20px;
  }
`;

export { Nav, Logo, NavItems, LinkLabel, Dropdown, DropItem, ProfileItem };
