import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_GET_POTLUCK_BY_ID } from "../../../utils/queries";

import UserDisplay from "../../../components/UserDisplay";
import PotluckMembers from "./PotluckMembers";

export default function SinglePotluck() {
  const { potluckId } = useParams();

  const { loading, data } = useQuery(QUERY_GET_POTLUCK_BY_ID, {
    variables: { potluckId: potluckId },
  });

  const potluck = data?.getPotluckById || [];

  return (
    <Grid container>
      {loading ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <Grid container>
          <Grid item xs={9}>
            dsf
          </Grid>
          <Grid item xs={3}>
            <PotluckMembers members={potluck.members} />
            <></>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
