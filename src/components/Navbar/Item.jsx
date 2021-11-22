import React from "react";
import { LinkLabel, Dropdown, DropItem, ProfileItem } from "./styles.js";
import { KeyboardArrowDownRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { signOut } from "firebase/auth";
import auth from "../../Config/FbConfig.js";
const Item = ({ link }) => {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.setItem("token", "");
      window.location.href = "/";
    });
  };
  return (
    <LinkLabel>
      {!link.isProfilePic && (
        <React.Fragment>
          <Typography variant="h6">{link.label}</Typography>
          <KeyboardArrowDownRounded />
        </React.Fragment>
      )}
      {link.isDropdown && (
        <Dropdown>
          {link.droplinks.map(({ label, link }, id) => (
            <DropItem key={id}>
              <Link to={link}>{label}</Link>
            </DropItem>
          ))}
        </Dropdown>
      )}
      {link.isProfilePic && (
        <ProfileItem>
          {link.username[0]}
          <Dropdown>
            <DropItem>
              <Link to={'/Profile'}>View profile</Link>
            </DropItem>
            <DropItem>
              <span onClick={handleSignOut}>Logout</span>
            </DropItem>
          </Dropdown>
        </ProfileItem>
      )}
    </LinkLabel>
  );
};

export default Item;
