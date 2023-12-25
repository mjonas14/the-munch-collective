import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  Button,
} from "@mui/material";

import Auth from "../../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POTLUCK } from "../../utils/mutations";
import { QUERY_GET_MY_POTLUCKS } from "../../utils/queries";

// components
import PotluckBar from "./components/PotluckBar";
import CreatePotluckModal from "./components/CreatePotluck";
import Loading from "../../components/Loading";

const MyPotlucks = () => {
  const [showModal, setShowModal] = useState(false);
  const [createPotluck] = useMutation(CREATE_POTLUCK);
  const { loading: myPtlkLoading, data: myPtlkData } = useQuery(
    QUERY_GET_MY_POTLUCKS
  );
  const potlucks = myPtlkData?.getMyPotlucks.potlucks || [];

  if (myPtlkLoading) {
    return <Loading />;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "20px 20px 0px 20px",
            }}
          >
            <Typography variant="h4" align="center">
              Your Potlucks
            </Typography>
            <Button variant="contained" onClick={() => setShowModal(true)}>
              Create
            </Button>
          </Box>
          {potlucks.length === 0 ? (
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
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <CreatePotluckModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default MyPotlucks;
