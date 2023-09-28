import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_GETPOTLUCKBYID } from "../../utils/queries";

import UserDisplay from "../../components/UserDisplay";
import PotluckMembers from "./components/PotluckMembers";

export default function SinglePotluck() {
  const { recId } = useParams();

  const { loading, data } = useQuery(QUERY_GETPOTLUCKBYID, {
    variables: { potluckId: recId },
  });

  const potluck = data?.getPotluckById || [];
  console.log(potluck);

  return (
    <Grid container>
      {loading ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <Grid container>
          <Grid item xs={4}>
            <PotluckMembers members={potluck.members} />
          </Grid>
          <Grid item xs={8}>
            dsf
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
