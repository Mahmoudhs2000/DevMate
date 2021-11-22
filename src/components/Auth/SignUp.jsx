import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Config/FbConfig";
import {
  Button,
  Link,
  TextField,
  Typography,
  OutlinedInput,
  Select,
  Chip,
  MenuItem,
  InputLabel,
  Box,
} from "@material-ui/core";
import { LoginContainer, Logo } from "./styles";
import CreateUpdateUser from "../../utils/CreateUpdateUser";
const SignUp = ({ setHaveAccount }) => {
  //#region State
  const [selected, setSelected] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const Techs = [
    "HTML",
    "Css",
    "Javascript",
    "React.js",
    "Angular",
    "Vue.js",
    "Svelte",
  ];
  //#endregion

  //#region Functions
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        const User = userCredential.user;
        await CreateUpdateUser(User.uid, {
          username: user.username,
          team: { inTeam: false, teamName: "", teamId: "", role: "" },
          stack: selected,
        });
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("loggedUserId", User.uid);
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("Error: ", errorCode);
      });
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    name === "tech" && setSelected(value);
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
    return false;
  };
  const switchToLogIn = () => {
    setHaveAccount(true);
  };
  //#endregion

  return (
    <LoginContainer>
      <Logo>
        <img src="/assets/logo.png" alt="logo" />
      </Logo>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          label="Username"
          name="username"
          type="text"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <TextField
          label="Email"
          name="email"
          type="email"
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
        <InputLabel id="demo-multiple-chip-label">Tech Stack</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          name="tech"
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {Techs.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained" color="primary">
          SignUp
        </Button>
      </form>
      <Typography variant="h6">Have an Account? </Typography>
      <Typography component={Link} variant="h6" onClick={switchToLogIn}>
        Login To Your Account!{" "}
      </Typography>
    </LoginContainer>
  );
};

export default SignUp;
