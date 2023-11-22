import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@apollo/client";
import { QUERY_GETME, QUERY_GET_USER_BY_ID } from "../../../utils/queries";

import UserDisplay from "../../../components/UserDisplay";
import LongMenu from "../../../components/ThreeDotsFriend";

const CurrentFriends = ({ me }) => {

  let friendList = me.friends || [];

  return (
    <>
      {friendList.length > 0 ? (
        <Box className="list-box-users">
          <header className="box-header">Friends ({friendList.length})</header>
          <TableContainer sx={{ maxHeight: 395, marginBottom: "10px" }}>
            {friendList.map((friend, index) => (
              <div>
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <UserDisplay key={friend} userId={friend._id} />
                  <LongMenu key={index} friendId={friend} />
                </Container>
              </div>
            ))}
          </TableContainer>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default CurrentFriends;
