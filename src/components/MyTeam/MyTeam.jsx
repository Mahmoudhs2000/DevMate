import React, { useContext } from "react";
import { UserContext } from "./../../App";
import { TeamGrid } from "./style";
import Tasks from './Tasks/Tasks';

const MyTeam = () => {
  const theUser = useContext(UserContext);
  // console.log(theUser);
  return <TeamGrid>
    <Tasks teamId={theUser.team.teamId} role={theUser.team.role} />
  </TeamGrid>;
};

export default MyTeam;
