import React from "react";
import { Grid, Box, Typography, Container, IconButton } from "@mui/material";

import Auth from "../../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POTLUCK } from "../../utils/mutations";
import { QUERY_GETMYPOTLUCKS } from "../../utils/queries";

import PotluckBar from './components/PotluckBar';

export default function Potlucks() {
  //   const [createPotluck, { error1, data1 }] = useMutation(CREATE_POTLUCK);
  const { loading, data } = useQuery(QUERY_GETMYPOTLUCKS);

  const potlucks = data?.getMyPotlucks.potlucks || [];

  console.log(potlucks, "potlucks");

  return (
    <Grid>
        {potlucks.map((item) => (
            <PotluckBar title={item.title}/>
        ))}
    </Grid>
  );
}
