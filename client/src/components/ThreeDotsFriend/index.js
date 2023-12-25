import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useMutation } from "@apollo/client";
import { REMOVE_FRIEND } from "../../utils/mutations";

export default function LongMenu({ friendId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRemove = async () => {
    setAnchorEl(null);
    try {
      const { data } = await removeFriend({
        variables: { friendId: friendId },
      });
      if (!data) {
        throw new Error("Something went wrong!");
      }
      console.log(data, "data");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleRemove}>
          Unfriend
        </MenuItem>
      </Menu>
    </div>
  );
}
