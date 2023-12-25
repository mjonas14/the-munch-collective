import React, { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND_TO_POTLUCK } from "../../../../utils/mutations";

// components
import UserDisplay from "../../../../components/UserDisplay";

export default function PotluckMembers({ me, members }) {
  const { potluckId } = useParams();
  const [memberList, setMemberList] = useState(members);
  const [addFriendToPotluck] = useMutation(ADD_FRIEND_TO_POTLUCK);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleMenuClick = async (user) => {
    try {
      const data = await addFriendToPotluck({
        variables: {
          potluckId: potluckId,
          friendId: user._id,
        },
      });
      console.log(data, "data");
      if (!data.data.addFriendToPotluck.success) {
        alert(data.data.addFriendToPotluck.message);
        throw new Error("Something went wrong!");
      }
      if (!data) {
        throw new Error("Something went wrong!");
      }
      setMemberList([...memberList, user]);
    } catch (err) {
      console.error(err);
    }
    handleClose();
  };

  return (
    <Box className="list-box-users" sx={{ marginLeft: "0px" }}>
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
          {me.friends.map((friend, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuClick(friend)}
              disabled={
                members.some((user) => user._id === friend._id) ? true : false
              }
            >
              {friend.username}
            </MenuItem>
          ))}
        </Menu>
      </Container>
      <TableContainer sx={{ maxHeight: 395, marginBottom: "10px" }}>
        {memberList.map((member, index) => (
          <>
            {me._id === member._id ? (
              <UserDisplay isDisabled={true} key={index} userId={member._id} />
            ) : (
              <UserDisplay key={index} userId={member._id} />
            )}
          </>
        ))}
      </TableContainer>
    </Box>
  );
}
