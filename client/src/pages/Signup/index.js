import React from "react";
import {
  Button,
  CssBaseline,
  Link,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
} from "@mui/material";

import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../../utils/mutations";
import image from "../../utils/assets/images/cover.jpg";
import breadImg from "../../utils/assets/images/bread.jpg";

// components
import LandingPageHeader from "../../components/LandingPageHeader";

export default function Signup() {
  const [addUser] = useMutation(ADD_USER);
  const [login] = useMutation(LOGIN_USER);

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get("password") !== formData.get("confirmPassword")) {
      alert("The passwords have to match");
      return;
    }

    try {
      const { data } = await addUser({
        variables: {
          username: formData.get("firstName") + " " + formData.get("lastName"),
          email: formData.get("email"),
          password: formData.get("password"),
        },
      });

      try {
        const { data } = await login({
          variables: {
            email: formData.get("email"),
            password: formData.get("password"),
          },
        });
        if (!data) {
          throw new Error("Something went wrong with login!");
        }
        Auth.login(data.login.token);
        window.location.replace("/signup/add-info");
      } catch (err) {
        console.log(err);
      }

      if (!data) {
        throw new Error("Something went wrong with signup!");
      }
    } catch (err) {
      console.error(err);
      alert("Incorrect username or password. Please try again!");
    }
  };

  return (
    <>
      <LandingPageHeader />
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={6}
              md={6}
              sx={{
                backgroundImage: `url(${breadImg})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit1}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    id="password"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    id="confirmPassword"
                  />
                  {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="/" variant="body2">
                        {"Already have an account? Sign In"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
