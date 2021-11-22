import React, { useEffect, useState, createContext } from "react";
import Login from "./components/Auth/index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Teams from "./components/Teams/Teams";
import Navbar from "./components/Navbar/Navbar";
import GetUser from "./utils/GetUser";
import Loading from "./components/Loading/Loading";
import TeamForm from "./components/CreateTeamForm/TeamForm";
import TeamView from "./components/TeamView/TeamView";
import Profile from "./components/Profile/Profile";

export const UserContext = createContext();

const App = () => {
  const token = localStorage.getItem("token");
  const [User, setUser] = useState({});
  useEffect(() => {
    const userId = localStorage.getItem("loggedUserId");
    const request = async () => {
      const user = await GetUser(userId);
      setUser(user);
    };
    userId && request();
  }, []);
  return (
    <UserContext.Provider value={User}>
      <React.Fragment>
        {!token ? (
          <Login />
        ) : Object.keys(User).length > 0 ? (
          <BrowserRouter>
            <Navbar user={User} />
            <Switch>
              <Route exact path="/">
                <Home User={User} />
              </Route>
              <Route exact path="/Team">
                <TeamView User={User} />
              </Route>
              <Route exact path="/Teams/Join">
                <Teams />
              </Route>
              <Route exact path="/Teams/Create">
                <TeamForm />
              </Route>
              <Route exact path="/Profile">
                <Profile User={User} />
              </Route>
            </Switch>
          </BrowserRouter>
        ) : (
          <Loading />
        )}
      </React.Fragment>
    </UserContext.Provider>
  );
};

export default App;
