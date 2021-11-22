import React from "react";
import { Nav, Logo, NavItems } from "./styles.js";
import Item from "./Item";

const Navbar = ({ user }) => {
  const links = [
    {
      label: "Team",
      isDropdown: true,
      droplinks: user.team.inTeam
        ? [ 
           { label: "Dashboard", link: "/" },
           { label: "View Team", link: "/Team" },
          ]
        : [
            { label: "Create Team", link: "/Teams/Create" },
            { label: "Join Team", link: "/Teams/Join" },
          ],
    },
    {
      isProfilePic: true,
      username: user.username,
    },
  ];
  return (
    <Nav>
      <Logo>
        <img src="/assets/logo.png" alt="log" />
      </Logo>
      <div style={{ flex: "1" }} />
      <NavItems>
        {links.map((link, id) => (
          <Item key={id} link={link} />
        ))}
      </NavItems>
    </Nav>
  );
};

export default Navbar;
