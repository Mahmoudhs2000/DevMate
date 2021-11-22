import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Config/FbConfig";
import { Button, Link, TextField, Typography } from "@material-ui/core";
import { LoginContainer, Logo } from "./styles";
const Login = ({ setHaveAccount }) => {
  const [ErrorMsg, setErrorMsg] = useState('')
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log("user", user);
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("loggedUserId", user.uid);
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMsg(errorCode.split('/')[1])
        // console.log("Error: ", errorCode);
      });
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    return false;
  };
  const switchToSignUp = () => {
    setHaveAccount(false);
  };
  return (
    <LoginContainer>
      <Logo>
        <img src="/assets/logo.png" alt="logo" />
      </Logo>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        {ErrorMsg && <span style={{color: 'red'}} >{ErrorMsg}</span>}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Typography variant="h6">Dont have an Account? </Typography>
      <Typography component={Link} variant="h6" onClick={switchToSignUp}>
        Create One!{" "}
      </Typography>
    </LoginContainer>
  );
};

export default Login;
