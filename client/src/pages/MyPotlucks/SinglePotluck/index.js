import React from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_GET_POTLUCK_BY_ID, QUERY_GETME } from "../../../utils/queries";

// components
import UserDisplay from "../../../components/UserDisplay";
import PotluckMembers from "./PotluckMembers";
import TopBar from "./TopBar";
import PotluckRecipes from "./PotluckRecipes";

export default function SinglePotluck() {
  const { potluckId } = useParams();
  const { loading: meLoading, data: meData } = useQuery(QUERY_GETME);
  const { loading: potluckLoading, data: potluckData } = useQuery(
    QUERY_GET_POTLUCK_BY_ID,
    {
      variables: { potluckId: potluckId },
    }
  );

  if (potluckLoading || meLoading) {
    return <></>;
  }

  const potluck = potluckData?.getPotluckById || [];
  const me = meData?.getMe || [];

  // Am I the creator?
  const iCreate = potluck.createdBy._id === me._id;

  return (
    <div>
      {iCreate ? (
        <Grid container>
          <Grid item xs={9}>
            <TopBar title={potluck.title} img={potluck.img} />
            <PotluckRecipes me={me} potluck={potluck} />
          </Grid>
          <Grid item xs={3}>
            <PotluckMembers me={me} members={potluck.members} />
            <></>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={9}>
            <TopBar title={potluck.title} img={potluck.img} />
            <PotluckRecipes me={me} potluck={potluck} />
          </Grid>
          <Grid item xs={3}>
            <PotluckMembers me={me} members={potluck.members} />
            <></>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
