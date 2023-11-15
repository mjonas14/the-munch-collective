import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

import UserDisplay from "../../../../components/UserDisplay";

export default function PotluckMembers(props) {

  return (
    <Box className="list-box-users">
      <header className="box-header">Members</header>
      <TableContainer sx={{ maxHeight: 395, marginBottom: "10px" }}>
        {props.members.map((member) => (
          <UserDisplay userId={member._id} />
        ))}
      </TableContainer>
    </Box>
  );
}
