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
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function PotluckBar(props) {
  return (
    <div>
      <Card
        sx={{
          height: 65,
          width: "75%",
          margin: "20px 20px 0px 20px",
          backgroundColor: "#EBECF0",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="Potluck picture"
            src={props.img}
            sx={{ width: 45, height: 45 }}
          >
            <Typography sx={{ fontSize: "20px" }}>
              {props.title.charAt(0)}
            </Typography>
          </Avatar>
          <Typography variant="h5" sx={{ marginLeft: "30px" }}>
            {props.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/mypotlucks/${props.id}`}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
