import React, { useState, useContext } from "react";
import { Typography, Divider, TextField, Button } from "@material-ui/core";
import { CameraAltOutlined } from "@material-ui/icons";
import { Container, Form, ImageUpload } from "./styles";
import { UserContext } from "./../../App";
import CreateUpdateTeam from "../../utils/CreateUpdateTeam";
import UploadPicture from "../../utils/UploadPicture";
import CreateUpdateUser from "../../utils/CreateUpdateUser";
import SaveTasks from "../../utils/SaveTasks";

const TeamForm = () => {
  const userId = localStorage.getItem("loggedUserId");
  const [File, setFile] = useState({});
  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
  });
  const currentUser = useContext(UserContext);
  const ChooseFile = () => {
    const uploader = document.getElementById("upload");
    uploader.click();
  };
  const pickFile = ({ target }) => {
    const src = window.URL.createObjectURL(target.files[0]);
    setFile(target.files[0]);
    const preview = document.getElementById("imgPreview");
    preview.src = src;
    preview.style.display = "block";
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setTeamData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    await CreateUpdateTeam(
      {
        ...teamData,
        leader: { id: userId, name: currentUser.username },
        members: [{ id: userId, name: currentUser.username }],
        stack: currentUser.stack,
      },
      userId
    );
    await SaveTasks(userId, userId,{
     'Todo': [],
     'Done': [],
     'Archived': [],
     'Ideas': []
    });
    await CreateUpdateUser(userId, {
      ...currentUser,
      team: {
        inTeam: true,
        teamId: userId,
        teamName: teamData.name,
        role: "admin",
      },
    });
    if(File){
     const res = await UploadPicture(teamData.name,File);
     if(res){
     }
    }
  };
  return (
    <Container>
      <Typography variant="h4">
        Create A Team
        <br />
      </Typography>
      <Divider variant="fullWidth" />
      <Form>
        <ImageUpload onClick={ChooseFile}>
          <CameraAltOutlined />
          <img
            id="imgPreview"
            src=""
            alt="upload"
            style={{ display: "none" }}
          />
          <input
            id="upload"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => pickFile(e)}
          />
        </ImageUpload>
        <TextField
          label="Name"
          name="name"
          value={teamData.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={3}
          value={teamData.description}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <div>
          <span style={{ fontWeight: "bolder", textDecoration: "underline" }}>
            Group Tech Stack:
          </span>
          &nbsp;&nbsp;
          <span>
            {currentUser?.stack.map((tech, id) => (
              <span key={id}>{tech} , </span>
            ))}
          </span>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleCreate(e);
          }}
        >
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default TeamForm;
