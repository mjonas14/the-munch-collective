import React from "react";
import { Grid, Box, Typography, Container, IconButton } from "@mui/material";

import Auth from "../../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POTLUCK } from "../../utils/mutations";
import { QUERY_GETMYPOTLUCKS } from "../../utils/queries";

import PotluckBar from "./components/PotluckBar";

export default function Potlucks() {
  //   const [createPotluck, { error1, data1 }] = useMutation(CREATE_POTLUCK);
  const { loading, data } = useQuery(QUERY_GETMYPOTLUCKS);

  const potlucks = data?.getMyPotlucks.potlucks || [];

  console.log(potlucks, "potlucks");

  return (
    <div>
      {potlucks.length == 0 ? (
        <Typography
          variant="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          You have no active Potlucks!
        </Typography>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{
              margin: "20px 0px 0px 20px",
            }}
          >
            Your Potlucks
          </Typography>
          <Grid>
            {potlucks.map((item) => (
            <PotluckBar title={item.title} img={item.img} id={item._id} />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}
