import React, { useState } from "react";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../../../utils/mutations";
import { QUERY_GET_FRIEND_REQUEST } from "../../../utils/queries";

const AddBtn = (props) => {
  const [friendStatus, setFriendStatus] = useState("Add Friend");
  const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(QUERY_GET_FRIEND_REQUEST, {
    variables: { toUserId: props.userData._id },
  });
  const requestData = data?.getFriendRequest || [];

  if (loading) {
    return <></>;
  }

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addFriend({
        variables: {
          userId: props.userData._id,
        },
      });

      if (!data) {
        throw new Error("Something went wrong!");
      }
      setFriendStatus("requested");
    } catch (err) {
      console.log(err);
    }
  };

  if (requestData.length === 0) {
    return (
      <Button
        className={"add-button"}
        sx={{
          color: "blue",
        }}
        onClick={(event) => handleClick(event)}
      >
        {friendStatus}
      </Button>
    );
  } else if (requestData.status === "pending" || friendStatus === "requested") {
    return (
      <Button
        disabled
        className={"add-button"}
        sx={{
          color: "red",
        }}
      >
        REQUESTED
      </Button>
    );
  }
};

export default AddBtn;
