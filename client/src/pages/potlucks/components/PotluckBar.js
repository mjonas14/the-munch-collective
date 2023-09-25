import React from "react";
import {
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function PotluckBar(props) {
  return (
    <div>
      <Card
        sx={{
          width: 900,
          height: 80,
          margin: "20px 0px 0px 10px",
          backgroundColor: "#EBECF0",
          borderRadius: "16px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={console.log("Clicked!")}
            style={{ display: "flex", justfiyContent: "center" }}
          >
            Button
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
