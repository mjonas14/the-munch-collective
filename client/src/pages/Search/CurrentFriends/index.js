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
import { QUERY_GETME } from "../../../utils/queries";

import UserDisplay from "../../../components/UserDisplay";
import LongMenu from "../../../components/ThreeDotsFriend";

const CurrentFriends = () => {
  const [renderState, setRenderState] = useState("");
  const [numberOfFriends, setNumberOfFriends] = useState(0);

  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];

  if (loading) {
    return (
      <Container
        sx={{
          backgroundColor: "#EBECF0",
          borderRadius: "16px",
          margin: "20px 10px 20px 20px",
          display: "flex",
          justifyContent: "space-between",
          width: "75%",
          padding: "0px",
        }}
      ></Container>
    );
  }

  return (
    <>
      {userData.friends && userData.friends.length > 0 ? (
        <Box className="list-box-users">
          <header className="box-header">
            Friends ({userData.friends.length})
          </header>
          <TableContainer sx={{ maxHeight: 395, marginBottom: "10px" }}>
            {userData.friends.map((friend, index) => (
              <div>
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <UserDisplay key={index} userId={friend._id} />
                  <LongMenu key={index + 1000} friendId={friend} />
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
