import { Typography, Card, CardContent, CardMedia } from "@material-ui/core";
import React from "react";
import { MainContainer, CardsContainer } from "./styles";
import { Link } from "react-router-dom";
const CreateJoinPage = () => {
  const handleNavigate = () => {};
  return (
    <MainContainer>
      <Typography variant="h3">
        Welcome in <span>DevMate</span>
      </Typography>
      <Typography variant="h5" align="center">
        Get Better In Technologies You Learn By Practice In Teams <br />
        Join a Team or Create Your Own To Start <br />
        Developing Ideas and Projects
      </Typography>
      <CardsContainer>
        <Card onClick={handleNavigate}>
          <Link to="/Teams/Create">
            <CardMedia component="img" image="/assets/create-team.png" />
            <CardContent>
              <Typography
                variant="h5"
                align="center"
                style={{ fontWeight: "bold" }}
              >
                Create
              </Typography>
              <Typography variant="body1">
                Create Your Team, Create Your Idea And Browse A List Of
                Developers With Techologies in Common To Invite Them.
              </Typography>
            </CardContent>
          </Link>
        </Card>
        <Card onClick={handleNavigate}>
          <Link to="/Teams/Join">
            <CardMedia component="img" image="/assets/join-team.png" />
            <CardContent>
              <Typography
                variant="h5"
                align="center"
                style={{ fontWeight: "bold" }}
              >
                Join
              </Typography>
              <Typography variant="body1">
                Browse A List Of Teams Working With Technologies You Know. And
                Request To Join One To Start Practice
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </CardsContainer>
    </MainContainer>
  );
};

export default CreateJoinPage;
