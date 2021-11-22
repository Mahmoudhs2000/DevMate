import React from "react";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Container, Welcome, Text, ImageContainer } from "./styles";
import { Typography } from "@material-ui/core";
const LoginSignUp = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  return (
    <Container>
      <Welcome>
        <Text>
          <Typography variant="h2">Login / Signup</Typography>
          <Typography variant="h4">
            Start Learning <br />
            And Building Projects <br /> <span>In Teams</span>
          </Typography>
        </Text>
        <ImageContainer>
          <img src="/assets/loginsignup.png" alt="login/signup" />
        </ImageContainer>
      </Welcome>
      <div>
        {haveAccount ? (
          <Login setHaveAccount={setHaveAccount} />
        ) : (
          <SignUp setHaveAccount={setHaveAccount} />
        )}
      </div>
    </Container>
  );
};

export default LoginSignUp;
