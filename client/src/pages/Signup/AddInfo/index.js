import React from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GETME } from "../../../utils/queries";
import { ADD_USER_DETAILS } from "../../../utils/mutations";

// components
import LandingPageHeader from "../../../components/LandingPageHeader";

const AddInfo = () => {
  const [addUserDetails] = useMutation(ADD_USER_DETAILS);
  const { loading, data } = useQuery(QUERY_GETME);
  const me = data?.getMe || [];

  if (loading) {
    <h3>Loading...</h3>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const { data } = await addUserDetails({
        variables: {
          bio: formData.get("bio"),
          cityBorn: formData.get("cityBorn"),
          cityLive: formData.get("cityLive"),
          favCuisine: formData.get("favCuisine"),
          signatureDish: formData.get("signatureDish"),
          yob: parseFloat(formData.get("yob")),
        },
      });
      if (!data) {
        throw new Error("Something went wrong!");
      }
      window.location.replace("/signup/add-first-recipe");
    } catch (err) {
      console.error(err);
      alert("An error has been found!");
    }
  };

  return (
    <>
      <LandingPageHeader />
      <Box align="center">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ margin: "10px 20px 20px 20px", width: "800px" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "40px",
              marginBottom: "20px",
            }}
          >
            <Button sx={{ width: "100px" }} disabled></Button>
            <Typography variant="h4">Welcome {me.username}!</Typography>
            <Button
              onClick={() =>
                window.location.replace("/signup/add-first-recipe")
              }
              sx={{ height: "30px", width: "100px" }}
            >
              Add later
            </Button>
          </Box>
          <Box align="center">
            <Typography
              variant="h6"
              align="center"
              mt="15px"
              mb="25px"
              width="600px"
            >
              Tell us a bit more about yourself! This information will be added
              to your profile and will only be visible to your friends.
            </Typography>
          </Box>
          <Box align="center">
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              align="center"
              sx={{ mt: 1, width: "800px" }}
            >
              <Container sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  multiline
                  rows={3}
                  name="bio"
                  label="Tell us about you!"
                  type="bio"
                  id="bio"
                  sx={{ margin: "10px" }}
                />
              </Container>
              <Container sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Where do you live?"
                  id="cityLive"
                  name="cityLive"
                  sx={{ m: "10px" }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="cityBorn"
                  label="Where were you born?"
                  name="cityBorn"
                  sx={{ m: "10px" }}
                />
              </Container>
              <Container sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="yob"
                  label="What year were you born?"
                  type="yob"
                  id="yob"
                  sx={{ margin: "10px" }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="favCuisine"
                  label="Favourite cuisine"
                  type="favCuisine"
                  id="favCuisine"
                  sx={{ margin: "10px" }}
                />
              </Container>
              <Container sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  height="200px"
                  name="signatureDish"
                  label="Signature dish"
                  type="signatureDish"
                  id="signatureDish"
                  sx={{ margin: "10px" }}
                />
              </Container>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save to Profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddInfo;
