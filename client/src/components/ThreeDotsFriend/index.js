import * as React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useMutation } from "@apollo/client";
import { REMOVE_FRIEND } from "../../utils/mutations";

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [renderState, setRenderState] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [removeFriend, { loading, data }] = useMutation(REMOVE_FRIEND);

  const handleRemove = () => {
    setAnchorEl(null);
    setRenderState("a");
    console.log(renderState, "renderState");
    try {
      const { data } = removeFriend({
        variables: { friendId: props._id },
      });
      if (!data) {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  }

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
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem op={handleClose} onClick={handleRemove}>Unfriend</MenuItem>
      </Menu>
    </div>
  );
}
