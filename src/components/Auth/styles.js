import styled from "styled-components";

// Login SignUp Main Page
const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
`;
const Welcome = styled.div`
  border-right: 2px solid rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Text = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2,
  h4 {
    margin: 20px 40px;
  }
  span {
    color: #ff6648;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 80%;
  }
`;

// Login Page
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;

  form {
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 50px 0;
  }
  form > div {
    margin: 2px 0;
  }
  a {
    cursor: pointer;
    text-decoration: none;
  }
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

export { Container, Welcome, Text, ImageContainer, LoginContainer, Logo };
