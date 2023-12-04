import React from "react";
import { Box, Container } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import UserDisplay from "../../../components/UserDisplay";
import LongMenu from "../../../components/ThreeDotsFriend";

const CurrentFriends = ({ me }) => {
  const friendList = me.friends || [];

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
