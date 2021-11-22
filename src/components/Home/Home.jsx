import React from "react";
import CreateJoinPage from "../CreateJoinMain/CreateJoinPage";
import MyTeam from "./../MyTeam/MyTeam";

const Home = ({ User }) => {
  return (
    <React.Fragment>
      <div>{User.team.inTeam ? <MyTeam /> : <CreateJoinPage />}</div>
    </React.Fragment>
  );
};

export default Home;
