import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import Auth from "../../../../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GETME } from "../../../../utils/queries";
import { ADD_FRIEND_TO_POTLUCK } from "../../../../utils/mutations";

// components
import UserDisplay from "../../../../components/UserDisplay";

export default function PotluckMembers({ members }) {
  const { potluckId } = useParams();
  const { loading, data } = useQuery(QUERY_GETME);
  const me = data?.getMe || [];
  const [addFriendToPotluck] = useMutation(ADD_FRIEND_TO_POTLUCK);
  const [anchorEl, setAnchorEl] = useState(null);

  const tempList = ["One", "Two", "Three"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    console.log(event, "Closed!");
    setAnchorEl(null);
  };

  const handleMenuClick = (name) => {
    console.log(name, "name");
    console.log(potluckId, "Id");

    try {
      const { data } = addFriendToPotluck({
        variables: { 
          potluckId: potluckId,
          friendId: name._id,
        }
      })
    } catch (err) {
      console.error(err);
    }

    handleClose();
  };

  if (loading) {
    return <></>;
  }

  return (
    <Box className="list-box-users" sx={{marginLeft: "0px"}}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <header className="box-header-sc">Members</header>
        <IconButton onClick={handleClick}>
          <PersonAddAlt1Icon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch",
            },
          }}
        >
          {me.friends.map((friend) => (
            <MenuItem key={friend} onClick={() => handleMenuClick(friend)}>
              {friend.username}
            </MenuItem>
          ))}
        </Menu>
      </Container>
      <TableContainer sx={{ maxHeight: 395, marginBottom: "10px" }}>
        {members.map((member) => (
          <UserDisplay userId={member._id} />
        ))}
      </TableContainer>
    </Box>
  );
}
