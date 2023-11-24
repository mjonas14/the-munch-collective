import React from "react";
import { Grid, Box, Typography, Container, IconButton } from "@mui/material";

import Auth from "../../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POTLUCK } from "../../utils/mutations";
import { QUERY_GET_MY_POTLUCKS, QUERY_GETME } from "../../utils/queries";

// components
import PotluckBar from './components/PotluckBar'

const MyPotlucks = () => {
  const { loading: myPtlkLoading, data: myPtlkData } = useQuery(QUERY_GET_MY_POTLUCKS);
  const potlucks = myPtlkData?.getMyPotlucks.potlucks || [];

  if (myPtlkLoading) {
    <h4>Loading...</h4>;
  }

  return (
    <>
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
              <PotluckBar
                key={item._id}
                title={item.title}
                img={item.img}
                id={item._id}
              />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default MyPotlucks;
