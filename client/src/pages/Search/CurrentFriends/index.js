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

const CurrentFriends = (props) => {
  const [renderState, setRenderState] = useState("");
  const [numberOfFriends, setNumberOfFriends] = useState(0);

  const { loading, data } = useQuery(QUERY_GETME);
  const { loading1, data1 } = useQuery(QUERY_GET_USER_BY_ID, {
    variables: { userId: props.friendAdded },
  });
  const userData = data?.getMe || [];
  let list = userData.friends;

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

  const user = data1?.getUserById || {};
  console.log(user);
  // if (user) list.push(user);

  return (
    <>
      {list && list.length > 0 ? (
        <Box className="list-box-users">
          <header className="box-header">Friends ({list.length})</header>
          <TableContainer sx={{ maxHeight: 395, marginBottom: "10px" }}>
            {list.map((friend, index) => (
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
